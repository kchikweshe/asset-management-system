# Generated by Django 3.1.5 on 2021-04-06 19:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('asset_management', '0008_auto_20210401_2239'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='address',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='asset_management.address'),
        ),
    ]
