# Generated by Django 3.1.3 on 2020-11-08 23:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ingredient',
            name='picture',
        ),
        migrations.AddField(
            model_name='ingredient',
            name='image',
            field=models.FileField(null=True, upload_to='uploads/img/ingredients/'),
        ),
        migrations.AlterField(
            model_name='batch',
            name='image',
            field=models.FileField(null=True, upload_to='uploads/img/batches/'),
        ),
        migrations.AlterField(
            model_name='design',
            name='image',
            field=models.FileField(null=True, upload_to='uploads/img/designs/'),
        ),
        migrations.AlterField(
            model_name='recipie',
            name='image',
            field=models.FileField(null=True, upload_to='uploads/img/recipies/'),
        ),
    ]
