from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import csv

db = SQLAlchemy()
ma = Marshmallow()
cors = CORS()


def load_data_from_csv(file_path):
    from app.models import Sector, StockTrade, Company

    with open(file_path, mode="r") as file:
        reader = csv.DictReader(file)

        for row in reader:
            # Handle sectors
            sector_level_one = Sector.query.filter_by(name=row["sector_level1"]).first()
            if not sector_level_one:
                sector_level_one = Sector(name=row["sector_level1"])
                db.session.add(sector_level_one)
                db.session.commit()

            sector_level_two = Sector.query.filter_by(name=row["sector_level2"]).first()
            if not sector_level_two:
                sector_level_two = Sector(name=row["sector_level2"])
                db.session.add(sector_level_two)
                db.session.commit()

            # Handle companies
            company = Company.query.filter_by(name=row["name"]).first()
            if not company:
                company = Company(
                    name=row["name"],
                    sector_level_one_id=sector_level_one.id,
                    sector_level_two_id=sector_level_two.id,
                )
                db.session.add(company)
                db.session.commit()

            # Create exchange data
            trade_date = datetime.strptime(row["asof"], "%m/%d/%Y")
            trade = StockTrade(
                company_id=company.id,
                volume=int(row["volume"]),
                close_usd=float(row["close_usd"]),
                asof=trade_date,
            )
            db.session.add(trade)
            db.session.commit()
