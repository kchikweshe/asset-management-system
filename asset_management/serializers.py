'''

'''

from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer
from rest_framework import serializers

from .models import *


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'street', 'suburb', 'city', 'province']
        read_only_fields = ('id', 'created_date', 'updated_date',)


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name']
        read_only_fields = ('id', 'created_date', 'updated_date', 'department_id')


class DepartmentSerializer(serializers.ModelSerializer):
    roles = RoleSerializer(many=True, read_only=True)

    class Meta:
        model = Department
        fields = ["id", "name", "description", "roles"]
        read_only_fields = ('id', 'created_date', 'updated_date',)


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = '__all__'

    def get_cleaned_data(self):
        return {

            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),

        }


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username']
        read_only_fields = ('id', 'created_date', 'updated_date')


class CustomLoginSerializer(LoginSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        read_only_fields = ('id', 'created_date', 'updated_date',)


class EmployeeSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    address = AddressSerializer(many=False, read_only=True)
    role = RoleSerializer(many=False, read_only=True)

    class Meta:
        model = Employee
        fields = ['id', 'user', 'address', 'title',
                  'date_of_birth',
                  'gender',
                  'national_identifier_number',
                  'age', 'role'
                  ]
        read_only_fields = ('id', 'age', 'created_date', 'updated_date',)


class AssetSerializer(serializers.ModelSerializer):
    """
    A serializer for converting a Asset model to and from Json
    """

    class Meta:
        model = Asset

        fields = ['name', 'description', 'serial_number',
                  'model', 'purchase_date', 'make', 'warranty']
        read_only_fields = ('id', 'created_date', 'updated_date',)


class LocationSerializer(serializers.ModelSerializer):
    assets = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    departments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Location
        fields = ['name', 'assets', 'departments']
        read_only_fields = ('id', 'created_date', 'updated_date',)


class WorkOrderSerializer(serializers.ModelSerializer):
    worker = EmployeeSerializer(many=False, read_only=True)

    class Meta:
        model = WorkOrder
        fields = ["id", "name", "description", "status", "maintenance_type", "worker","due_date"]
        read_only_fields = ('id', 'created_date', 'updated_date',)


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ['name', 'description', 'priority']
