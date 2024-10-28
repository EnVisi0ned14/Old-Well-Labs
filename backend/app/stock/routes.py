from app.stock.service import StockService
from app.stock import bp
from app.models import *
from flask import jsonify, request
import http


@bp.route("/")
def index():
    # Get company_id parameter from query string
    company_id = request.args.get("company_id", type=int)

    return jsonify(StockService.fetchStocks(company_id=company_id))


@bp.route("/<int:id>/")
def get_stock(id: int):
    stock = StockService.fetchStockWithId(id)

    if stock:
        return jsonify(stock)
    else:
        return jsonify({"error": "Stock not found"}), http.HTTPStatus.NOT_FOUND


@bp.route("/cumulative-returns/")
def calculate_cumulative_returns():
    # Get start and end dates from the query parameters
    company_id = request.args.get("company_id", type=int)
    start_date = request.args.get("start_date", type=str)
    end_date = request.args.get("end_date", type=str)

    cumulative_returns = StockService.calculate_cumulative_returns(
        company_id=company_id, start_date=start_date, end_date=end_date
    )

    if cumulative_returns:
        return jsonify(cumulative_returns)
    else:
        return (
            jsonify({"error": "No stocks in the listed date ranges"}),
            http.HTTPStatus.NOT_FOUND,
        )
