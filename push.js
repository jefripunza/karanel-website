const child_process = require("child_process");

function execute(cmd, dirname = __dirname) {
  return new Promise(async (resolve, reject) => {
    child_process
      .exec(
        cmd,
        {
          cwd: dirname,
        },
        (error, stdout, stderr) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(stdout);
          }
        }
      )
      .stdout.pipe(process.stdout);
  });
}

async function run() {
  const commit = process.argv
    .filter((v, i) => {
      return i > 1;
    })
    .join(" ");
  const cmd = [
    "git add .",
    `git commit -am "${commit}"`,
    "git push -f -u origin HEAD:main",
  ].join(" && ");
  try {
    await execute(cmd);
  } catch (error) {
    console.error(error);
  }
}
run();
