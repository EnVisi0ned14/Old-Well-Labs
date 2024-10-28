from app.company import bp
from app.models import Company
from app.schemas import CompanySchema
from app.company.service import CompanyService
from flask import jsonify


@bp.route("/")
def index():
    return jsonify(CompanyService.fetch_companies())
