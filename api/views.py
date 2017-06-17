#!/usr/bin/env python
# coding: utf-8

from django.db import IntegrityError

from django.contrib.auth import get_user_model, authenticate, logout

from django.core.exceptions import ValidationError

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.authtoken.models import Token

from rest_social_auth.serializers import UserTokenSerializer

from .models import *



#---------------------------------------------------------------------------------------------------
class AccountViewSet(viewsets.ViewSet):
	
	permission_classes = AllowAny, 
    
	def login(self, request):
		
		user = authenticate(username=request.data['username'], password=request.data['password'])
		if user is None:
			return Response('error_USER_UNKNOWN', status=status.HTTP_400_BAD_REQUEST)
		
		return Response(UserTokenSerializer(user).data, status=status.HTTP_200_OK)



	def register(self, request):
		
		if request.data['password1'] != request.data['password2']:
			return Response('error_PASSWORDS_NOT_EQUAL', status=status.HTTP_400_BAD_REQUEST)

		try:
		
			user = get_user_model().objects.create_user(request.data['username'], request.data['email'], request.data['password1'])
			
		except IntegrityError:
			
			results = get_user_model().objects.filter(username=request.data['username'])
			if results.count() > 0:
				return Response('error_USERNAME_ALREADY_EXISTS', status=status.HTTP_400_BAD_REQUEST)
			
			return Response('error_INTEGRITY_ERROR', status=status.HTTP_400_BAD_REQUEST)
		
		token = Token.objects.create(user=user)
		
		authenticate(username=request.data['username'], password=request.data['password1'])
		
		return Response(UserTokenSerializer(user).data, status=status.HTTP_201_CREATED)



	def logout(self, request):
		
		logout(request)
		
		return Response(None, status=status.HTTP_200_OK)



#---------------------------------------------------------------------------------------------------
class ProfileViewSet(viewsets.ViewSet):
	
	permission_classes = IsAuthenticated, 
    
	def view(self, request):
		
		data = {'team':request.user.profile.team, 'level':request.user.profile.level, 'name':request.user.username}
		
		return Response(data, status=status.HTTP_200_OK)




	def name(self, request):
		
		request.user.username = request.data['name']
		request.user.save()
		
		return Response(None, status=status.HTTP_200_OK)




	def team(self, request):
		
		request.user.profile.team = request.data['team']
		request.user.profile.save()
		
		return Response(None, status=status.HTTP_200_OK)




	def level(self, request):
		
		request.user.profile.level = request.data['level']
		request.user.profile.save()
		
		return Response(None, status=status.HTTP_200_OK)



#---------------------------------------------------------------------------------------------------
class PokemonViewSet(viewsets.ViewSet):
	
	permission_classes = IsAuthenticatedOrReadOnly, 
    
	def list(self, request):
		
		results = Pokemon.objects.filter(user = request.user)
		
		data = []
		for item in results:
			
			temp = {'ref':item.ref, 'name':item.name, 'code':item.code, 'attack':item.attack,
					'defense':item.defense, 'stigmata':item.stigmata, 'percent':item.percent,
					'cp':item.cp, }
			data.append(temp)
		
		return Response(data, status=status.HTTP_200_OK)


		
	def add(self, request):
		
		name = request.data['name']
		
		code = request.data['code']
		
		attack = request.data['attack']
		defense = request.data['defense']
		stigmata = request.data['stigmata']
		
		percent = request.data['percent']
		
		cp = request.data['cp']
		hp = request.data['hp']
		stardust = request.data['stardust']
		
		app1 = request.data['app1']
		app2S = request.data['app2S']
		app2A = request.data['app2A']
		app2D = request.data['app2D']
		app3 = request.data['app3']
		
		team = request.data['team']
		
		pokemon = Pokemon(user=request.user, name=name, code=code, attack=attack, defense=defense,
						  stigmata=stigmata, percent=percent, cp=cp, hp=hp,
						  stardust=stardust, app1=app1, app2S=app2S, app2A=app2A, app2D=app2D,
						  app3=app3, team=team, )
		pokemon.save()
		
		data = {'ref':pokemon.ref}
		
		return Response(data, status=status.HTTP_200_OK)



	def view(self, request, ref):
		
		results = Pokemon.objects.filter(ref = ref)
		
		if results.count() < 1:
			return Response('error_NO_POKEMON', status=status.HTTP_400_BAD_REQUEST)			
		
		item = results[0]
		
		pokemon_data = {'name':item.name, 'ref':item.ref, 'code':item.code, 'attack':item.attack,
				'defense':item.defense, 'stigmata':item.stigmata, 'percent':item.percent,
				'cp':item.cp, 'hp':item.hp, 'stardust':item.stardust,
				'app1':item.app1, 'app2S':item.app2S, 'app2A':item.app2A, 'app2D':item.app2D,
				'app3':item.app3, 'team':item.team, 'level':item.level, }
		
		is_owned = False
		if item.user == request.user:
			is_owned = True
		
		owner_data = {'is_owned':is_owned, 'name':item.user.username, 'level':item.user.profile.level, }
		
		data = {'pokemon':pokemon_data, 'owner':owner_data, }
		
		return Response(data, status=status.HTTP_200_OK)



	def name(self, request, ref):
		
		results = Pokemon.objects.filter(user = request.user, ref = ref)
		if results.count() < 1:
			return Response('error_NO_POKEMON', status=status.HTTP_400_BAD_REQUEST)
		
		item = results[0]
		
		item.name = request.data['name']
		item.save()
		
		return Response(None, status=status.HTTP_200_OK)


		
	def delete(self, request, ref):
		
		results = Pokemon.objects.filter(user = request.user, ref = ref)
		if results.count() < 1:
			return Response('error_NO_POKEMON', status=status.HTTP_400_BAD_REQUEST)
		
		item = results[0]
		item.delete()
		
		return Response(None, status=status.HTTP_200_OK)


