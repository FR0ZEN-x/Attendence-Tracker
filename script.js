const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const authContainer = document.getElementById('auth-container');
const dashboard = document.getElementById('dashboard');
const attendanceTableBody = document.getElementById('attendance-body');
const markAttendanceForm = document.getElementById('mark-attendance-form');
const toggleAttendanceFormButton = document.getElementById('toggle-attendance-form');
const attendanceForm = document.getElementById('attendance-form');
const logoutButton = document.getElementById('logout-button');

let users = JSON.parse(localStorage.getItem('users') || '[]');
let attendanceRecords = JSON.parse(localStorage.getItem('attendance') || '[]');
let currentUser = null;

function showDashboard() {
    authContainer.style.display = 'none';
    dashboard.style.display = 'block';
    renderAttendanceTable();
}

function hideDashboard() {
    authContainer.style.display = 'block';
    dashboard.style.display = 'none';
}

function renderAttendanceTable() {
    attendanceTableBody.innerHTML = '';
    attendanceRecords.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.student}</td>
            <td>${record.date}</td>
            <td>${record.subject}</td>
            <td>${record.status}</td>
        `;
        attendanceTableBody.appendChild(row);
    });
}

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        currentUser = user;
        showDashboard();
    } else {
        alert('Invalid credentials');
    }
});

signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    if (users.find(user => user.username === username)) {
        alert('Username already exists');
        return;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful. Please login.');
});

markAttendanceForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const student = document.getElementById('student-name').value;
    const date = document.getElementById('attendance-date').value;
    const subject = document.getElementById('subject').value;
    const status = document.getElementById('attendance-status').value;
    attendanceRecords.push({ student, date, subject, status });
    localStorage.setItem('attendance', JSON.stringify(attendanceRecords));
    renderAttendanceTable();
    attendanceForm.style.display = 'none';
});

toggleAttendanceFormButton.addEventListener('click', () => {
    attendanceForm.style.display = attendanceForm.style.display === 'none' ? 'block' : 'none';
});

logoutButton.addEventListener('click', () => {
    currentUser = null;
    hideDashboard();
});

if (currentUser) {
    showDashboard();
}
