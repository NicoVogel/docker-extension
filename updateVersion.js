#!/usr/bin/env node

const cp = require('child_process');
const fs = require('fs');
const packageFile = fs.readFileSync('package.json').toString();
const packageData = JSON.parse(packageFile);
const version = packageData.version;

const dockerExtensionPath = 'src/docker-extension.ts';
const dockerExtensionFile = fs.readFileSync(dockerExtensionPath).toString();
const dockerExtensionNewFile = dockerExtensionFile.replace(/program\.version\('(.+?)'\)/, `program.version('${version}')`);
fs.writeFileSync(dockerExtensionPath, dockerExtensionNewFile);

cp.execSync(`git add ${dockerExtensionPath}`);
cp.execSync(`git commit -m '${version}'`);