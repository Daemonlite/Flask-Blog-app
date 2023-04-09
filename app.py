from flask import Flask, render_template
from models import db, User, Post

app = Flask(__name__)

# Configure the database connection settings
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db' # Example using SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy with the Flask app
db.init_app(app)

# Define your routes

@app.route('/')
def index():
    users = User.query.all()
    return render_template('index.html', users=users)

@app.route('/user/<int:user_id>')
def user_profile(user_id):
    user = User.query.get(user_id)
    posts = user.posts
    return render_template('user_profile.html', user=user, posts=posts)

if __name__ == '__main__':
    app.run(debug=True)

