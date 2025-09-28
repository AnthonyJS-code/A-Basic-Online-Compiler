const path = require("path");
const fs = require("fs").promises;
const noPromiseFs = require("fs");
const ChildProcess = require("child_process");
const Readline = require("readline");
const EventEmitter = require("events");
const filepath = path.resolve(__dirname, "..", "temp.js");
const resultfilepath = path.resolve(__dirname, "..", "results.txt");
const errfilePath = path.resolve(__dirname, "..", "err.txt");
const customEvent = new EventEmitter();

module.exports = async (req, res) => {
  await fs.writeFile(errfilePath, "");
  const { codes, lang } = req.body;
  let language = lang === "JavaScript" ? "node" : "py";
  await fs.writeFile(filepath, codes);
  ChildProcess.execFile(`${language}`, [filepath], (err, stdout, stderr) => {
    if (stderr) {
      fs.writeFile(resultfilepath, stderr);
      errF();
    } else if (stdout) {
      data = { data: stdout };
      res.json(data);
    }
  });
  customEvent.once("errorstderror", async () => {
    errorResult = await fs.readFile(errfilePath, "utf8");
    res.json({ data: errorResult });
  });

  async function errF() {
    const r1 = Readline.createInterface({
      input: noPromiseFs.createReadStream(resultfilepath),
      crlfDelay: Infinity,
    });
    let lineNumber = 0;

    r1.on("line", async (line) => {
      lineNumber++;
      if (
        lineNumber === 2 ||
        lineNumber === 3 ||
        lineNumber === 4 ||
        lineNumber === 5 ||
        lineNumber === 16
      ) {
        fs.appendFile(errfilePath, `"${line}"\n`);
      }
      if (lineNumber === 16) {
        r1.close();
      }
    });
    r1.once("close", () => {
      customEvent.emit("errorstderror");
    });
  }
};
