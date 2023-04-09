from flask import Flask, render_template,jsonify, request
from models import db, User, Post

app = Flask(__name__)

# Configure the database connection settings
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db' # Example using SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy with the Flask app
db.init_app(app)

# Define your routes

@app.route('/users', methods=['GET'])
def get_users():
    Profile= User.query.all()
    users = [user.to_dict() for user in Profile]
    return jsonify(users)

@app.route('/users/<int:id>', methods=['GET'])
def get_vacation_spot(id):
    spot = User.query.get(id)
    if spot:
        return jsonify(spot.to_dict())
    else:
        return jsonify({'error': 'User not found.'}), 404
if __name__ == '__main__':
    with app.app_context():  # Add this line to set up Flask application context
        db.create_all()  # Move this line inside the app context
    app.run(debug=True)

