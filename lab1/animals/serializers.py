from django.utils import timezone
from rest_framework import serializers

from animals.models import Animal, Specie, Area, Job, Employee, Assignment, Attraction

class SpeciesKilogramsSerializer(serializers.ModelSerializer):
    avg_kilograms = serializers.FloatField()

    class Meta:
        model = Specie
        fields = ('id', 'name', 'specifications', 'endangered', 'years_expected_to_live', 'food_type', 'avg_kilograms')

class JobsSalarySerializer(serializers.ModelSerializer):
    avg_salary = serializers.FloatField()

    class Meta:
        model = Job
        fields = ('id', 'name', 'description', 'avg_salary')

class AnimalSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = ('__all__')

class AreaEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['employee']

class SpecieSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Specie
        fields = ('__all__')

class AnimalSerializer2(serializers.ModelSerializer):
    def validate(self, data):
        if data['birth_date'] > timezone.now().date():
            raise serializers.ValidationError("The birth date cannot be in the future.")
        return data

    class Meta:
        model = Animal
        fields = ('__all__')

class AnimalSerializer(serializers.ModelSerializer):
    specie = SpecieSerializer2()
    class Meta:
        model = Animal
        fields = ('__all__')

class SpecieSerializer(serializers.ModelSerializer):
    content =  AnimalSerializer2(many=True, read_only=True)
    class Meta:
        model = Specie
        fields = ('__all__')


class AreaSerializer2(serializers.ModelSerializer):
    def validate(self, data):
        if data['allocated_budget'] <= 0:
            raise serializers.ValidationError("The allocated budget must be positive.")
        return data

    class Meta:
        model = Area
        fields = ('__all__')


class JobSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('__all__')

class EmployeeSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('__all__')

class AssignmentSerializer2(serializers.ModelSerializer):

    def validate(self, data):
        if data['starting_date'] >= data['ending_date']:
            raise serializers.ValidationError("The starting date must be before the ending date.")
        return data

    class Meta:
        model = Assignment
        fields = ('__all__')

class AssignmentSerializer(serializers.ModelSerializer):
    area = AreaSerializer2()
    employee = EmployeeSerializer2()
    class Meta:
        model = Assignment
        fields = ('__all__')

class AreaSerializer(serializers.ModelSerializer):
    species = SpecieSerializer2(many=True, read_only=True)
    assignments = AssignmentSerializer(many=True, read_only=True)

    class Meta:
        model = Area
        fields = ('__all__')


class JobSerializer(serializers.ModelSerializer):
    employees = EmployeeSerializer2(many=True, read_only=True)
    class Meta:
        model = Job
        fields = ('__all__')


class EmployeeSerializer(serializers.ModelSerializer):
    job = JobSerializer2()
    class Meta:
        model = Employee
        fields = ('__all__')



class AttractionSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = ('__all__')

class AttractionSerializer(serializers.ModelSerializer):
    area = AreaSerializer2()
    class Meta:
        model = Attraction
        fields = ('__all__')


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        kwargs.pop('fields', None)
        include_fields = kwargs.pop('include_fields', None)
        exclude_fields = kwargs.pop('exclude_fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if include_fields is not None:
            for field in include_fields:
                self.fields.append(field)
        if exclude_fields is not None:
            for field in exclude_fields:
                split = field.split('__')
                to_access = self.fields
                for i in range(len(split)-1):
                    to_access = to_access.get(split[i])
                if isinstance(to_access, serializers.ListSerializer):
                    to_access = to_access.child
                to_access.fields.pop(split[-1])


class AnimalSerializerComplex(DynamicFieldsModelSerializer):
    specie_id = serializers.IntegerField(write_only=True)
    specie = SpecieSerializer(read_only=True)
    name = serializers.CharField(max_length=255)
    birth_date = serializers.DateField(format='%Y-%m-%d')
    kilograms = serializers.IntegerField()
    gender = serializers.CharField(max_length=255)
    favourite_toy = serializers.CharField(max_length=255)

    def validate_specie_id(self, value):
        filter = Specie.objects.filter(id=value)
        if not filter.exists():
            raise serializers.ValidationError("Specie doesnt exist.")
        return value

    class Meta:
        model = Animal
        fields = ['id', 'created', 'name', 'birth_date', 'kilograms', 'gender', 'favourite_toy', 'specie_id', 'specie']



