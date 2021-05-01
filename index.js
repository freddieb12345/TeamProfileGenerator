const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const employees = [];

function init() {
    addTeamMember();
    createHtmlFile();
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
            <nav class="navbar navbar-dark bg-dark mb-5">
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
        if (role === "Manger") {
            const officeNumber = member.getNumber;
            data = 
            `<div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                    <h5 class="card-header">${name}<br /><br />Manager</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${id}</li>
                        <li class="list-group-item">Email Address: ${email}</li>
                        <li class="list-group-item">Office Phone: ${officeNumber}</li>
                    </ul>
                </div>
            </div>`
        } else if (role === "Engineer") {
            const githubProfile = member.getGithub;
            data = 
            `<div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                    <h5 class="card-header">${name}<br /><br />Engineer</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${id}</li>
                        <li class="list-group-item">Email Address: ${email}</li>
                        <li class="list-group-item">GitHub: ${githubProfile}</li>
                    </ul>
                </div>
            </div>`;
        } else {
            const school = member.getSchool;
            data = 
            `<div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                    <h5 class="card-header">${name}<br /><br />Intern</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${id}</li>
                        <li class="list-group-item">Email Address: ${email}</li>
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