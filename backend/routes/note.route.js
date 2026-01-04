import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import { addNote, deleteNote, editNote, getAllNotes,pinNote,searchNote } from '../controller/note.controller.js';

const router = express.Router();

router.post("/add", verifyToken, addNote)
router.delete("/delete/:noteId", verifyToken, deleteNote)
router.put("/edit/:noteId", verifyToken, editNote)
router.get("/all", verifyToken, getAllNotes)
router.put("/updateNotePin/:noteId", verifyToken, pinNote)
router.get("/search",verifyToken, searchNote)



export default router;

