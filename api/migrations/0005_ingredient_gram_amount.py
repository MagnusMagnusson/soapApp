# Generated by Django 3.1.3 on 2020-11-26 13:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20201115_2249'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingredient',
            name='gram_amount',
            field=models.IntegerField(default=100, null=True),
        ),
    ]
