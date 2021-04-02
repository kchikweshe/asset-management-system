# Create your models here.
from datetime import date

from django.contrib.auth.models import User
from django.db import models

MR = "Mr."
MRS = "Mrs."
MS = "Ms."
DOCTOR = "Dr."
ENG = "Eng."
PROF = "Prof."

TITLE_CHOICES = ((MR, 'Mr.'),
                 (MRS, 'Mrs.'),
                 (MS, 'Ms.'),
                 (DOCTOR, 'Doctor.'),
                 (PROF, "Professor"),
                 (ENG, "Engineer"))
MALE = 'Male'
FEMALE = 'Female'
UNKNOWN = 'Unknown'
NON_BINARY = 'Non-binary'
OTHER = 'Other'

GENDER_CHOICES = (
    (MALE, 'M'),
    (FEMALE, 'F'),
    (UNKNOWN, 'U'),
    (NON_BINARY, 'NB'),
    (OTHER, 'O')

)


class BaseEntity(models.Model):
    name = models.CharField(max_length=255, blank=False)
    description = models.CharField(max_length=255, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        abstract = True


class Address(BaseEntity):
    """
    Represents the address on Employee resides at
    """
    street = models.CharField(blank=False, max_length=255)
    suburb = models.CharField(blank=False, max_length=255)
    city = models.CharField(blank=False, default="Harare", max_length=255)
    province = models.CharField(blank=False, default="Harare", max_length=200)

    def __str__(self):
        return "%s, %s , %s" % (self.street, self.suburb, self.city)


class ChoiceType(BaseEntity):
    """
    Abstract class for work orders and requests. Each concrete class must have
    status and priority
    """
    OPEN = "O"
    IN_PROGRESS = "IP"
    ON_HOLD = 'OH'
    COMPLETE = "C"

    STATUS_CHOICES = ((OPEN, "Open"), (ON_HOLD, "On hold"),
                      (IN_PROGRESS, "In progress"),
                      (COMPLETE, "Complete"))

    HIGH = "H"
    MEDIUM = "M"
    LOW = "L"
    NONE = "N"

    PRIORITY_CHOICES = ((HIGH, "High"),
                        (MEDIUM, "Medium"),
                        (LOW, "Low"),
                        (NONE, "None"))
    priority = models.CharField(max_length=10, blank=False, choices=PRIORITY_CHOICES, default="N")
    status = models.CharField(choices=STATUS_CHOICES, max_length=20, default="Open", blank=False)

    class Meta:
        abstract = True


class Location(BaseEntity):
    address = models.ForeignKey(to=Address, related_name='locations', on_delete=models.CASCADE, blank=False, )


class Department(BaseEntity):
    """
    Represents the departments available at the firm
    """
    pass


class Role(BaseEntity):
    """
    Represents the Role assigned to an Employee
    """
    department = models.ForeignKey(to=Department, related_name="roles", blank=False, null=False,
                                   on_delete=models.CASCADE)




class Asset(BaseEntity):
    """
    Represents the asset that is consumable to Employees
    """
    serial_number = models.CharField(max_length=225, unique=True, blank=False)
    model = models.CharField(max_length=255, unique=True, blank=False)
    purchase_date = models.DateField(max_length=8, default="2021-09-12")
    make = models.CharField(max_length=255, unique=True, blank=False)
    location = models.ForeignKey(related_name='assets', on_delete=models.CASCADE, to=Location, null=True)

    warranty = models.IntegerField()

    def __str__(self):
        return self.make


class Employee(models.Model):
    """
    Represents the Employee of an organisation
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False)

    title = models.CharField(max_length=5, blank=False, choices=TITLE_CHOICES, default='Mr.')
    address = models.OneToOneField(on_delete=models.CASCADE, to=Address, default=None, null=True)
    date_of_birth = models.DateField(max_length=8, null=True)
    gender = models.CharField(max_length=10,
                              choices=GENDER_CHOICES, default='M')
    national_identifier_number = models.CharField(max_length=13, null=True, help_text="DD-DDDDDDDLDD", unique=True,
                                                  blank=False)

    role = models.OneToOneField(to=Role, null=False, default=None, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True, null=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)

    def __repr__(self):
        return "<Employee: {} {} : {} >".format(self.title, self.get_full_name(), self.department, self.role)

    @property
    def age(self):
        """
        Returns Employee's age
        """
        today = date.today()
        return today.year - self.date_of_birth.year - ((today.month, today.day) <
                                                       (self.date_of_birth.month, self.date_of_birth.day))


class Request(BaseEntity):
    """
    Represents requests to made by an employee
    """
    HIGH = 'H'
    MEDIUM = 'M'
    LOW = 'L'
    NONE = 'N'

    PRIORITY_CHOICES = ((HIGH, 'High'),
                        (MEDIUM, 'Medium'),
                        (LOW, 'Low'),
                        (NONE, 'None'))
    priority = models.CharField(max_length=6, choices=PRIORITY_CHOICES, default='N', blank=False)
    employee = models.ForeignKey(to=Employee, related_name='requests', on_delete=models.CASCADE, null=True)


class WorkOrder(ChoiceType):
    """
    Represents work order assigned by an Administrator to an employee
    """
    PREVENTIVE = "Prv"
    ROUTINE = "Rtn"
    INSPECTION = "Ins"
    EMERGENCY = "Emg"

    MAINTENANCE_CHOICES = (
        (PREVENTIVE, 'Preventive'),
        (ROUTINE, 'Routine'),
        (INSPECTION, 'Inspection'),
        (EMERGENCY, 'Emergency')
    )

    worker = models.ForeignKey(to=Employee, related_name="work_orders", on_delete=models.CASCADE, null=True)
    due_date = models.DateField(max_length=8)
    maintenance_type = models.CharField(max_length=10, blank=False, choices=MAINTENANCE_CHOICES, default="Routine")
