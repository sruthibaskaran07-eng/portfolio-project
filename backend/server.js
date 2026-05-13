const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/portfolio")
.then(() => console.log("MongoDB Connected ✔"))
.catch(err => console.log(err));


// SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});


// MODEL
const Contact = mongoose.model("Contact", contactSchema);


// HOME ROUTE
app.get("/", (req, res) => {
    res.send("Backend is working 🚀");
});


// GET DATA
app.get("/contact", async (req, res) => {

    const contacts = await Contact.find();

    res.json(contacts);

});


// POST DATA
app.post("/contact", async (req, res) => {

    try {

        const newMessage = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        await newMessage.save();

        res.send("Message saved in MongoDB ✔");

    } catch (error) {

        console.log(error);

        res.status(500).send("Error saving message");

    }

});


// START SERVER
app.listen(5000, () => {
    console.log("Server running on port 5000");
});