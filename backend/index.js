import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Note from "./models/notes.models.js";
import User from "./models/users.models.js";
import authenticateToken from './utilities.js';
import { error } from 'console';    


dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:5173"]; //frontend origin
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

//routes
app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

//create account 
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    try {
        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(409).json({ error: true, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ fullName, email, password: hashedPassword });
        await user.save();

        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" }
        );

        return res.status(201).json({
            error: false,
            message: "Account created successfully",
            accessToken,
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

//login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: true, message: "Invalid credentials" });
        }

        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
        
        return res.json({
            error: false,
            message: "Login successful",
            accessToken,
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Get user
app.get("/get-user", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(401).json({ error: true, message: "Unauthorized" });
        }

        return res.json({
            user: {
                fullName: user.fullName,
                email: user.email,
                _id: user._id,
                createdOn: user.createdOn,
            },
            message: " ",
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});


// add notes
app.post("/add-note", authenticateToken, async (req, res) => {
    const{title,content, tags}= req.body;

    if(!title || !content){
        return res.status(400).json({error:true, message:"Title and Content are required"});
    }

    try{
        const note= new Note({ title,content,tags:tags || [],userId: req.user.userId});
        await note.save();
        return res.status(201).json({ error:false, message:"Note added successfully", note});
    }catch(error){
        return res.status(500).json({ error:true,message:"Internal Server Error"});
    }
});

//edit notes
app.put("/edit-note/:noteId",authenticateToken, async(req,res)=>{
    const{title, content, tags, isPinned}= req.body;
    const noteId= req.params.noteId;
    const userId= req.user.userId;

    try {
        const note= await Note.findOne({ _id:noteId, userId});
        if(!note) return res.status(404).json({ error:true, message:"Note not found"});
        if (title) note.title= title;
        if (content) note.content= content;
        if (tags) note.tags= tags;
        if (typeof isPinned === "boolean") note.isPinned= isPinned;
        await note.save();
        return res.json({error:false,   message:"Note updated successfully"});
        } catch (error) {
        return res.status(500).json({ error:true, message:"Internal Server Error"});
    }
});

// get all notes 
app.get("/get-notes", authenticateToken, async (req, res) => {
  try{
    const notes= await Note.find({userId:req.user.userId}).sort({ isPinned:-1});
    return res.json({error:false, notes,message:"All notes fetched successfully "});
  } catch (error){
    return res.status(500).json({ error:true, message:"Internal Server Error"});
  }
});

//delete notes
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId= req.params.noteId;
    const userId= req.user.userId;

    try{
        const note = await Note.findOne({ _id:noteId, userId});
        if(!note)
            return res.status(404).json({ error:true, message:"Note not found"});
            await Note.deleteOne({ _id:noteId, userId});
            return res.json({ error:false, message:"Note deleted successfully"});
    } catch (error) {
        return res.status(500).json({ error:true, message:"Internal Server Error"});
    }
});


//update isPinned
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId= req.params.noteId;
    const { isPinned }= req.body;
    const userId= req.user.userId;

    try{
        const note= await Note.findOne({ _id:noteId, userId});
        if(!note) return res.status(404).json({ error:true, message:"Note not found"});
        note.isPinned=  !!isPinned;
        await note.save();
        return res.json({ error:false, message:"Note pin status updated successfully"});
    } catch (error) {
        return res.status(500).json({ error:true, message:"Internal Server Error"});
    }
});

//search notes
app.get("/search-notes", authenticateToken, async (req, res) => {
    const { query } = req.query;
    const userId= req.user.userId;

    if(!query){
        return res.status(400).json({ error:true, message:"Query parameter is required"});
    }
    
    try{
        const notes= await Note.find({
            userId,
            $or:[   
                { title: { $regex: query, $options: "i" } },
                { content: { $regex: query, $options: "i" } },
               
            ],
        });
        return res.json({ error:false, notes, message:"Search completed successfully"});
    } catch (error) {
        return res.status(500).json({ error:true, message:"Internal Server Error"});
    }
});


//start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});     

export default app;