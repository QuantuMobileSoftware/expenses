# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_expenses', '0004_auto_20160907_1346'),
    ]

    operations = [
        migrations.AddField(
            model_name='expenses',
            name='time',
            field=models.TimeField(default=b'00:00:00'),
        ),
        migrations.AlterField(
            model_name='expenses',
            name='date',
            field=models.DateField(),
        ),
    ]
