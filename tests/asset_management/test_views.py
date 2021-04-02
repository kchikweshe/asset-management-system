from rest_framework.test import APIClient

from tests.asset_management.fixtures import *


@pytest.mark.django_db
class BaseTest:
    """
    Base class for all test classes
    """
    url = ""
    content_type = "application/json"
    payload = dict()

    def test_add_valid_data(self, db, client, dept=None, role=None):
        """
        Check to ensure object can be saved using valid payload
        """
        pass

    def test_add_invalid_data(self, db, client):
        pass

    def test_get_object(self):
        """
        Check to ensure object can be retrieved using valid payload
        """
        pass

    class Meta:
        abstract = True


@pytest.mark.django_db
class TestAsset(BaseTest):
    url = "/api/assets/"
    payload = {"name": "Tablet",
               "description": "Description of Tablet",
               "serial_number": "7RGEYGWES433",
               "make": "Lenovo",
               "model": "Evolution E5",
               "purchase_date": "2012-07-13",
               "warranty": 2
               }

    def test_add_valid_data(self, db, client, dept=None, role=None):
        asset_management = Asset.objects.all()
        assert len(asset_management) == 0

        resp = client.post(
            self.url,
            self.payload,
            content_type=self.content_type
        )

        assert resp.status_code == 201
        assert resp.data["make"] == "Lenovo"

        asset_management = Asset.objects.all()
        assert len(asset_management) == 1

    def test_add_invalid_data(self, db, client):
        self.payload['model'] = ""
        resp = client.post(
            self.url,
            self.payload,
            self.content_type
        )
        resp_with_empty_data = client.post(self.url, {}, content_type=self.content_type)
        assert resp.status_code == 400
        assert resp_with_empty_data.status_code == 400

        resp_with_invalid_warranty = client.post("/api/asset_management/",
                                                 {"name": "Tablet",
                                                  "description": "Description of Tablet",
                                                  "serial_number": "7RGEYGWES433",
                                                  "model": "mmm",
                                                  "make": "Lenovo",
                                                  "purchase_date": "2012-07-13",
                                                  "warranty": "a"
                                                  },
                                                 )
        assert resp_with_invalid_warranty.status_code == 400
        asset_management = Asset.objects.all()
        assert len(asset_management) == 0


@pytest.mark.django_db
class TestUser(BaseTest):
    """
    Test user authentication
    """
    url = "/dj-rest-auth/registration/"
    payload = {
        'first_name': 'komborerai',
        'last_name': 'chikweshe',
        'email': 'kombogc@gmail.com',
        'username': 'kombo',
        'password1': '!@#123kombo',
        'password2': '!@#123kombo'}

    def test_add_with_valid_data(self, client, dept=None, role=None):
        """
        Check to ensure object can be saved using valid payload
        """
        c = APIClient()

        response = client.post(self.url, self.payload, content_type=self.content_type)
        key = response.data["key"]
        user = response.data["user"]
        assert key is not None
        assert user is not None
        assert response.status_code is 201

        self.payload['first_name'] = 'tony'
        response2 = client.post(self.url, self.payload, content_type=self.content_type)
        assert response2.status_code is not 201

        c.credentials(HTTP_AUTHORIZATION='Bearer ' + key)

        address_response = c.post("/api/address/", data={"street": "5 Quendon Rd",
                                                         "suburb": "Strathaven",
                                                         "city": "Harare",
                                                         "province": "Harare"}, format='json')
        assert Address.objects.filter(id=address_response.data['id']) is not None
        dept = Department(name="IT", description="sdsfsdff")
        dept.save()
        role = Role(name="Software Engineer", description="lddlsdf", department=dept)
        role.save()
        address = address_response.data['id']
        # print(address)
        data = {

            "user": user,
            "address": address,
            "title": "Mr.",
            "gender": "Male",
            "date_of_birth": "1995-7-12",
            "national_identifier_number": "63-1506262Z25",
            "role": role.pk,

        }

        registration_response = c.post("/api/employee/", data=data, format='json')

        assert registration_response.status_code is not 201

    def test_add_with_invalid_first_name(self, db, client):
        """When user email is blank, then user is not created"""
        self.payload['first_name'] = ''
        response = client.post(self.url, data=self.payload, HTTP_ACCEPT='application/json')

        assert not response.status_code == 201

    def test_add_with_invalid_email(self, db, client):
        self.payload['email'] = ''
        assert self.payload['email'] == ''
        print(self.payload)
        response = client.post(path=self.url, data=self.payload, HTTP_ACCEPT='application/json')
        print("Response : ", response.data)
        assert not response.status_code == 201

    def test_add_with_string_user_id(self, db, client, address_one, role_one):
        " Given , user with string user id"
        c = APIClient()

        response = client.post(self.url, data=self.payload, HTTP_ACCEPT='application/json')
        c.credentials(HTTP_AUTHORIZATION='Bearer ' + response.data['key'])
        assert type(response.data["user"]) is int
        user = response.data['user']
        assert user is 1
        assert User.objects.filter(pk=1) is not None

        assert isinstance(address_one, Address)
        url = "/api/employee/"
        payload = {
            "user": user,
            "address": address_one.pk,
            "title": "Mr.",
            "gender": "Male",
            "date_of_birth": "1995-7-12",
            "national_identifier_number": "63-1506262Z25",
            "role": 1
        }
        response2 = c.post(path=url, data=payload, HTTP_ACCEPT='application/json')
        assert response2.status_code == 201

    def test_add_with_invalid_username(self, db, client):
        self.payload['username'] = ''

        assert self.payload['username'] == ''
        print(self.payload)
        response = client.post(path=self.url, data=self.payload, HTTP_ACCEPT='application/json')
        print("Response : ", response.data)
        assert not response.data == 201
