const chalk = require("chalk");
const { debug } = require("console");
const fs = require("fs");

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken"));
  }
};

const readNote = (title) => {
  const notes = loadNotes();

  const foundNote = notes.find((note) => note.title === title);

  if (foundNote) {
    console.log(chalk.bold.inverse(foundNote.title));
    console.log(foundNote.body);
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();

  const notesTokeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesTokeep.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesTokeep);
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const listNotes = () => {
  console.log(chalk.inverse("Your notes"));
  const notes = loadNotes();

  try {
    notes.forEach((note) => {
      console.log(note.title + " : " + note.body);
    });
  } catch (e) {
    console.log(e.title);
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
