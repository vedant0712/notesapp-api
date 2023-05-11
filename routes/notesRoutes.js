const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNoteById,
  deleteNoteById,
} = require("../controller/notesController");
const authMiddleware = require("../middleware/authMiddleware");

// Get all notes
router.get("/", authMiddleware, getNotes);

// Create a new note
router.post("/", authMiddleware, createNote);

// Update a note by ID
router.put("/:id", authMiddleware, updateNoteById);

// Delete a note by ID
router.delete("/:id", authMiddleware, deleteNoteById);

module.exports = router;
