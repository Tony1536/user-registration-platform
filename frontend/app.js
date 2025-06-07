const backendBaseURL = 'http://44.202.160.41:5000';

// Register User
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        country: document.getElementById('country').value
    };

    try {
        console.log("Sending register request:", userData);

        const response = await fetch(`${backendBaseURL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        console.log("Response status:", response.status);

        const result = await response.json();
        console.log("Response body:", result);

        if (response.ok) {
            alert(result.message);

            // Update the users table
            const table = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
            const newRow = table.insertRow();
            newRow.insertCell(0).innerText = userData.name;
            newRow.insertCell(1).innerText = userData.email;
            newRow.insertCell(2).innerText = userData.country;

            document.getElementById('registerForm').reset();
        } else {
            alert(`Failed to register user. Server says: ${result.message}`);
        }

    } catch (error) {
        console.error("Error during register fetch:", error);
        alert(`Failed to register user. Error: ${error}`);
    }
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

    try {
        console.log("Sending file upload request:", file.name);

        const response = await fetch(`${backendBaseURL}/upload`, {
            method: 'POST',
            body: formData
        });

        console.log("Upload response status:", response.status);

        const result = await response.json();
        console.log("Upload response body:", result);

        if (response.ok) {
            alert(result.message);
        } else {
            alert(`Failed to upload file. Server says: ${result.message}`);
        }

    } catch (error) {
        console.error("Error during file upload fetch:", error);
        alert(`Failed to upload file. Error: ${error}`);
    }

    uploadProgress.innerText = '';
    document.getElementById('uploadForm').reset();
});
