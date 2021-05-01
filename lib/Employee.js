const inquirer = require("inquirer");
const fs = require('fs');

class Employee {
    constructor(name,id,email,number) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.number = number;
    }

    printInfo() {
        console.log(`The managers name is ${this.name}`);
        console.log(`The managers id is ${this.id}`);
        console.log(`The managers email is ${this.email}`);
        console.log(`The managers office number is ${this.number}`);
    }
}

module.exports = Employee;

