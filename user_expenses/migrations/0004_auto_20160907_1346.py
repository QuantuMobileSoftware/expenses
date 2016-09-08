# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_expenses', '0003_auto_20160907_0858'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expenses',
            name='time',
        ),
        migrations.AlterField(
            model_name='expenses',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
