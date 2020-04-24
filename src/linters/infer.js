
const commandExists = require("../../vendor/command-exists");
const { run } = require("../utils/action");
const { parseErrorsFromDiff } = require("../utils/diff");
const { initLintResult } = require("../utils/lint-result");
const path = require('path');
const fs = require('fs');


function formatError (error) {
  return `${error.bug_type}: ${error.qualifier}`;
}

class Infer {
  static get name() {
    return "Infer";
  }

  static async verifySetup(dir, prefix = "") {
    if (!(await commandExists("infer"))) {
      throw new Error("infer not installed!");
    }
  }

  static lint(dir, extensions, args = "", fix = false, prefix = "") {
    console.info("running infer in directory: ", dir);
    return run(`infer run -- ${args}`, {
      dir,
      ignoreErrors: true
    });
  }

  static parseOutput(dir, output) {
    // we just want to get the output json file from the directory
    const outputFile = path.join(dir, 'infer-out', 'report.json');
    const lintResult = initLintResult();
    console.info("reading infer output from: " + outputFile);

    if (!fs.existsSync(outputFile)) {
      console.error("failed to find lint output file:", outputFile);
      lintResult.isSuccess = false;
      return;
    }

    const data = JSON.parse(fs.readFileSync(outputFile).toString());
    lintResult.isSuccess = data.length === 0;

    // parse the points into the error

    data.forEach((error) => {
      const msg = {
        path: error.file.replace('objc/', ''),
        firstLine: error.line,
        lastLine: error.line,
        message: formatError(error),
      };

      if (error.severity === 'WARNING') {
        lintResult.warning.push(msg);
      } else {
        lintResult.error.push(msg);
      }
    });

    console.info(`produced lint result with: ${lintResult.error.length}, ${lintResult.warning.length}`);
    return lintResult;
  }
}

module.exports = Infer;