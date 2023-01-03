const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

yargs.version("1.1.0");

// add, remove, read, list
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      desribe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      desribe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      desribe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "List notes",
  handler() {
    notes.listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "read a note",
  builder: {
    title: {
      desribe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();

// console.log(yargs.argv)
