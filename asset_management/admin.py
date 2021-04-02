from django.contrib import admin

# Register your models here.
from .models import *


@admin.register(Request)
class RequestAdmin(admin.ModelAdmin):
    readonly_fields = (
        "created_date", "updated_date",
    )


@admin.register(WorkOrder)
class WorkOrderAdmin(admin.ModelAdmin):
    readonly_fields = (
        "created_date", "updated_date",
    )


@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    exclude = ('name',)
    readonly_fields = (
        "created_date", "updated_date",
    )


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    exclude = ('description', "created_date", "updated_date",)
    readonly_fields = (
        "created_date", "updated_date",
    )


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    exclude = ('description', "created_date", "updated_date")


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    pass


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    exclude = ('name', 'description')
    readonly_fields = (
        "created_date", "updated_date",
    )


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    readonly_fields = ('age',
                       "created_date", "updated_date",
                       )
