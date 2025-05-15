// auth.js

// Backend API base URL
const API_URL = 'http://localhost:5000/api/auth';

// Handle user login
async function loginUser(email, password) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Login failed');

    localStorage.setItem('token', data.token);
    window.location.href = '/dashboard.html';
  } catch (err) {
    alert(err.message);
  }
}

// Handle user registration
async function registerUser(name, email, password) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Registration failed');

    alert('Registration successful. Please log in.');
    window.location.href = '/login.html';
  } catch (err) {
    alert(err.message);
  }
}

// Check if user is authenticated
function isAuthenticated() {
  return !!localStorage.getItem('token');
}

// Redirect to login if not authenticated
function requireAuth() {
  if (!isAuthenticated()) {
    alert('You must log in to continue');
    window.location.href = '/login.html';
  }
}

// Logout function
function logoutUser() {
  localStorage.removeItem('token');
  window.location.href = '/login.html';
}

// Get headers with auth token
function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Attach handlers on page load
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm.email.value;
      const password = loginForm.password.value;
      loginUser(email, password);
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = registerForm.name.value;
      const email = registerForm.email.value;
      const password = registerForm.password.value;
      registerUser(name, email, password);
    });
  }
});
