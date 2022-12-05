const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortune, getAllFortunes, getStudents, createStudent, deleteStudent, updateStudent } = require('./controller');

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/allFortunes", getAllFortunes);
app.get("/api/students", getStudents);
app.post("/api/students", createStudent);
app.delete("/api/students/:id", deleteStudent);
app.put("/api/students/:id", updateStudent)


app.listen(4000, () => console.log("Server running on 4000"));
