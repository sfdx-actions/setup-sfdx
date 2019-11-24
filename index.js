const core = require('@actions/core')
const tc = require('@actions/tool-cache');
const exec = require('@actions/exec');
const fs = require('fs')

try {
  installSFDX()
} catch (error) {
  core.setFailed(error.message)
}

async function installSFDX(){
  if (process.platform === 'linux') {
    const file = await tc.downloadTool('https://developer.salesforce.com/media/salesforce-cli/sfdx-linux-amd64.tar.xz')
    const extr = await tc.extractTar(file, './sfdx')
	const inst = await exec.exec('sudo '+extr)
  }
  else {
    throw ('Only Linux system supported')
  }
  createAuthFile()
}

function createAuthFile() {
  fs.writeFileSync('./sfdx_auth.txt', core.getInput('sfdx-auth-url'))
  authSFDX()
}

async function authSFDX() {
  const resp = await exec.exec('sfdx force:auth:sfdxurl:store -f ./sfdx_auth.txt --setdefaultusername -a SFDX-ENV');
}
