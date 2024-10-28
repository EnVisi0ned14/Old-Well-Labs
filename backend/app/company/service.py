from app.models import Company
from app.schemas import CompanySchema


def serialize_response(data, many: bool):
    schema = CompanySchema(many=many)

    return schema.dump(data)


class CompanyService:

    @staticmethod
    def fetch_companies():
        companies = Company.query.all()

        return serialize_response(companies, many=True)
