from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields
from ..models import *


class SectorSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Sector
        load_instance = True
        include_relationships = True


class CompanySchema(SQLAlchemyAutoSchema):
    sector_level_one = fields.Nested(SectorSchema)
    sector_level_two = fields.Nested(SectorSchema)

    class Meta:
        model = Company
        load_instance = True
        include_relationships = True
        exclude = ("stock_trades",)


class StockTradeSchema(SQLAlchemyAutoSchema):
    company = fields.Nested(CompanySchema)

    class Meta:
        model = StockTrade
        load_instance = True
        include_relationships = True
