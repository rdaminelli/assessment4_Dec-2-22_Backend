const fortunes = ["Error 404 fortune not found.", "You are not illiterate.", "The fortune you seek is in a different cookie.", "Avoid unnecessary gamble. Lucky numbers: 2, 16, 39, 60, 88.", "If you think nobody cares if you're alive, try missing a couple of car payments.", "It could be better, but it's good enough."];
const students = require('./db.json');
let globalId = 6;
module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        
        let randomNum = Math.floor(Math.random() *fortunes.length);
        let randomFortune = fortunes[randomNum];

        res.status(200).send(randomFortune);
    },
    getAllFortunes: (req,res) => {
        res.status(200).send(fortunes);
    },
    getStudents: (req, res) => {
        res.status(200).send(students);
    },
    createStudent: (req,res) => {
        let { name } = req.body;
        let newStudent = {
            id: globalId,
            name
        }
        students.push(newStudent)
        res.status(200).send(students)
        globalId++
    },
    deleteStudent: (req, res) => {
        let index = students.findIndex(element => element.id === +req.params.id)
        students.splice(index, 1)
        res.status(200).send(students)
    },
    updateStudent: (req, res) => {
        
        let {id} = req.params
        let { editName } = req.body
        let index = students.findIndex(element => +element.id === +id)
        students[index].name = editName 
        res.status(200).send(students)
    }

}