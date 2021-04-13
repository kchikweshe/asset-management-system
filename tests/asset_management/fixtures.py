"""
This module houses all the test fixtures that will be required 
by all unit tests .“Fixtures”, in the literal sense, are each of the arrange steps and data.
They’re everything that test needs to do its thing. 

The fixtures listed here represent model instances defined in the assets.models module.
"""
import pytest

from asset_management.models import *


@pytest.fixture
def address_one(db):
    """
    Fixture returning an Address instance
    """
    address = Address(street="9 Quendon Road", suburb="Strathaven", city="Harare", province="Harare")
    address.save()
    return address


@pytest.fixture
def address_two(db):
    """
     Fixture returning an Address instance
     """
    address = Address(street="176 Sherwood Drive", suburb="Mabelreign", city="Harare", province='Harare')
    address.save()
    return address


@pytest.fixture
def location_one(db, address_one):
    """
     Fixture returning an Location instance
     """
    return Location(name="Hub A", address=address_one)


@pytest.fixture
def department_one(db, location_one):
    """
     Fixture returning an Department instance
     """
    dept = Department(name="IT", description="Information Technology")
    dept.save()
    return dept


@pytest.fixture
def department_two(db):
    """
     Fixture returning an Department instance
     """
    dept = Department(name="Accounting", description="Department of Accounting")
    dept.save()
    return dept


@pytest.fixture
def asset_one(db, location_one):
    """
    Fixture returning an Asset instance
    """
    return Asset(make="Dell",
                 model="Latitude e5570", serial_number="RC12008SJJ",

                 warranty=2,

                 purchase_date=date(day=12, month=6, year=2022), location=location_one
                 ).save()


@pytest.fixture
def user_one(db):
    """
    Fixture returning an Role instance
    """
    user = User(first_name="Komborerai", last_name="Chikweshe", email="kombogc@gmail.com", username="kchikweshe",
                password="!@#123kombo")
    user.save()
    return user


@pytest.fixture
def role_one(db, department_one):
    """
    Fixture returning an Role instance
    """
    role = Role(name="Software Developer", description="Developing systems", department=department_one)
    role.save()
    return role


@pytest.fixture
def role_two(db, department_one):
    """
    Fixture returning an Role instance
    """

    role = Role(name="System Administrator", description="asjasj", department=department_one)
    role.save()
    return role


@pytest.fixture
def employee_one(db, role_one, address_one, request_one):
    """
     Fixture returning an Employee instance
     """
    dob = date(day=12, month=7, year=1995)
    user = User(first_name="Tony", last_name="Stark",
                username="ironman", password="lasaksa", email="ironman@gmail.com")
    user.save()
    employee = Employee(title="Eng.", gender="M",
                        date_of_birth=dob, user=user
                        , address=address_one,
                        role=role_one,
                        national_identifier_number="63-1506262Z25",
                        )
    employee.save()
    return employee


@pytest.fixture
def employee_two(db, address_two, department_two):
    """
     Fixture returning an Employee instance
     """
    dob2 = date(day=6, month=9, year=1997)
    user = User(first_name="Shelea", last_name="Mutasa", username="shelea", password="opopop",
                email="gerrykombZ@gmail.com"
                )
    user.save()
    employee1 = Employee(title="Eng.", gender="F", user=user,
                         date_of_birth=dob2,
                         department=department_two, address=address_two,
                         national_identifier_number="61-1206162Z25",
                         )
    employee1.save()
    return employee1


@pytest.fixture
def request_one(db):
    """
    Fixture returning an Request instance
    """
    return Request(name="REPAIR", description="Repair operation ", priority="H")


@pytest.fixture
def work_order(db, employee_one):
    """
     Fixture returning an Work-order instance
     """
    work_order = WorkOrder(name="Fix Laptop", description="Fix Asset one",
                           due_date=date(day=6, month=12, year=2021),
                           maintenance_type="Ins", priority='H',
                           status='IP', worker=employee_one
                           )
    work_order.save()
    return work_order


@pytest.fixture()
def work_order_two(db,employee_one):
    """Fixture returning an Work-order instance"""
    work_order = WorkOrder(name="Printer Problem", description="Fix Printer one",
                           due_date=date(day=6, month=3, year=2021),
                           maintenance_type="Prv", priority='H',
                           status='IP', worker=employee_one
                           )
    work_order.save()
    return work_order
