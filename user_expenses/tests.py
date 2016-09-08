from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User


class ExpensesTests(APITestCase):
    def setUp(self):
        user = User.objects.create(username='123', password='123')
        user.save()
        self.user = user
        admin = User.objects.create(username='admin', password='admin')
        self.admin = admin

    def test_find_existing_expense(self):
        response = self.client.get('/expenses/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_expense(self):
        self.client.force_authenticate(user=self.user)
        data = {"date": "2016-09-05",
                "time": "00:00:00",
                "text": "aaa",
                "cost": 12.5,
                "owner": self.admin.id
                }
        response = self.client.post('/expenses/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)



