#!/usr/bin/env node

"use strict";

const { exec } = require("child_process");
const os = require("os");
const chalk = require("chalk");
const log = console.log;
const error = console.error;

let operatingSys = "" || "ls /dev/";
// let mountedDrives = "diskutil list | grep 'dev'";

let userInfo = os.userInfo();
log(
  chalk.hex("#60a3bc")(
    `\n🔻  Hello, ${chalk.hex("#e58e26")(userInfo.username)}`
  )
);

if (process.platform === "darwin") {
  log(chalk.hex("#1abc9c")("\n🔧  must be a mac\n"));
  operatingSys =
    "osascript -e 'tell application \"Finder\" to eject \
                 (every disk whose ejectable is true)'";
} else if (process.platform === "linux") {
  log(chalk.hex("#1abc9c")("\nmust be a linux machine\n"));
  operatingSys = "sudo umount /dev/sd* --verbose";
} else if (process.platform === "win32") {
  throw error(
    chalk.hex("#1abc9c")(
      "\nOh no! must you use windows? : \
    would you help me make this work for windows... please 貴方わすごいです！\n"
    )
  );
}

const child = exec(operatingSys);
// const child2 = exec(mountedDrives);

child.stderr.on("data", data => {
  error(chalk.redBright(data));
});

child.on("exit", function(code, signal) {
  log(chalk.bold.hex("#EE5A24")("💾  ALL devices ejected!\n"));
});

// child2.stderr.on("data", data => {
//   error(chalk.redBright(data));
// });

// child2.stdout.on("data", data => {
//   log(chalk.hex("#95afc0")(data));
// });
