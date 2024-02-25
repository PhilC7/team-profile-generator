const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team = []; // empty array to store added team members

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// function to add manager
async function addManager() {
    const managerInfo = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the manager's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email address?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?"
        }
    ]);

    // create a new object for manager
    const employee = new Manager(
        managerInfo.name,
        managerInfo.id,
        managerInfo.email,
        managerInfo.officeNumber
    );

    team.push(employee); // add to team array
    await addStaff(); // call function to add extra staff


};

// function to select what employee type you want to add
async function addStaff() {
    const staffType = await inquirer.prompt([
        {
            type: "list",
            name: "staff",
            message: "What staff member would you like to add?",
            choices: ["Engineer", "Intern", "None"],
        }
    ]);

    //if else statement to call functions depending on users choice.
    if (staffType.staff === "Engineer") {
        await addEngineer();
    } else if (staffType.staff === "Intern") {
        await addIntern();
    } else {
        await render();
    }
};


async function addEngineer() {
    const engineerInfo = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub name?"
        }
    ]);

    // create a new object for engineer
    const engineer = new Engineer(
        engineerInfo.name,
        engineerInfo.id,
        engineerInfo.email,
        engineerInfo.github
    );

    team.push(engineerInfo);
    await addStaff();
};

async function addIntern() {
    const internInfo = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the Intern's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Intern's email address?"
        },
        {
            type: "input",
            name: "shool",
            message: "What is the Intern's school?"
        }
    ]);

    // create a new object for intern
    const intern = new Intern(
        internInfo.name,
        internInfo.id,
        internInfo.email,
        internInfo.officeNumber
    );

    team.push(internInfo);
    await addStaff();
};

addManager();