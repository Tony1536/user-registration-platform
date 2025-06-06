from flask import Flask, request, jsonify
import boto3
import uuid
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name=os.getenv('AWS_REGION', 'us-east-1'))
table = dynamodb.Table('clients-information')  # <-- usa la misma que en el código frontend

# S3 client
s3 = boto3.client('s3', region_name=os.getenv('AWS_REGION', 'us-east-1'))
bucket_name = 'myapp-userfiles'  # <-- reemplaza con tu bucket real

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user_id = str(uuid.uuid4())

    table.put_item(Item={
        'user_id': user_id,
        'name': data['name'],
        'email': data['email'],
        'country': data['country'],
        'file_s3_key': ''  # initially empty
    })

    return jsonify({'message': 'User registered successfully', 'user_id': user_id})

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    file_key = f"{str(uuid.uuid4())}_{file.filename}"

    s3.upload_fileobj(file, bucket_name, file_key)

    return jsonify({'message': 'File uploaded successfully!', 'file_key': file_key})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
