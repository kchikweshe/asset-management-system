"Testing of serializers for each model"
from rest_framework.serializers import ModelSerializer

from asset_management.serializers import EmployeeSerializer, DepartmentSerializer
from tests.asset_management.fixtures import *


@pytest.mark.django_db
class BaseTestSerializer:
    payload: dict()
    serializer: ModelSerializer
    user_payload = {
        'first_name': 'komborerai',
        'last_name': 'chikweshe',
        'email': 'kombogc@gmail.com',
        'username': 'kombo',
        'password1': '!@#123kombo',
        'password2': '!@#123kombo'}

    def test_valid_serializer(self, db, role_one, department_one, address_one, user_one):
        pass

    def test_invalid_serializer(self, db):
        pass


@pytest.mark.django_db
class TestEmployeeSerializer(BaseTestSerializer):
    employee_payload = {
        "user": 1,
        "address": 1,
        "title": "Mr.",
        "gender": "Male",
        "date_of_birth": "1995-7-12",
        "national_identifier_number": "63-1506262Z25",
        "role": 1
    }

    def test_valid_serializer(self, db, role_one, department_one, address_one, user_one):
        self.employee_payload['user'] = user_one.pk
        self.employee_payload['address'] = address_one.pk
        self.employee_payload['role'] = role_one.pk
        self.serializer = EmployeeSerializer(data=self.employee_payload)
        assert self.serializer.is_valid(raise_exception=True)
        assert self.serializer.validated_data is 200


class TestUserSerializer(BaseTestSerializer):
    user_payload = {
        'first_name': 'komborerai',
        'last_name': 'chikweshe',
        'email': 'kombogc@gmail.com',
        'username': 'kombo',
        'password1': '!@#123kombo',
        'password2': '!@#123kombo'}


class TestRoleSerializer(BaseTestSerializer):
    role1_payload = {
        "name": "Software Engineer",
        "description": "Developing, testing and maintaining systems"
    }
    role2_payload = {
        "name": "Software Tester",
        "description": "Testing of software products"
    }


class TestDepartmentSerializer(BaseTestSerializer):
    serializer = DepartmentSerializer
    payload = {
        "name": "IT",
        "description": "Information Technology"
    }

    def test_valid_serializer(self, db, role_one, department_one, address_one, user_one, role_two):
        payload = {
            "name": "IT",
            "description": "Information Technology",
            "roles": [
                {"id": 1, "name": "Software Developer"},
                {"id": 2, "name": "System Administrator"}
            ]
        }

        self.serializer = DepartmentSerializer(data=payload, instance=department_one)

        assert self.serializer.is_valid(raise_exception=True)
        assert self.serializer.data == payload


class TestAddressSerializer(BaseTestSerializer):
    pass
