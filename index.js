const core = require('@actions/core')
const exec = require('child_process').exec
const fs = require('fs')

try {
  installSFDX()
} catch (error) {
  core.setFailed(error.message)
}

function installSFDX(){
  var download = 'wget https://developer.salesforce.com/media/salesforce-cli/sfdx-linux-amd64.tar.xz -P /tmp'
  var createDir = 'mkdir sfdx'
  var unzip = 'tar xJf /tmp/sfdx-linux-amd64.tar.xz -C sfdx --strip-components 1'
  var install = './sfdx/install'
  var clean = 'rm -r ./sfdx'
  exec(download+' && '+createDir+' && '+unzip+' && '+install+' && '+clean, function(error, stdout, stderr){
    if(error) throw(stderr)
    core.debug(stdout)
    if(core.getInput('sfdx-auth-url')) createAuthFile()
  })
}

function createAuthFile(){
  fs.writeFileSync('/tmp/sfdx_auth.txt', core.getInput('sfdx-auth-url'))
  authSFDX()
}

function authSFDX(){
  var params = '--setdefaultdevhubusername --setdefaultusername -a SFDX-ENV'
  exec('sfdx auth:sfdxurl:store -f /tmp/sfdx_auth.txt '+params, function(error, stdout, stderr){
    if(error) throw(stderr)
	core.debug(stdout)
  })
}

