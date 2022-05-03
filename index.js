const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

const teamMembers = [];
const teamInfo = [];

function mainMenu() {
    function createManager() {
        inquirer.prompt([
            {type: 'input', 
            name: 'managerName',
            message: 'What is the Managers Name?'},
            {type: 'input',
            name: 'managerId',
            message: 'What is the managers ID?'},
            {type: 'input',
            name: 'managerOffice',
            message: 'What is the managers office number?'},
            {type: 'input',
            name: 'managerEmail',
            message: 'What is the managers email address?'}
        ]) .then((answers) => {
            const manager = new Manager(
                answers.managerName,
                answers.managerId,
                answers.managerOffice,
                answers.managerEmail
            );
            teamMembers.push(manager);
            generateTeam();
        });
    }

    function generateTeam() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'empChoice',
                message: 'What role would you like to add?',
                choices: ['Engineer', 'Intern'],
            },
        ]) .then((userChoice) => {
            switch (userChoice.empChoice) {
                case 'Engineer':
                    addEngineer();
                    break;
                case 'Intern':
                    addIntern();
                    break;
            }
        });
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: 'What is the engineers name?'
            },
            {
                type: 'input',
                name: 'engineerGithub',
                message: 'What is your engineers GitHub username?'
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: 'What is your engineers email address?'
            },
            {
                type: 'input',
                name: 'engineerId',
                message: 'What is your engineers ID number?'
            }
    
        ])
        .then((answers) => {
            const engineer = new Engineer(
                answers.engineerName,
                answers.engineerGithub,
                answers.engineerEmail,
                answers.engineerId
            );
            teamMembers.push(engineer);
            generateTeam();
        })
    }

    function addIntern() {
        inquirer.prompt([
            {
                type:'input',
                name: 'internName',
                message: 'What is your interns name?'
            },
            {
                type: 'input',
                name: 'internEmail',
                message: 'What is your interns email address?'
            },
            {
                type: 'input',
                name: 'internSchool',
                message: 'What school does your intern attend?'
            }
        ])
        .then((answers) => {
            const intern = new Intern(
                answers.internName,
                answers.internEmail,
                answers.internSchool
            );
            teamMembers.push(intern);
            generateTeam();
        })
    }

    createManager();
}

mainMenu();