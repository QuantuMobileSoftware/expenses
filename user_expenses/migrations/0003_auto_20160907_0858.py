# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('admin', '0001_initial'),
        ('user_expenses', '0002_auto_20160907_0806'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usermodel',
            name='user_ptr',
        ),
        migrations.AlterField(
            model_name='expenses',
            name='owner',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='UserModel',
        ),
    ]
