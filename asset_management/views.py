from rest_framework import status, generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

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
