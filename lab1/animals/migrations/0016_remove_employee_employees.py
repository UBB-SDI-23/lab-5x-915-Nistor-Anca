# Generated by Django 4.1.7 on 2023-03-20 06:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('animals', '0015_alter_attraction_area'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='employees',
        ),
    ]
