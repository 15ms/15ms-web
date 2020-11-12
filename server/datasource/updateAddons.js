const fs = require('fs');
const childProcess = require('child_process');
const config = require('../../config/server');

/**
 * test if path exists
 *
 * @param  {String} p
 * @return {Boolean}
 */
function canAccess(p) {
  try {
    fs.accessSync(p, fs.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * promise to execute command
 * stderr can be ignored, useful for git
 * options:
 *  {Boolean} ignore - skip stderr
 *
 * @param  {String} command
 * @param  {Object=} options
 * @return {Promise}
 */
function startProcess(command, options) {
  return new Promise((resolve, reject) => {
    if (options) {
      if (options.cwd && !canAccess(options.cwd)) {
        reject(new Error('cwd not found'));
        return;
      }
      if (options.ssh) {
        command = `ssh-agent bash -c 'ssh-add ${options.ssh}; ${command}'`
      }
    }
    childProcess.exec(command, options, (error, stdout, stderr) => {
      // reject if error
      if (error) return reject(error);

      // resolve if ignore stderr
      if (options && options.ignore) return resolve(stdout);

      // resolve if null or empty stderr(Buffer)
      if (!stderr || stderr.length === 0) return resolve(stdout);

      // reject if stderr
      return reject(new Error(stderr.toString()));
    });
  });
}

module.exports = async function updateAddons(ctx) {
  await startProcess(
    'git reset --hard `git rev-list --max-parents=0 HEAD` && git pull',
    {
      ignore: true,
      cwd: config.addon.root,
      ssh: config.addon.keys
    }
  );
};
