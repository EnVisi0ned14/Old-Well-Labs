from flask import Blueprint

bp = Blueprint("api", __name__)

from app.company import bp as company_bp
from app.stock import bp as stock_bp

bp.register_blueprint(company_bp, url_prefix="companies/")
bp.register_blueprint(stock_bp, url_prefix="stocks/")
