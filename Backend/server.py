from flask import Flask,  request, jsonify, render_template
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
from pymongo import MongoClient
import certifi
import json
import hashlib

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb://localhost/apadproject'
mongo = PyMongo(app)
cluster = MongoClient("mongodb+srv://shrawanibawage:Shrawani7@clustertest.4curtxj.mongodb.net/" , tlsCAFile=certifi.where()) 
db = cluster.apadproject
CORS(app)
collection1 = db.users
collection2= db.projects
hardware_collection=db.hardwaresets

def encrypt_password(password):
    # Convert the password to bytes before hashing
    password_bytes = password.encode('utf-8')

    # Use SHA-256 algorithm to encrypt the password
    hashed_password = hashlib.sha256(password_bytes).hexdigest()

    return hashed_password


@app.route('/login', methods=['POST'])
def check_login_details():

    # data = json.loads(request.data) 
    data = request.json
    username = data.get('username')
    password = data.get('password')
    hashed_password= encrypt_password(password)
    
    # print(data)
    result = collection1.find_one({"username":username})
    # print(password)
    # print(result['password'])
    # print(hashed_password)

    if result : 

        if result['password'] == hashed_password:
            response = jsonify({"validLogin" : "true"})
        else:
            response = jsonify({"validLogin" : "false"})
    else :
        response = jsonify({"validLogin" : "Not Found"})
    return response

@app.route('/register', methods=['POST'])
def register_user() :
    # data = json.loads(request.data)
    data = request.json
    username = data.get('username')
    password = data.get('password')
    hashed_password= encrypt_password(password)
    if collection1.insert_one({'username': username, 'password': hashed_password}) :
        response = jsonify({"validRegister" : "true"})
    return response
    
@app.route('/CreateProject', methods=['POST'])
def create_project():
    data = json.loads(request.data)
    print(data)
    if collection2.insert_one(data) :
        response = jsonify({"validCreation" : "true"})
    return response
@app.route('/JoinProject', methods=['POST'])
def enter_project():
    # data = json.loads(request.data)
    data = request.json
    projectID = data.get('projectID')
    print(projectID)
    result_project = collection2.find_one({"projectID":projectID})
    if result_project : 
        response = jsonify({"validCreation" : "true"})
    else:
        response = jsonify({"validCreation" : "false"})
    return response


# # Endpoint to get all hardware documents
# @app.route("/api/hardwaresets", methods=["GET"])
# def get_hardware():
#     hardware_list = list(hardware_collection.find({}, {"_id": 0}))
#     return jsonify(hardware_list), 200

# # Endpoint to update the availability of a hardware document
# @app.route("/api/hardwaresets/checkin/<int:Capacity>", methods=["PATCH"])
# def update_availability(Capacity):
#     quantity = request.json.get("quantity")
    
#     # Get the hardware document with the given capacity
#     hardware = hardware_collection.find_one({"Capacity": Capacity})
#     if not hardware:
#         return jsonify({"message": "Hardware not found"}), 404

#     new_availability = hardware["Availability"] + quantity
    
#     # Check if the new availability exceeds capacity
#     if new_availability > hardware["Capacity"]:
#         return jsonify({"message": "Availability exceeds capacity"}), 400
    
#     # Update the availability in the database
#     hardware_collection.update_one({"Capacity": Capacity}, {"$set": {"Availability": new_availability}})
    
#     return jsonify({"message": "Availability updated successfully"}), 200

# Endpoint to get all hardware documents
@app.route("/hardwaresets", methods=["GET"])
def get_hardware():
    hardware_list = list(hardware_collection.find({}, {"_id": 0}))
    return jsonify(hardware_list), 200

# Function to perform Check In
def check_in_availability(hardware_set, quantity):
    hardware = hardware_collection.find_one({"Hardware_Set": hardware_set})
    if not hardware:
        return {"message": "Hardware not found"}, 404

    capacity = hardware["Capacity"]
    availability = hardware["Availability"]
    new_availability = availability + quantity

    if new_availability > capacity:
        return {"message": "Availability exceeds capacity"}, 400

    hardware_collection.update_one(
        {"Hardware_Set": hardware_set},
        {"$set": {"Availability": new_availability}}
    )
    
    return {"message": "Check In successful"}, 200

# Function to perform Check Out
def check_out_availability(hardware_set, quantity):
    hardware = hardware_collection.find_one({"Hardware_Set": hardware_set})
    if not hardware:
        return {"message": "Hardware not found"}, 404

    availability = hardware["Availability"]
    new_availability = availability - quantity

    if new_availability < 0:
        return {"message": "Availability cannot be less than 0"}, 400

    hardware_collection.update_one(
        {"Hardware_Set": hardware_set},
        {"$set": {"Availability": new_availability}}
    )
    
    return {"message": "Check Out successful"}, 200

@app.route("/hardwaresets/<hardware_set>/checkin", methods=["PATCH"])
def check_in(hardware_set):
    quantity = request.json.get("quantity")
    response, status_code = check_in_availability(hardware_set, quantity)
    return jsonify(response), status_code

@app.route("/hardwaresets/<hardware_set>/checkout", methods=["PATCH"])
def check_out(hardware_set):
    quantity = request.json.get("quantity")
    response, status_code = check_out_availability(hardware_set, quantity)
    return jsonify(response), status_code


if __name__ == "__main__":
    print("Hello")
    app.run(port=5000)