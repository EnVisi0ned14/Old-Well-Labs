from app.extensions import db
import sqlalchemy as sa


class Sector(db.Model):
    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.String(length=100), unique=True, nullable=False)


class Company(db.Model):
    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.String(length=100), unique=True, nullable=False)
    sector_level_one_id = sa.Column(
        sa.Integer, sa.ForeignKey("sector.id", ondelete="SET NULL"), nullable=True
    )
    sector_level_two_id = sa.Column(
        sa.Integer, sa.ForeignKey("sector.id", ondelete="SET NULL"), nullable=True
    )

    # Define relationships to the Sector model
    sector_level_one = db.relationship("Sector", foreign_keys=[sector_level_one_id])
    sector_level_two = db.relationship("Sector", foreign_keys=[sector_level_two_id])


class StockTrade(db.Model):
    id = sa.Column(sa.Integer, primary_key=True)
    company_id = sa.Column(
        sa.Integer,
        sa.ForeignKey("company.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    volume = sa.Column(sa.Integer, nullable=False, default=0)
    close_usd = sa.Column(sa.Numeric(precision=10, scale=2), nullable=False)
    asof = sa.Column(sa.DateTime, nullable=False, index=True)

    # Define relationship to the Company model
    company = db.relationship("Company", backref="stock_trades")
