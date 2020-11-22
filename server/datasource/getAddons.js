const fs = require('fs');
const path = require('path');
const util = require('util');
const config = require('../../config/server.js');

const scanDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const getFileStat = util.promisify(fs.stat);

async function getSubDirs(rootDir) {
  const fileNames = await scanDir(rootDir)
  const fileStats = await Promise.all(fileNames.map(file => {
    const fullPath = path.join(rootDir, file);
    return getFileStat(fullPath);
  }));
  return fileNames.filter((file, i) => {
    const stat = fileStats[i];
    return stat.isDirectory() && !file.startsWith('.');
  });
}

async function loadAddon(name, root) {
  const metaPath = path.join(root, name, 'addon.json');
  const metaBody = JSON.parse(await readFile(metaPath, 'utf8'));
  return metaBody;
}

module.exports = async function getAddons(ctx) {
  const addonRootDir = config.addons.root;
  const addonDirs = await getSubDirs(addonRootDir);
  const addonItems = await Promise.all(addonDirs.map(e => loadAddon(e, addonRootDir)));
  return addonItems;
};
