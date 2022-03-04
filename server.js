require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected"));

app.use(express.json());

const members = require("./routes/members");
app.use("/members", members);
app.use(express.static("public"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});