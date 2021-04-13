'''

'''

from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

from .models import *


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User

    def get_cleaned_data(self):
        return {

            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),

        }


class EmployeeSerializer(serializers.ModelSerializer):
    # user_details = CustomRegisterSerializer(many=False, read_only=True)

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


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id' ,'street', 'suburb', 'city', 'province']
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


class WorkOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkOrder
        fields = '__all__'


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ['name', 'description', 'priority']
