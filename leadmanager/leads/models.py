from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Lead(models.Model):

    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    message = models.TextField(max_length=500, blank=True)
    owner = models.ForeignKey(
        User, related_name='lead', on_delete=models.CASCADE, null=True)
    created_on = models.DateTimeField(auto_now_add=True)
