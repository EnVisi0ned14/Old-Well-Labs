from app.extensions import db
from app.models import StockTrade, Company
from app.schemas import StockTradeSchema
from datetime import datetime


def serialize_response(data, many: bool):
    schema = StockTradeSchema(many=many)

    return schema.dump(data)


class StockService:

    @staticmethod
    def fetchStocks(company_id: int = None):
        query = db.session.query(StockTrade)

        if company_id:
            query = query.filter(StockTrade.company_id == company_id)

        stocks = query.all()

        return serialize_response(stocks, many=True)

    @staticmethod
    def fetchStockWithId(id: int):
        stock = StockTrade.query.get(id)

        if stock:
            return serialize_response(stock, many=False)
        return None

    @staticmethod
    def calculate_cumulative_returns(company_id: int, start_date: str, end_date: str):
        # Validate the date formats
        try:
            start_date = datetime.strptime(start_date, "%Y-%m-%d")
            end_date = datetime.strptime(end_date, "%Y-%m-%d")
        except ValueError:
            return None

        # If invalid range
        if end_date < start_date:
            return None

        # Fetch the first stock price within the date range
        first_stock = (
            db.session.query(StockTrade)
            .filter(StockTrade.company_id == company_id, StockTrade.asof == start_date)
            .first()
        )

        # Fetch the last stock price within the date range
        last_stock = (
            db.session.query(StockTrade)
            .filter(
                StockTrade.company_id == company_id,
                StockTrade.asof == end_date,
            )
            .first()
        )

        if not first_stock or not last_stock:
            return None

        # Calculate cumulative returns
        initial_price = float(first_stock.close_usd)
        final_price = float(last_stock.close_usd)

        # Calculate cumulative return as a percentage
        cumulative_return = ((final_price - initial_price) / initial_price) * 100

        return {
            "cumulative_return": round(cumulative_return, 10),
            "initial_price": initial_price,
            "final_price": final_price,
            "start_date": start_date.strftime("%Y-%m-%d"),
            "end_date": start_date.strftime("%Y-%m-%d"),
        }
