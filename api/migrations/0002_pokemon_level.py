# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-06-17 16:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pokemon',
            name='level',
            field=models.FloatField(default=0.0),
        ),
    ]