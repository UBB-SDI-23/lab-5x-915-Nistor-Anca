
# Create your views here.
import django_filters
from django.db.models import Avg
from django.http import Http404
from rest_framework import status, serializers, generics
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from animals.models import Animal, Specie, Area, Job, Employee, Assignment, Attraction
from animals.serializers import AnimalSerializer, SpecieSerializer, AreaSerializer, SpecieSerializer2, \
    AnimalSerializer2, EmployeeSerializer, AssignmentSerializer, JobSerializer, EmployeeSerializer2, JobSerializer2, \
    AssignmentSerializer2, AreaSerializer2, AttractionSerializer2, AttractionSerializer, SpeciesKilogramsSerializer, \
    JobsSalarySerializer, AnimalSimpleSerializer, AnimalSerializerComplex


class JobsByAvgSalary(APIView):
    serializer_class = JobsSalarySerializer
    def get(self, request):
        queryset = Job.objects.annotate(avg_salary=Avg('employees__salary')).order_by('-avg_salary')
        serializer = JobsSalarySerializer(queryset, many=True)
        return Response(serializer.data)

class SpeciesByAvgWeight(APIView):
    serializer_class = SpeciesKilogramsSerializer
    def get(self, request):
        queryset = Specie.objects.annotate(avg_kilograms=Avg('content__kilograms')).order_by('-avg_kilograms')
        serializer = SpeciesKilogramsSerializer(queryset, many=True)
        return Response(serializer.data)


class AnimalsOrderedByAge(APIView):
    serializer_class = AnimalSimpleSerializer

    def get(self, request):
        queryset = Animal.objects.order_by('birth_date')
        serializer = AnimalSimpleSerializer(queryset, many=True)
        return Response(serializer.data)


class AnimalFilter(django_filters.FilterSet):
    kilograms = django_filters.NumberFilter()
    kilograms__gt = django_filters.NumberFilter(field_name='kilograms', lookup_expr='gt')

    class Meta:
        model = Animal
        fields = ['kilograms']

"""
class AnimalList(APIView):
    serializer_class = AnimalSerializer2
    #def get(self, request, format=None):
        #animals = Animal.objects.all()
    #   animals = Animal.objects.filter(kilograms__gt=50)
    #    serializer = AnimalSerializer(animals, many=True)
    #   return Response(serializer.data)

    def get(self, request, format=None):
        kilograms = request.query_params.get('kilograms', None)
        if kilograms is not None:
            animals = Animal.objects.filter(kilograms__gt=kilograms)
        else:
            animals = Animal.objects.all()
        serializer = AnimalSerializer2(animals, many=True)
        return Response(serializer.data)

    def post(self, request,format=None):
        serializer = AnimalSerializer2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnimalDetail(APIView):
    serializer_class = AnimalSerializer
    def get_object(self, pk):
        try:
            return Animal.objects.get(pk=pk)
        except Animal.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        animal = self.get_object(pk)
        serializer = AnimalSerializer(animal)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        animal = self.get_object(pk)
        serializer = AnimalSerializer(animal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        animal = self.get_object(pk)
        animal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
"""

class AnimalList(generics.ListCreateAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializerComplex

class AnimalDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializerComplex

class SpecieList(APIView):
        serializer_class = SpecieSerializer2
        def get(self, request, format=None):
            species = Specie.objects.all()
            serializer = SpecieSerializer2(species, many=True)
            return Response(serializer.data)

        def post(self, request, format=None):
            serializer = SpecieSerializer2(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SpecieDetail(APIView):
        serializer_class = SpecieSerializer
        def get_object(self, pk):
            try:
                return Specie.objects.get(pk=pk)
            except Specie.DoesNotExist:
                raise Http404

        def get(self, request, pk, format=None):
            specie = self.get_object(pk)
            serializer = SpecieSerializer(specie)
            return Response(serializer.data)

        def put(self, request, pk, format=None):
            specie = self.get_object(pk)
            serializer = SpecieSerializer(specie, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        def delete(self, request, pk, format=None):
            specie = self.get_object(pk)
            specie.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)





class AreaList(APIView):
            serializer_class = AreaSerializer2
            def get(self, request, format=None):
                areas = Area.objects.all()
                serializer = AreaSerializer2(areas, many=True)
                return Response(serializer.data)

            def post(self, request, format=None):
                serializer = AreaSerializer2(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AreaDetail(APIView):
            serializer_class = AreaSerializer
            def get_object(self, pk):
                try:
                    return Area.objects.get(pk=pk)
                except Area.DoesNotExist:
                    raise Http404

            def get(self, request, pk, format=None):
                area = self.get_object(pk)
                serializer = AreaSerializer(area)
                return Response(serializer.data)

            def put(self, request, pk, format=None):
                area = self.get_object(pk)
                serializer = AreaSerializer(area, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            def delete(self, request, pk, format=None):
                area = self.get_object(pk)
                area.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)





class JobList(APIView):
            serializer_class = JobSerializer2
            def get(self, request, format=None):
                jobs = Job.objects.all()
                serializer = JobSerializer2(jobs, many=True)
                return Response(serializer.data)

            def post(self, request, format=None):
                serializer = JobSerializer2(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JobDetail(APIView):
            serializer_class = JobSerializer
            def get_object(self, pk):
                try:
                    return Job.objects.get(pk=pk)
                except Job.DoesNotExist:
                    raise Http404

            def get(self, request, pk, format=None):
                job = self.get_object(pk)
                serializer = JobSerializer(job)
                return Response(serializer.data)

            def put(self, request, pk, format=None):
                job = self.get_object(pk)
                serializer = JobSerializer(job, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            def delete(self, request, pk, format=None):
                job = self.get_object(pk)
                job.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)


class EmployeeList(APIView):
    serializer_class = EmployeeSerializer2
    def get(self, request, format=None):
        employees = Employee.objects.all()
        serializer = EmployeeSerializer2(employees, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = EmployeeSerializer2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeDetail(APIView):
    serializer_class = EmployeeSerializer
    def get_object(self, pk):
        try:
            return Employee.objects.get(pk=pk)
        except Employee.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        employee = self.get_object(pk)
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        employee = self.get_object(pk)
        serializer = EmployeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        employee = self.get_object(pk)
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AssignmentList(APIView):
    serializer_class = AssignmentSerializer2
    def get(self, request, format=None):
        assignments = Assignment.objects.all()
        serializer = AssignmentSerializer2(assignments, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None, format=None):
        serializer = AssignmentSerializer2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, pk, format=None):
        assignments_data = request.data
        assignments = []

        for a in assignments_data:
            try:
                employee_id = a["employee"]
                area = Area.objects.get(id=pk)
                employee = Employee.objects.get(id=employee_id)
                assignment = Assignment(employee=employee, area=area)

                assignment.starting_date = a.get("starting_date")
                assignment.ending_date = a.get("ending_date")
                assignment.full_clean()
                assignment.save()
                assignments.append(assignment)
            except (Area.DoesNotExist, Employee.DoesNotExist):
                return Response({"error": "Invalid area or employee id"}, status=status.HTTP_400_BAD_REQUEST)
            except ValidationError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = AssignmentSerializer2(assignments, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class AssignmentDetail(APIView):
    serializer_class = AssignmentSerializer
    def get_object(self, pk):
        try:
            return Assignment.objects.get(pk=pk)
        except Assignment.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        assignment = self.get_object(pk)
        serializer = AssignmentSerializer(assignment)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        assignment = self.get_object(pk)
        serializer = AssignmentSerializer(assignment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        assignment = self.get_object(pk)
        assignment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)





class AttractionList(APIView):
    serializer_class = AttractionSerializer2
    def get(self, request, format=None):
        attractions = Attraction.objects.all()
        serializer = AttractionSerializer2(attractions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AttractionSerializer2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AttractionDetail(APIView):
    serializer_class = AttractionSerializer
    def get_object(self, pk):
        try:
            return Attraction.objects.get(pk=pk)
        except Attraction.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        attraction = self.get_object(pk)
        serializer = AttractionSerializer(attraction)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        attraction = self.get_object(pk)
        serializer = AttractionSerializer(attraction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        attraction = self.get_object(pk)
        attraction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class SpeciesForAutocomplete(APIView):
    serializer_class = SpecieSerializer2

    def get(self, request, *args, **kwargs):
        query = request.GET.get('query')
        species = Specie.objects.filter(name__icontains=query).order_by('name')[:20]
        serializer = SpecieSerializer2(species, many=True)
        return Response(serializer.data)

