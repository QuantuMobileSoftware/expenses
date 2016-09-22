from django.db import models


class Expenses(models.Model):
    date = models.DateField()
    time = models.TimeField(default='00:00:00')
    text = models.TextField()
    cost = models.FloatField()
    owner = models.ForeignKey("auth.User")
