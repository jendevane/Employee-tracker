const mysql = require('mysql')
const inquirer = require('inquirer')
let empId

var db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Jmd12456!',
  database: 'emptr',
})

db.connect(function (err) {
  if (err) throw err

  firstPrompt()
})

function firstPrompt() {
  inquirer
    .prompt({
      type: 'list',
      name: 'task',
      message: 'Would you like to do?',
      choices: [
        'View Departments',
        'View Roles',
        'View Employees',
        'Add Department',
        'Add Role',
        'Add Employee',

        'Update Employee',
      ],
    })
    .then(function ({ task }) {
      switch (task) {
        case 'View Employees':
          viewEmployee()
          break
        case 'View Departments':
          viewDepartment()
          break
        case 'View Roles':
          viewRoles()
          break
        case 'Add Employee':
          addEmployee()
          break
        case 'Add Department':
          addDepartment()
          break
        case 'Update Employee':
          updateEmployee()
          break
        case 'Add Role':
          addRole()
          break
      }
    })
}

function viewDepartment() {
  var Department = `SELECT * FROM Department`

  db.query(Department, function (err, results) {
    if (err) throw err
    console.table(results)
  })
}
function viewRoles() {
  var roles = `SELECT r.title, r.id, r.salary, d.namee FROM rolee r
    JOIN department d ON r.department_id=d.id`

  db.query(roles, function (err, results) {
    if (err) throw err
    console.table(results)
  })
}
function viewEmployee() {
  var employee = `SELECT emp.first_name, emp.last_name, emp.manager_id, rol.title, rol.salary
    FROM employee emp
    LEFT JOIN rolee rol
    ON emp.rolee_id = rol.id `

  db.query(employee, function (err, results) {
    if (err) throw err
    console.table(results)
  })
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'dep_name',
        message: 'What is the name of your Department?',
      },
    ])
    .then((answers) => {
      let departmentvalues = {
        namee: answers.dep_name,
      }

      var addDepartment = `INSERT INTO department SET ?`

      db.query(addDepartment, departmentvalues, function (err, results) {
        if (err) throw err
        console.table(results)
      })
    })
}
function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of your role?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
      },
      {
        type: 'input',
        name: 'department',
        message: 'What is the department for the role?',
      },
    ])
    .then((answers) => {
      let rolevalues = {
        title: answers.title,
        salary: answers.salary,
        department_id: answers.department,
      }

      var addRoles = `INSERT INTO rolee SET ?`

      db.query(addRoles, rolevalues, function (err, results) {
        if (err) throw err
        console.table(results)
      })
    })
}

function updateEmployee() {
  var employee = `SELECT * FROM employee`

  db.query(employee, function (err, results) {
    if (err) throw err
    console.log(results)
    let choices = []
    results.forEach((item) => {
      let data = {
        value: item.id,
        name: item.first_name + ',' + item.last_name,
      }
      choices.push(data)
    })

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'What employee do you want to update?',
          choices: choices,
        },
      ])
      .then((answer) => {
        console.log(answer)
        empId = answer.employee
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'role',
              message: 'What is the  new role id?',
            },
          ])
          .then((answer) => {
            console.log(answer)
            var updateEmployee = `UPDATE employee SET rolee_id= ${answer.role} WHERE employee.id = ${empId}`

            db.query(updateEmployee, function (err, results) {
              if (err) throw err
              console.table(results)
            })
          })
      })
  })
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "What is the employee's first name?",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "What is the employee's last name?",
      },
      {
        type: 'input',
        name: 'roleId',
        message: "What is the employee's role ID?",
      },
      {
        type: 'input',
        name: 'manager_id',
        message: "What is the employee's manager ID?",
      },
    ])
    .then((answers) => {
      let employeevalues = {
        first_name: answers.first_name,
        last_name: answers.last_name,
        rolee_id: answers.roleId,
        manager_id: answers.manager_id,
      }

      var addEmployee = `INSERT INTO employee SET ?`

      db.query(addEmployee, employeevalues, function (err, results) {
        if (err) throw err
        console.table(results)
      })
    })
}
