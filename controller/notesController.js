const Note = require("../models/notes");
const User = require("../models/users");

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
      user: req.user.id,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }); 
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.updateNoteById = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401).json({ message: "User not found" });
    }
    if (note.user.toString() !== user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    note.title = title;
    note.content = content;
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.deleteNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401).json({ message: "User not found" });
    }
    if (note.user.toString() !== user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await Note.findByIdAndRemove(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error!" });
  }
};
