document.getElementById('addEmployeeBtn').addEventListener('click', trackEmployeeData);

function collectEmployees() {
    let employees = [];
    let addMore = true;

    while (addMore) {
        const firstName = prompt("Enter employee's first name:");
        const lastName = prompt("Enter employee's last name:");
        let salary = parseFloat(prompt("Enter employee's salary:"));

        if (isNaN(salary)) {
            salary = 0;
        }

        employees.push({ firstName, lastName, salary });

        addMore = confirm("Do you want to add another employee?");
    }

    return employees;
}

function displayEmployees(employees) {
    const tbody = document.querySelector('#employeeTable tbody');
    tbody.innerHTML = ''; // Clear the table before adding new rows

    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="text" value="${employee.firstName}" onchange="updateEmployee(${index}, 'firstName', this.value)"></td>
            <td><input type="text" value="${employee.lastName}" onchange="updateEmployee(${index}, 'lastName', this.value)"></td>
            <td><input type="number" value="${employee.salary}" onchange="updateEmployee(${index}, 'salary', this.value)"></td>
            <td class="action-buttons">
                <button onclick="editEmployee(${index})">Edit</button>
                <button onclick="deleteEmployee(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function updateEmployee(index, field, value) {
    const employees = getEmployeesFromTable();
    employees[index][field] = field === 'salary' ? parseFloat(value) : value;
    displayEmployees(employees);
    displayAverageSalary(employees);
}

function displayAverageSalary(employees) {
    const totalSalary = employees.reduce((sum, employee) => sum + employee.salary, 0);
    const averageSalary = totalSalary / employees.length;
    console.log(`Average Salary: ${averageSalary.toFixed(2)}, Number of Employees: ${employees.length}`);
}

function getRandomEmployee(employees) {
    const randomIndex = Math.floor(Math.random() * employees.length);
    const randomEmployee = employees[randomIndex];
    console.log(`Random Employee: ${randomEmployee.firstName} ${randomEmployee.lastName}`);
}

function trackEmployeeData() {
    const employees = collectEmployees();

    employees.sort((a, b) => a.lastName.localeCompare(b.lastName));

    displayEmployees(employees);
    displayAverageSalary(employees);
    getRandomEmployee(employees);
}

function editEmployee(index) {
    const employees = getEmployeesFromTable();
    const employee = employees[index];

    const firstName = prompt("Edit employee's first name:", employee.firstName);
    const lastName = prompt("Edit employee's last name:", employee.lastName);
    let salary = parseFloat(prompt("Edit employee's salary:", employee.salary));

    if (isNaN(salary)) {
        salary = 0;
    }

    employees[index] = { firstName, lastName, salary };
    displayEmployees(employees);
    displayAverageSalary(employees);
}

function deleteEmployee(index) {
    let employees = getEmployeesFromTable();
    employees.splice(index, 1);
    displayEmployees(employees);
    displayAverageSalary(employees);
}

function getEmployeesFromTable() {
    const rows = document.querySelectorAll('#employeeTable tbody tr');
    const employees = [];
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        employees.push({
            firstName: cells[0].querySelector('input').value,
            lastName: cells[1].querySelector('input').value,
            salary: parseFloat(cells[2].querySelector('input').value)
        });
    });
    return employees;
}
