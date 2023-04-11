from flask import Flask, jsonify, request
from models import db, User, Post,Comment,Like
from flask_cors import CORS



app = Flask(__name__)
CORS(app)  # Apply CORS settings to the Flask app

@app.after_request
def add_cors_headers(response):
    # Add CORS headers to the response
    response.headers.add('Access-Control-Allow-Origin', '*') # Allow requests from this origin
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization') # Allow specific headers
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE') # Allow specific HTTP methods
    return response
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
@app.route('/posts', methods=['POST'])
def create_post():
    # Get data from request
    title = request.json['title']
    content = request.json['content']
    user_id = request.json['user_id']

    # Check if all required data is provided
    if title and content and user_id:
        try:
            # Create a new Post object
            post = Post(title=title, content=content, user_id=user_id)

            # Add and commit the new post to the database
            db.session.add(post)
            db.session.commit()

            # Return success response
            return jsonify({'message': 'Post created successfully', 'post_id': post.id}), 201
        except Exception as e:
            # Return error response if an error occurs
            db.session.rollback()
            return jsonify({'message': 'Failed to create post', 'error': str(e)}), 500
    else:
        # Return error response if required data is missing
        return jsonify({'message': 'Missing required data'}), 400


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



# Route to create a new comment for a post
@app.route('/post/<int:post_id>/comment', methods=['POST'])
def create_comment(post_id):
    # Get the post by ID
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    # Get the data from the request
    content = request.json.get('content')
    user_id = request.json.get('user_id')

    # Check if content is provided
    if not content:
        return jsonify({'error': 'Comment content is required'}), 400

    # Check if user_id is provided
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    # Create a new comment
    comment = Comment(content=content, user_id=user_id, post_id=post.id)
    db.session.add(comment)
    db.session.commit()

    return jsonify({'message': 'Comment created successfully', 'comment_id': comment.id}), 201


# Route to get all comments for a post
@app.route('/post/<int:post_id>/comments', methods=['GET'])
def get_comments(post_id):
    # Get the post by ID
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    # Get all comments for the post
    comments = Comment.query.filter_by(post_id=post.id).all()

    # Convert comments to a list of dictionaries
    comments_dict = [comment.to_dict() for comment in comments]

    return jsonify({'comments': comments_dict}), 200


# Route to create a new like for a post
@app.route('/post/<int:post_id>/like', methods=['POST'])
def create_like(post_id):
    # Get the post by ID
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    # Get the data from the request
    user_id = request.json.get('user_id')

    # Create a new like
    like = Like(user_id=user_id, post_id=post.id)
    db.session.add(like)
    db.session.commit()

    return jsonify({'message': 'Like created successfully', 'like_id': like.id}), 201


# Route to get all likes for a post
@app.route('/post/<int:post_id>/likes', methods=['GET'])
def get_likes(post_id):
    # Get the post by ID
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    # Get all likes for the post
    likes = Like.query.filter_by(post_id=post.id).all()

    # Convert likes to a list of dictionaries
    likes_dict = [like.to_dict() for like in likes]

    return jsonify({'likes': likes_dict}), 200

if __name__ == '__main__':
    with app.app_context():  
        db.create_all()  
    app.run(debug=True)


