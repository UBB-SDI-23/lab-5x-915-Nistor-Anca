from django.db import models

# Create your models here.


class Area(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    name = models.CharField(max_length=100, blank=True, default='')
    location = models.CharField(max_length=10, blank=True, default='')
    description = models.CharField(max_length=100, blank=True, default='')
    allocated_budget = models.IntegerField()
    needs_rebuilding = models.CharField(max_length=100, blank=True, default='')


class Specie(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    name = models.CharField(max_length=100, blank=True, default='')
    specifications = models.CharField(max_length=100, blank=True, default='')
    endangered = models.CharField(max_length=100, blank=True, default='')
    years_expected_to_live = models.IntegerField()
    food_type = models.CharField(max_length=100, blank=True, default='')

    area = models.ForeignKey(Area, on_delete=models.CASCADE, related_name='species')


class Animal(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    name = models.CharField(max_length=100, blank=True, default='')
    birth_date = models.DateField()
    kilograms = models.IntegerField()
    gender = models.CharField(max_length=100, blank=True, default='')
    favourite_toy = models.CharField(max_length=100, blank=True, default='')

    specie = models.ForeignKey(Specie, on_delete=models.CASCADE, related_name='content')



class Job(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    name = models.CharField(max_length=100, blank=True, default='')
    description = models.CharField(max_length=100, blank=True, default='')


class Employee(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    first_name = models.CharField(max_length=100, blank=True, default='')
    last_name = models.CharField(max_length=100, blank=True, default='')
    birth_date = models.DateField()
    phone_number = models.CharField(max_length=100, blank=True, default='')
    salary = models.IntegerField()
    email = models.CharField(max_length=100, blank=True, default='')

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='employees')





class Assignment(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    starting_date = models.DateField()
    ending_date = models.DateField()

    area = models.ForeignKey(Area, on_delete=models.CASCADE, related_name='assignments')
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='employees')



class Attraction(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    name = models.CharField(max_length=100, blank=True, default='')
    description = models.CharField(max_length=100, blank=True, default='')

    area = models.ForeignKey(Area, on_delete=models.CASCADE)



