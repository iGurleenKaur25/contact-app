const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000", // allow local testing
    "https://contact-apppp-git-main-igurleenkaur25s-projects.vercel.app" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API running");
});

const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contacts", contactRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
