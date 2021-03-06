const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const employees = [];

function init() {
    createHtmlFile();
    addTeamMember();   
}


function addTeamMember() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Enter team member's name?",
            },
            {
                type: "list",
                name: "role",
                message: "What is this team member's role?",
                choices: ["Manager","Engineer","Intern"],
            },
            {
                type: "input",
                name: "id",
                message: "What is their Id?",
            },
            {
                type: "input",
                name: "email",
                message: "What is their email address?",
            }
        ])
        .then(function({name, role, id, email}) {
            let roleContactInfo = "";
            if(role === "Manager") {
                roleContactInfo = "Office Number"
            } else if (role === "Engineer") {
                roleContactInfo = "Github Profile"
            } else {
                roleContactInfo = "School"
            }         
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "roleContactInfo",
                        message: `Enter team member's ${roleContactInfo}`, 
                    },
                    {
                        type: "list",
                        name: "addAnotherMember",
                        message: "Would you like to add another member?",
                        choices: ["Yes","No"],
                    },
                ])
                .then(function({roleContactInfo, addAnotherMember}) {
                    console.log(roleContactInfo);
                    let newTeamMember;
                    if (role === "Manager"){
                        newTeamMember = new Manager(name,id,email,roleContactInfo);
                    } else if (role === "Engineer"){
                        newTeamMember = new Engineer(name,id,email,roleContactInfo);
                    } else {
                        newTeamMember = new Intern(name,id,email,roleContactInfo);
                    }
                    employees.push(newTeamMember);
                    addMemberToHtml(newTeamMember)
                    .then(function() {
                        if (addAnotherMember === "Yes") {
                            addTeamMember();
                        } else {
                            endHtml();
                        }
                    });

                });
        });
}

function createHtmlFile() {
    const html = 
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <title>Team Profile</title>
        </head>
        <body>
            <nav class="navbar navbar-dark bg-danger mb-5">
                <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
            </nav>
            <div class="container">
                <div class="row">`;
    fs.writeFile("./Dist/myTeam.html", html, (err) =>
        err ? console.log(err) : console.log("success")
    );
}

function addMemberToHtml(member) {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Manager") {
            const officeNumber = member.getNumber();
            data = 
            `<div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                    <h5 class="card-header bg-primary text-light">${name}<br /><br />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                    Manager</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${id}</li>
                        <li class="list-group-item">Email Address:
                            <a href = "mailto:${email}"> ${email} </a>
                        </li>
                        <li class="list-group-item">Office Phone: ${officeNumber}</li>
                    </ul>
                </div>
            </div>`
        } else if (role === "Engineer") {
            const githubProfile = member.getGithub();
            console.log(githubProfile);
            data = 
            `<div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                    <h5 class="card-header bg-primary text-light">${name}<br /><br />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-screwdriver" viewBox="0 0 16 16">
                        <path d="m0 1 1-1 3.081 2.2a1 1 0 0 1 .419.815v.07a1 1 0 0 0 .293.708L10.5 9.5l.914-.305a1 1 0 0 1 1.023.242l3.356 3.356a1 1 0 0 1 0 1.414l-1.586 1.586a1 1 0 0 1-1.414 0l-3.356-3.356a1 1 0 0 1-.242-1.023L9.5 10.5 3.793 4.793a1 1 0 0 0-.707-.293h-.071a1 1 0 0 1-.814-.419L0 1zm11.354 9.646a.5.5 0 0 0-.708.708l3 3a.5.5 0 0 0 .708-.708l-3-3z"/>
                    </svg>
                    Engineer</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${id}</li>
                        <li class="list-group-item">Email Address:
                            <a href = "mailto:${email}"> ${email}</a>
                        </li>
                        <li class="list-group-item">GitHub:
                            <a href = "${githubProfile}" target="_blank">${githubProfile}</a>
                        </li>
                    </ul>
                </div>
            </div>`;
        } else {
            const school = member.getSchool();
            data = 
            `<div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                    <h5 class="card-header bg-primary text-light">${name}<br /><br />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                    Intern</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${id}</li>
                        <li class="list-group-item">Email Address:
                            <a href = "mailto:${email}"> ${email}</a>
                        </li>
                        <li class="list-group-item">School: ${school}</li>
                    </ul>
                </div>
            </div>`;
        }
        console.log("Adding new team member to the HTML file...");
        fs.appendFile("./Dist/myTeam.html", data, (err) => {
            if (err) {
                return reject (err)
            };
            return resolve();
        });
    });
}

function endHtml() {
    const html = 
    `</div>
    </div>
    </body>
    </html>`;
    fs.appendFile("./Dist/myTeam.html",html,(err) => 
        err ? console.log(err) : console.log("success")
    )
}
init();