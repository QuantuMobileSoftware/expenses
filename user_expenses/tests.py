from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions


class ExpensesTests(APITestCase):
    def setUp(self):
        user = User.objects.create(username='123', password='123')
        user.save()
        self.user = user
        admin = User.objects.create(username='admin', password='admin')
        self.admin = admin

    def test_find_existing_expense(self):
        response = self.client.get('/api/expenses/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_expense(self):
        self.client.force_authenticate(user=self.user)
        data = {"date": "2016-09-05",
                "time": "00:00:00",
                "text": "aaa",
                "cost": 12.5,
                "owner": self.admin.id
                }
        response = self.client.post('/api/expenses/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class SeleniumTest(APITestCase):
    def setUp(self):
        admin = User.objects.create(username='admin', password='ieTh5lie')
        admin.save()
        self.admin = admin
        self.driver = webdriver.Chrome()

    def test(self):
        self.driver.get("http://localhost:9000/api/login")
        element = WebDriverWait(self.driver, 10).until(expected_conditions.presence_of_element_located((By.ID, 'id_username')))
        self.driver.find_element_by_id('id_username').send_keys(self.admin.username)
        self.driver.find_element_by_id('id_password').send_keys(self.admin.password)
        self.driver.find_element_by_id('submit-id-submit').click()
        self.driver.get("http://localhost:3000")
        element = WebDriverWait(self.driver, 10).until(expected_conditions.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div[1]')))
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div[2]/div[1]/form/input[1]').send_keys('01.01.2016')
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div[2]/div[1]/form/input[2]').send_keys('00:00')
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div[2]/div[1]/form/input[3]').send_keys('test')
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div[2]/div[1]/form/input[4]').send_keys('12')
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div[2]/div[1]/form/input[5]').click()

    def tearDown(self):
        self.driver.close()
