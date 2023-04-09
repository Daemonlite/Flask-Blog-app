from flask import Flask, jsonify, request
from models import db, User, Post

app = Flask(__name__)

# Configure the database connection settings
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy with the Flask app
db.init_app(app)

# Define your routes

@app.route('/users', methods=["GET"])
def get_users():
    users = User.query.all()
    user_list = [user.to_dict() for user in users]
    return jsonify(users=user_list)

@app.route('/user/<int:user_id>', methods=["GET"])
def user_profile(user_id):
    profile = User.query.get(user_id)
    if profile:
        return jsonify(profile.to_dict())
    else:
        return jsonify({'error': 'Profile not found.'}), 404

@app.route('/register', methods=["POST"])
def register_user():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    new_user = User(name=name, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User added successfully.', 'user': new_user.to_dict()}), 201

@app.route('/login', methods=["POST"])
def login():
    email = request.json['email']
    password = request.json['password']
    user = User.query.filter_by(email=email).first()
    if user and user.password == password:
        return jsonify({'message': 'Login successful.', 'user': user.to_dict()})
    else:
        return jsonify({'error': 'Invalid email or password.'}), 401

if __name__ == '__main__':
    with app.app_context():  
        db.create_all()  
    app.run(debug=True)


