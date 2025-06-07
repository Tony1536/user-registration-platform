// Cambia esto con la IP pública de tu EC2
const backendBaseURL = 'http://13.221.72.191:5000';

// Register User
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const userData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        country: document.getElementById('country').value.trim()
    };

    try {
        const response = await fetch(`${backendBaseURL}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message || 'Error registering user');
        }

        const result = await response.json();
        alert(result.message);

        // Add user to the table (demo only — in real app, you'd fetch the list again)
        const table = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.insertCell(0).innerText = userData.name;
        newRow.insertCell(1).innerText = userData.email;
        newRow.insertCell(2).innerText = userData.country;

        // Reset form
        document.getElementById('registerForm').reset();
    } catch (error) {
        console.error('Registration failed:', error);
        alert(`Registration failed: ${error.message}`);
    }
});

// Upload File
document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const uploadProgress = document.getElementById('uploadProgress');
    uploadProgress.innerText = 'Uploading...';

    try {
        const response = await fetch(`${backendBaseURL}/api/upload`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message || 'Error uploading file');
        }

        const result = await response.json();
        alert(result.message);

        uploadProgress.innerText = 'Upload completed successfully.';
        document.getElementById('uploadForm').reset();
    } catch (error) {
        console.error('Upload failed:', error);
        uploadProgress.innerText = `Upload failed: ${error.message}`;
    }
});
