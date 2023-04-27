from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from animals import views
from animals.views import SpeciesByAvgWeight, JobsByAvgSalary, AnimalsOrderedByAge, SpeciesForAutocomplete

urlpatterns = [
    path('animals/', views.AnimalList.as_view(), name='list-of-animals'),
    path('animals/<int:pk>/', views.AnimalDetail.as_view()),

    path('species/', views.SpecieList.as_view()),
    path('species/<int:pk>/', views.SpecieDetail.as_view()),

    path('areas/', views.AreaList.as_view()),
    path('areas/<int:pk>/', views.AreaDetail.as_view()),

    path('jobs/', views.JobList.as_view()),
    path('jobs/<int:pk>/', views.JobDetail.as_view()),

    path('employees/', views.EmployeeList.as_view()),
    path('employees/<int:pk>/', views.EmployeeDetail.as_view()),

    path('assignments/', views.AssignmentList.as_view()),
    path('assignments/<int:pk>/', views.AssignmentDetail.as_view()),

    path('areas/<int:pk>/employees/', views.AssignmentList.as_view()),

    path('attractions/', views.AttractionList.as_view()),
    path('attractions/<int:pk>/', views.AttractionDetail.as_view()),

    path('species/by-avg-weight/', SpeciesByAvgWeight.as_view(), name='species-by-avg-weight'),
    path('jobs/by-avg-salary/', JobsByAvgSalary.as_view(), name='jobs-by-avg-salary'),
    path('animals/by-age/', AnimalsOrderedByAge.as_view(), name='animals-ordered-by-age'),
    path("species/autocomplete/", SpeciesForAutocomplete.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)