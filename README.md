# User Registration Platform with AWS + Docker Compose

## 📌 Project Overview

This project is a demonstration of how to build a simple **User Registration Platform** using:

- Docker & Docker Compose
- Flask REST API (backend)
- NGINX static frontend
- AWS DynamoDB (to store user registrations)
- AWS S3 (to store uploaded files)

## 🗺 Architecture

Frontend (NGINX) --> Docker Container (port 80)
Backend (Flask API) --> Docker Container (port 5000)
AWS DynamoDB (users-registration table)
AWS S3 (myapp-userfiles bucket)


## ⚙️ AWS Services Used

- **DynamoDB Table**: `users-registration`
  - Partition Key: `user_id` (String)
  - Attributes: `name`, `email`, `country`, `file_s3_key`

- **S3 Bucket**: `myapp-userfiles`
  - Stores user-uploaded files.

- **IAM Role** attached to EC2 Instance with permissions for:
  - DynamoDB Full Access (or write access to `users-registration`)
  - S3 Full Access (or write access to `myapp-userfiles`)

## 🖥 How to Run the Project Locally

1. Clone the repository:

```bash
git clone <your-repo-url>
cd project-root

2. Build and run with Docker Compose:
docker-compose up --build

3. Open your browser and go to
http://localhost

4. How to Deploy on AWS EC2 (Free Tier)
Launch a new EC2 instance (Amazon Linux 2023 or Ubuntu).

Attach the IAM Role with S3 + DynamoDB permissions.

Install Docker & Docker Compose on EC2.

Clone your GitHub repo on EC2:

git clone <your-repo-url>
cd project-root

5. Run the app on EC2:
docker-compose up --build -d

6. Open your EC2 public IP in the browser:
http://<ec2-public-ip>

🎨 Frontend Features
User registration form:

Name

Email

Country

Table displaying registered users (demo update)

File upload form with progress indication.

🔗 API Endpoints
POST /api/register → Register a new user in DynamoDB.

POST /api/upload → Upload a file to S3 bucket.

🚧 Future Improvements (optional ideas)
Add /api/users endpoint to list all registered users dynamically.

Add email validation and duplicate email check.

Display uploaded files list.

Add login functionality with AWS Cognito.

🤝 Author
Project created for practice combining:

Docker

AWS Free Tier services

Modern frontend/backend development