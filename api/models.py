#!/usr/bin/env python
# coding: utf-8

from django.db import models
from django.db.models.signals import post_save

from django.dispatch import receiver

from django.contrib.auth.models import User

from django.utils.crypto import get_random_string



#---------------------------------------------------------------------------------------------------
class Profile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    team = models.CharField(max_length=32, null=True, blank=True)
    level = models.IntegerField(null=True, blank=True)
    
    def __unicode__(self):
        return 'Profil: ' + self.user.username
       
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()



#---------------------------------------------------------------------------------------------------
def _createRef():
    return get_random_string(32)
    
class Pokemon(models.Model):

    user = models.ForeignKey(User)
    
    name = models.CharField(max_length=32)
    
    code = models.CharField(max_length=32)
    
    cp = models.IntegerField()
    hp = models.IntegerField()
    stardust = models.IntegerField()
    
    attack = models.IntegerField()
    defense = models.IntegerField()
    stigmata = models.IntegerField()
    
    percent = models.FloatField()
    
    app1 = models.IntegerField()
    app2S = models.BooleanField()
    app2A = models.BooleanField()
    app2D = models.BooleanField()
    app3 = models.IntegerField()
    
    team = models.CharField(max_length=32)
    
    ref = models.CharField(max_length=32, default=_createRef, unique=True)
    
    def __unicode__(self):
        return self.user.username + ' - ' + self.name


