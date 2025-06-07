from flask import Flask, request, jsonify
import boto3
import uuid
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

session = boto3.Session(region_name=os.getenv('AWS_REGION', 'us-east-1'))

# DynamoDB
dynamodb = session.resource('dynamodb')
table = dynamodb.Table('users-registration')

# S3
s3 = session.client('s3')
bucket_name = 'myapp-userfiles'

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    user_id = str(uuid.uuid4())

    table.put_item(Item={
        'user_id': user_id,
        'name': data['name'],
        'email': data['email'],
        'country': data['country'],
        'file_s3_key': ''
    })

    return jsonify({'message': 'User registered successfully', 'user_id': user_id})

@app.route('/api/upload', methods=['POST'])
def upload():
    file = request.files['file']
    file_key = f"{str(uuid.uuid4())}_{file.filename}"

    s3.upload_fileobj(file, bucket_name, file_key)

    return jsonify({'message': 'File uploaded successfully!', 'file_key': file_key})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
