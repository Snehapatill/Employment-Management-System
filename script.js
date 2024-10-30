// Store employee data in local storage
let employees = JSON.parse(localStorage.getItem('employees')) || [];

// Display employees in the table
function displayEmployees() {
    const tableBody = document.getElementById('employee-table-body');
    tableBody.innerHTML = ''; // Clear the table

    employees.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.empId}</td>
            <td>${emp.name}</td>
            <td>${emp.department}</td>
            <td>${emp.salary}</td>
            <td>${emp.date}</td>
            <td>
                <button onclick="promoteEmployee('${emp.empId}')">Promote</button>
                <button onclick="removeEmployee('${emp.empId}')">Remove</button>
            </td>
            
        `;
        tableBody.appendChild(row);
    });
    calculateDepartmentSummary();
}

// Add employee from form
document.getElementById('employee-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const empId = document.getElementById('emp-id').value;
    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const salary = parseFloat(document.getElementById('salary').value);
    const date = document.getElementById('date').value;

    const newEmployee = {
        empId,
        name,
        department,
        salary,
        date

    };

    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(employees)); // Save to local storage
    displayEmployees();
    this.reset(); // Clear the form
});

// Remove employee by ID
function removeEmployee(empId) {
    employees = employees.filter(emp => emp.empId !== empId);
    localStorage.setItem('employees', JSON.stringify(employees));
    displayEmployees();
}

// Promote employee (Increase salary)
function promoteEmployee(empId) {
    const emp = employees.find(emp => emp.empId === empId);
    const newSalary = parseFloat(prompt('Enter new salary:', emp.salary));
    if (!isNaN(newSalary)) {
        emp.salary = newSalary;
        localStorage.setItem('employees', JSON.stringify(employees));
        displayEmployees();
    }
}

// Search employees by ID, name, or department
function searchEmployees() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredEmployees = employees.filter(emp =>
        emp.empId.toLowerCase().includes(searchValue) ||
        emp.name.toLowerCase().includes(searchValue) ||
        emp.department.toLowerCase().includes(searchValue) ||
        emp.date.toLowerCase().includes(searchValue)
    );

    const tableBody = document.getElementById('employee-table-body');
    tableBody.innerHTML = ''; // Clear the table

    filteredEmployees.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.empId}</td>
            <td>${emp.name}</td>
            <td>${emp.department}</td>
            <td>${emp.salary}</td>
            <td>${emp.date}</td>
            <td>
                <button onclick="promoteEmployee('${emp.empId}')">Promote</button>
                <button onclick="removeEmployee('${emp.empId}')">Remove</button>
            </td>
            
        `;
        tableBody.appendChild(row);
    });
}

// Calculate department performance summary
function calculateDepartmentSummary() {
    const summary = {};

    employees.forEach(emp => {
        if (!summary[emp.department]) {
            summary[emp.department] = {
                count: 0,
                totalSalary: 0
            };
        }
        summary[emp.department].count += 1;
        summary[emp.department].totalSalary += emp.salary;
    });

    const summaryReport = document.getElementById('summary-report');
    summaryReport.innerHTML = '';
    for (const dept in summary) {
        summaryReport.innerHTML += `${dept}: ${summary[dept].count} Employees, Total Salary: $${summary[dept].totalSalary.toFixed(2)}<br>`;
    }
}

// Load employee list on page load
displayEmployees();