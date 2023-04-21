from django.contrib import admin

# Register your models here.
from animals.models import Animal, Specie, Area

admin.site.register(Animal)
admin.site.register(Specie)
admin.site.register(Area)