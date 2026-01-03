import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import { addNote, deleteNote, editNote, getAllNotes,pinNote } from '../controller/note.controller.js';

const router = express.Router();

router.post("/add", verifyToken, addNote)
router.post("/delete/:noteId", verifyToken, deleteNote)
router.post("/edit/:noteId", verifyToken, editNote)
router.get("/all", verifyToken, getAllNotes)
router.put("/updateNotePin/:noteId", verifyToken, pinNote)



export default router;

