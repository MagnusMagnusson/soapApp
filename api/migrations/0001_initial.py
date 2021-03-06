# Generated by Django 3.1.3 on 2020-11-08 22:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Batch',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=128)),
                ('notes', models.TextField(default='')),
                ('image', models.FileField(upload_to='uploadsimg/batches/')),
            ],
        ),
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=50)),
                ('ingredient_type', models.CharField(choices=[('FR', 'Ilmefni'), ('CL', 'Litarefni'), ('FT', 'Fitur/Olíur'), ('LQ', 'Vökvi'), ('AL', 'Alkalíð/Basi'), ('OT', 'Annað')], default='FR', max_length=2)),
                ('notes', models.TextField(default='')),
                ('picture', models.FileField(upload_to='uploadsimg/ingredients/')),
            ],
        ),
        migrations.CreateModel(
            name='Recipie',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Uppskrift', max_length=128)),
                ('notes', models.TextField(default='')),
                ('image', models.FileField(upload_to='uploadsimg/recipies/')),
            ],
        ),
        migrations.CreateModel(
            name='RecipieIngredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, default=0, max_digits=8)),
                ('ingredient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.ingredient')),
                ('recipie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.recipie')),
            ],
        ),
        migrations.CreateModel(
            name='Design',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('notes', models.TextField(default='')),
                ('image', models.FileField(upload_to='uploadsimg/designs/')),
                ('ingredients', models.ManyToManyField(to='api.Ingredient')),
            ],
        ),
        migrations.CreateModel(
            name='Batch_State',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('state', models.CharField(choices=[('0_DES', 'Hönnun'), ('1_PRE', 'Undirbúningur'), ('2_MAN', 'Framleiðsla'), ('3_DRY', 'Sápumyndun'), ('4_CUR', 'Þurrkun'), ('5_DON', 'Tilbúið')], default='0_DES', max_length=5)),
                ('date', models.DateTimeField()),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.batch')),
            ],
        ),
        migrations.AddField(
            model_name='batch',
            name='design',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.design'),
        ),
        migrations.AddField(
            model_name='batch',
            name='recipie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.recipie'),
        ),
    ]
