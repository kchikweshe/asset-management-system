from dj_rest_auth.views import LoginView
from django.db.utils import Error
from rest_framework import status, generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from asset_management.serializers import *


class CustomTokenAuthenticate(TokenAuthentication):
    keyword = 'Bearer'


class AssetList(generics.ListCreateAPIView):
    authentication_classes = [CustomTokenAuthenticate]
    permission_classes = [IsAuthenticated]
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer


class AssetDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [CustomTokenAuthenticate]
    permission_classes = [IsAuthenticated]
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer


class EmployeeList(generics.ListCreateAPIView):
    authentication_classes = [CustomTokenAuthenticate]
    permission_classes = [IsAuthenticated]
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class AddressDetail(generics.ListCreateAPIView):
    authentication_classes = [CustomTokenAuthenticate]
    permission_classes = [IsAuthenticated]
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class EmployeeDetail(generics.ListCreateAPIView):
    authentication_classes = [CustomTokenAuthenticate]
    permission_classes = [IsAuthenticated]
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class WorkOrderDetail(generics.ListCreateAPIView):
    authentication_classes = [CustomTokenAuthenticate]
    permission_classes = [IsAuthenticated]
    serializer_class = WorkOrderSerializer

    def get(self, request, *args, **kwargs):
        """
        Get work order by employee ID
        """
        employee_id = request.data['employeeId']
        print(request.data['employeeId'])
        self.queryset = WorkOrder.objects.raw('SELECT id,name,description FROM asset_management_workorder '
                                              'where worker_id=%s ', [employee_id])


class WorkOrderList(APIView):
    """
    List all employee's work orders
    """
    authentication_classes = [CustomTokenAuthenticate]
    permission_classes = [IsAuthenticated]
    serializer_class = WorkOrderSerializer

    def get(self, request, pk, format=None):
        """
        Retrieve employee's work orders
        """
        work_orders = WorkOrder.objects.raw('SELECT id FROM asset_management_workorder '
                                            'where worker_id=%s ', [pk])
        serializer = WorkOrderSerializer(work_orders, many=True)
        # response = {
        #     'data': serializer.data
        # }
        return Response(serializer.data)


class RoleList(generics.ListAPIView):
    authentication_classes = [CustomTokenAuthenticate]
    permission_classes = [IsAuthenticated]
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class DepartmentList(generics.ListAPIView):
    authentication_classes = [CustomTokenAuthenticate]
    permission_classes = [IsAuthenticated]
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


from dj_rest_auth.registration.views import RegisterView


class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer

    def get_response_data(self, user):
        from dj_rest_auth.app_settings import TokenSerializer
        return {'token': TokenSerializer(user.auth_token, context=self.get_serializer_context()).data,
                'user': CustomRegisterSerializer(user).data
                }

    def create(self, request, *args, **kwargs):
        """
        Adding user model to Response
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        d = self.get_response_data(user)

        d['user']['id'] = user.pk
        token = d['token']['key']
        user_id = d['user']['id']

        response = {
            'key': token,
            'user': user_id
        }
        return Response(data=response,
                        status=status.HTTP_201_CREATED,
                        headers=headers)


class CustomLoginView(LoginView):
    serializer_class = CustomLoginSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.request = None
        self.serializer = None

    def get_response_data(self, employee):
        """
        Return token and employee Id
        """
        serializer_class = self.get_response_serializer()

        serializer = serializer_class(instance=self.token,
                                      context=self.get_serializer_context())

        response_data = {
            'key': serializer.data['key'],
            'employee': employee
        }
        response = Response(response_data, status=status.HTTP_200_OK)

        return response

    def post(self, request, *args, **kwargs):
        """
        Handling login process
        """

        self.request = request
        print("--------------------- Request Data \n %s " % self.request.data)

        self.serializer = self.get_serializer(data=self.request.data)
        self.serializer.is_valid(raise_exception=True)

        username = self.request.data['username']
        userQuery = User.objects.raw('SELECT id, first_name,last_name FROM  auth_user where username=%s ',
                                     [username])
        try:
            for u in userQuery:
                employeeQuery = Employee.objects.raw(
                    'SELECT id FROM asset_management_employee WHERE user_id=%s',
                    [u.id])
                self.login()
                for e in employeeQuery:
                    return self.get_response_data(employee=e.id)
        except Error as err:
            return Response(data=err.__str__(), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
