// Cambia esto con la IP pública de tu EC2
const backendBaseURL = 'http://13.221.72.191:5000';

// Register User
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        country: document.getElementById('country').value
    };

    const response = await fetch(`${backendBaseURL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    const result = await response.json();
    alert(result.message);

    // Optionally update the users table (demo only — in real app, you'd fetch the list again)
    const table = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.insertCell(0).innerText = userData.name;
    newRow.insertCell(1).innerText = userData.email;
    newRow.insertCell(2).innerText = userData.country;

    // Reset form
    document.getElementById('registerForm').reset();
});

// Upload File
document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    const uploadProgress = document.getElementById('uploadProgress');
    uploadProgress.innerText = 'Uploading...';

    const response = await fetch(`${backendBaseURL}/upload`, {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    alert(result.message);

    uploadProgress.innerText = '';
    document.getElementById('uploadForm').reset();
});
