from django.urls import path

from .views import *

urlpatterns = [
    path("api/assets/", AssetList.as_view()),
    path("api/assets/<int:pk>/", AssetDetail.as_view()),
    path('api/address/', AddressDetail.as_view()),

    path("api/employees/", EmployeeList.as_view()),
    path("api/departments/", DepartmentList.as_view()),

    path("api/roles/", RoleList.as_view()),
    path("api/employees/<int:pk>/", EmployeeDetail.as_view()),
    path("api/employee/", EmployeeDetail.as_view()),

]
