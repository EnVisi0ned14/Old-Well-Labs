from flask import Flask
from config import Config
from app.extensions import db, ma, cors
from app.models import *


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize Flask extensions here
    cors.init_app(app)  # TODO: Restrict CORS to frontend
    db.init_app(app)
    ma.init_app(app)

    # Register blueprints here
    from app.api import bp as api_bp

    app.register_blueprint(api_bp, url_prefix="/api/v1/")

    return app
