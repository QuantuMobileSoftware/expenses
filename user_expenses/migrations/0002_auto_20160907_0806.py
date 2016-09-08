# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.contrib.auth.models import Group


def create_user_groups(apps, schema_editor):
    Group.objects.create(name='regular_user').save()
    Group.objects.create(name='user_manager').save()
    Group.objects.create(name='admin').save()


class Migration(migrations.Migration):

    dependencies = [
        ('user_expenses', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_user_groups),
    ]
