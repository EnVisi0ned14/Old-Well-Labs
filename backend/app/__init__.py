from flask import Flask, Blueprint
from config import Config
from app.extensions import db, ma, cors, load_data_from_csv
from app.models import *


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize Flask extensions here
    cors.init_app(app)  # TODO: Restrict CORS to frontend
    db.init_app(app)
    ma.init_app(app)

    with app.app_context():
        db.drop_all()
        db.create_all()
        load_data_from_csv("./data/stock-data.csv")

    # Register blueprints here
    from app.api import bp as api_bp

    app.register_blueprint(api_bp, url_prefix="/api/v1/")

    return app
