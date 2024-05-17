# Generated by Django 5.0.4 on 2024-05-13 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reproTracker_app', '0004_enquete_delete_general'),
    ]

    operations = [
        migrations.CreateModel(
            name='Doctorant',
            fields=[
                ('nomComplet', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('telephone', models.CharField(max_length=15)),
                ('role', models.CharField(max_length=20)),
                ('cin', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('etat_compte', models.CharField(choices=[('active', 'active'), ('inactive', 'inactive')], default='inactive', max_length=10)),
            ],
        ),
    ]