const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneBtn");
const allFortunesBtn = document.getElementById("allFortunes");
const fortuneSection = document.getElementById("fortuneSec");
const newStudent = document.getElementById('name');
const studentBtn = document.getElementById('studentForm');
const studentsContainer = document.getElementById('studentsContainer');
const baseURL = "http://localhost:4000/api/students";
const editNameText = document.getElementById("edit-name");

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune")
    .then(res =>{
        alert(res.data)
    })
};

const getAllFortunes = () => {
    axios.get("http://localhost:4000/api/allFortunes")
    .then(res =>{
        let fortuneArr = res.data;
        let cards = "";
        for (let i = 0; i < fortuneArr.length; i++){
            cards += `
                <div class="card">
                <p>${fortuneArr[i]}</p>
                </div>
            `
        }
        
        fortuneSection.innerHTML = cards;
    })
}

const studentsCallback = ({ data: students}) => displayStudents(students)

const getAllStudents = () => {
    axios.get("http://localhost:4000/api/students")
        .then(studentsCallback)
}

const createStudent = body => {
    axios.post("http://localhost:4000/api/students", body)
        .then(studentsCallback)
}

const deleteStudent = id => {
    axios.delete(`${baseURL}/${id}`)
        .then(studentsCallback)
}

const updateStudent = (id, editName) => {
    axios.put(`${baseURL}/${id}`, {editName})
        .then(studentsCallback)
}

function submitHandler(event){
    event.preventDefault()
    let name = newStudent;
    let bodyObj ={
        name: name.value
    }
    createStudent(bodyObj)
    name.value = ''
}


function createStudentCard(student) {
    
    const studentCard = document.createElement('div')
    studentCard.classList.add('student-card')
    studentCard.innerHTML = `<p>${student.name}</p>
        <button onclick="deleteStudent(${student.id})">Delete Name</button>
        <button onclick="updateStudent(${student.id}, '${editNameText.value}')">Upadate Name</button>`
        console.log(editNameText.value)
    studentsContainer.appendChild(studentCard)
}

function displayStudents(array) {
    studentsContainer.innerHTML = '';
    for (let i = 0; i < array.length; i++){
        createStudentCard(array[i])
    }
}

complimentBtn.addEventListener('click', getCompliment);
fortuneBtn.addEventListener("click", getFortune);
allFortunesBtn.addEventListener("mouseover", getAllFortunes);
allFortunesBtn.addEventListener("mouseout", () => fortuneSection.innerHTML = "");
studentBtn.addEventListener("submit", submitHandler);

getAllStudents()
