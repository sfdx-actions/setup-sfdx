const core = require('@actions/core')
const exec = require('child_process').exec
const fs = require('fs')

try {
  installSFDX()
} catch (error) {
  core.setFailed(error.message)
}

function installSFDX(){
  var tarballBase = 'https://developer.salesforce.com/media/salesforce-cli/sfdx/channels/stable'
  var tarballFile = 'sfdx-linux-x64.tar.xz'

  var tarballOverride = core.getInput('tarball-url')
  if(tarballOverride ){
    tarballBase = tarballOverride.substr(0,tarballOverride.lastIndexOf('/'))
    tarballFile = tarballOverride.substr(tarballOverride.lastIndexOf('/')+1)
  }

  var download = 'wget ' + tarballBase + '/' + tarballFile + ' -q -P /tmp'
  var createDir = 'mkdir sfdx'
  var unzip = 'tar xJf /tmp/' + tarballFile + ' -C sfdx --strip-components 1'
  var install = 'echo "`pwd`/sfdx/bin" >> $GITHUB_PATH'
  var version = 'sfdx/bin/sfdx --version && sfdx/bin/sfdx plugins --core'
  exec(download+' && '+createDir+' && '+unzip+' && '+install+' && '+version, function(error, stdout, stderr){
    if(error) throw(stderr)
    core.info(stdout)
    if(core.getInput('sfdx-auth-url')) createAuthFile()
  })
}

function createAuthFile(){
  fs.writeFileSync('/tmp/sfdx_auth.txt', core.getInput('sfdx-auth-url'))
  authSFDX()
}

function authSFDX(){
  var params = '--setdefaultdevhubusername --setdefaultusername -a SFDX-ENV'
  exec('sfdx/bin/sfdx auth:sfdxurl:store -f /tmp/sfdx_auth.txt '+params, function(error, stdout, stderr){
    if(error) throw(stderr)
	core.info(stdout)
  })
}

