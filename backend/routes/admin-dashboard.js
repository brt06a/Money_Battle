// admin-dashboard.js
document.addEventListener('DOMContentLoaded', () => {
console.log("Admin Dashboard Loaded");
});

// Logout handler
function logout() {
localStorage.removeItem('token');
window.location.href = '/login.html';
}

// Activate a user
async function activateUser() {
const userId = document.getElementById('userId').value;
if (!userId) return alert('Enter a User ID');
try {
const res = await fetch(/api/user/${userId}/activate, {
method: 'PUT',
headers: authHeaders()
});
const data = await res.json();
alert(data.message || 'User activated');
} catch (err) {
console.error(err);
alert('Failed to activate user');
}
}

// Deactivate a user
async function deactivateUser() {
const userId = document.getElementById('userId').value;
if (!userId) return alert('Enter a User ID');
try {
const res = await fetch(/api/user/${userId}/deactivate, {
method: 'PUT',
headers: authHeaders()
});
const data = await res.json();
alert(data.message || 'User deactivated');
} catch (err) {
console.error(err);
alert('Failed to deactivate user');
}
}

// Promote user to admin
async function promoteToAdmin() {
const userId = document.getElementById('userId').value;
if (!userId) return alert('Enter a User ID');
try {
const res = await fetch(/api/user/${userId}/promote, {
method: 'PUT',
headers: authHeaders()
});
const data = await res.json();
alert(data.message || 'User promoted to admin');
} catch (err) {
console.error(err);
alert('Failed to promote user');
}
}

// List all users
async function listUsers() {
try {
const res = await fetch('/api/user', {
headers: authHeaders()
});
const users = await res.json();
document.getElementById('userOutput').textContent = JSON.stringify(users, null, 2);
} catch (err) {
console.error(err);
alert('Failed to load users');
}
}

// Process all pending withdrawals
async function processWithdrawals() {
try {
const res = await fetch('/api/payment/process', {
method: 'POST',
headers: authHeaders()
});
const result = await res.json();
document.getElementById('withdrawalLog').textContent = JSON.stringify(result, null, 2);
} catch (err) {
console.error(err);
alert('Failed to process withdrawals');
}
}

// Helper: Authentication headers
function authHeaders() {
return {
'Content-Type': 'application/json',
'Authorization': Bearer ${localStorage.getItem('token')}
};
}
