from django.db import models
from django.contrib.auth.models import User, Group, AbstractUser


class Expenses(models.Model):
    date = models.DateTimeField()
    text = models.TextField()
    cost = models.FloatField()
    owner = models.ForeignKey("auth.User")

    def save(self, *args, **kwargs):
        super(Expenses, self).save(*args, **kwargs)
