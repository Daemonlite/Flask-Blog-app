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
    profile = request.json['profile']
    new_user = User(name=name, email=email, password=password,profile=profile)
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

@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'user deleted successfully.'})
    else:
        return jsonify({'error': 'user not found.'}), 404

@app.route('/posts',methods=["GET"])
def getPosts():
    posts = Post.query.all()
    post_list = [post.to_dict() for post in posts]
    return jsonify(posts=post_list)


@app.route('/posts/<int:post_id>',methods=["GET"])
def get_post_by_id(post_id):
    Posts = Post.query.get(post_id)
    if Posts:
        return jsonify(Posts.to_dict())
    else:
        return jsonify({'error': 'Post not found.'}), 404
    
@app.route('/posts/create',methods=["POST"])
def create_post():
    title = request.json['title']
    content = request.json['content']
    user_id = request.json['user_id']
    new_post = Post(title=title, content=content, user_id=user_id)
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'post added successfully.', 'post': new_post.to_dict()}), 201


@app.route('/posts/<int:id>',methods=["PUT"])
def update_post(id):
    post = Post.query.get(id)
    if post:
        post.title = request.json['title']
        post.content = request.json['content']
        post.user_id = request.json['user_id']
        db.session.commit()
        return jsonify({'message': 'post updated successfully.', 'post': post.to_dict()})
    else:
        return jsonify({'error': 'post not found.'}), 404

@app.route('/posts/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)
    if post:
        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'post deleted successfully.'})
    else:
        return jsonify({'error': 'post not found.'}), 404



if __name__ == '__main__':
    with app.app_context():  
        db.create_all()  
    app.run(debug=True)


