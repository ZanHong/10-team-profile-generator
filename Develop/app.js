const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { inherits } = require("util");
const { finished } = require("stream");

const employees = [];

// General Questions
var generalQuestion = [
    {
        type: "input",
        name: "name",
        message: "What is your employee's name?"
    },
    {
        type: "number",
        name: "id",
        message: "What is your employee's id? (number)"
    },
    {
        type: "input",
        name: "email",
        message: "What is your employee's email?"
    }
];

// Question for the Manager
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the manager's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the manager's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the manager's email?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?"
    }
];

// Questions for Engineers
const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the engineer's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the engineer's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the engineer's email?"
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineer's GitHub username?"
    }
];

// Questions for Interns
const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the intern's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the intern's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the intern's email?"
    },
    {
        type: "input",
        name: "school",
        message: "What is the intern's school?"
    }
];

function init() {
    inquirer.prompt(managerQuestions)
        .then(function ({ name, id, email, officeNumber }) { // Object deconstruction
            const manager = new Manager(name, id, email, officeNumber);
            employees.push(manager);
            createTeam();
        });
};

function createTeam() {
    inquirer.prompt({
        // Question to ask which employee type
        type: "list",
        name: "employeeType",
        message: "What type of employee do you want to create? (Select 'Finished' to stop adding employees)",
        choices: ["Engineer", "Intern", "I am done adding employees!"]
    }).then(function ({ employeeType }) {
        if (employeeType === "Engineer") {
            createEngineer();
        } else if (employeeType === "Intern") {
            createIntern();
        } else if (employeeType === "I am done adding employees!") {
            saveFile();
        }
    })
};

function createEngineer() {
    inquirer.prompt(engineerQuestions)
        .then(function ({ name, id, email, github }) { // Object deconstruction
            const engineer = new Engineer(name, id, email, github);
            employees.push(engineer);
            createTeam();
        });
};

function createIntern() {
    inquirer.prompt(internQuestions)
        .then(function ({ name, id, email, school }) { // Object deconstruction
            const intern = new Intern(name, id, email, school);
            employees.push(intern);
            createTeam();
        });
};

function saveFile() {
    fs.writeFile(outputPath, render(employees), function (err) {
        if (err) throw err;
        console.log("Completed!")
    })
};

init();