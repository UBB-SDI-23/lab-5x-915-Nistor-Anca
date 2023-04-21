from collections import OrderedDict

from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from animals.models import Animal, Specie, Area
from animals.serializers import AnimalSerializer2


# Create your tests here.


class SpeciesOrderedByAvgWeight(TestCase):
    @classmethod
    def setUpTestData(cls):
        area1 = Area.objects.create(name = 'a1', location='N', description='abc', allocated_budget=5000)
        area2 = Area.objects.create(name='a2', location='V', description='def', allocated_budget=4000)

        specie1 = Specie.objects.create(name='s1', specifications='abc', food_type='x', years_expected_to_live=50, area_id=1)
        specie1 = Specie.objects.create(name='s2', specifications='abc', food_type='x',
                                        years_expected_to_live=50, area_id=2)

        animal1 = Animal.objects.create(name='name1', birth_date='2009-05-03', kilograms=40, gender='F', favourite_toy='ball', specie_id=1)
        animal2 = Animal.objects.create(name='name2', birth_date='2010-05-03', kilograms=50, gender='M',
                                        favourite_toy='ball', specie_id=1)
        animal3 = Animal.objects.create(name='name3', birth_date='2009-05-03', kilograms=35, gender='F',
                                        favourite_toy='ball', specie_id=2)
        animal3 = Animal.objects.create(name='name4', birth_date='2009-05-03', kilograms=45, gender='F',
                                        favourite_toy='ball', specie_id=2)


    def test_species_ordered_bt_avg_weight(self):
        url = reverse('species-by-avg-weight')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['name'], 's1')
        self.assertAlmostEqual(data[0]['avg_kilograms'], 45.0)
        self.assertEqual(data[1]['name'], 's2')
        self.assertAlmostEqual(data[1]['avg_kilograms'], 40.0)



class FilteredAnimals(TestCase):
    @classmethod
    def setUpTestData(cls):
        area1 = Area.objects.create(name = 'a1', location='N', description='abc', allocated_budget=5000)
        area2 = Area.objects.create(name='a2', location='V', description='def', allocated_budget=4000)

        specie1 = Specie.objects.create(name='s1', specifications='abc', food_type='x', years_expected_to_live=50, area_id=1)
        specie1 = Specie.objects.create(name='s2', specifications='abc', food_type='x',
                                        years_expected_to_live=50, area_id=2)

        animal1 = Animal.objects.create(name='name1', birth_date='2009-05-03', kilograms=40, gender='F', favourite_toy='ball', specie_id=1)
        animal2 = Animal.objects.create(name='name2', birth_date='2010-05-03', kilograms=50, gender='M',
                                        favourite_toy='ball', specie_id=1)
        animal3 = Animal.objects.create(name='name3', birth_date='2009-05-03', kilograms=35, gender='F',
                                        favourite_toy='ball', specie_id=2)
        animal3 = Animal.objects.create(name='name4', birth_date='2009-05-03', kilograms=45, gender='F',
                                        favourite_toy='ball', specie_id=2)


    def test_filter_animals(self):
        url = reverse('list-of-animals') + '?kilograms=46'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.data
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['name'], 'name2')

