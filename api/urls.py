#!/usr/bin/env python
# coding: utf-8

from django.conf.urls import url, include

from .views import *



#---------------------------------------------------------------------------------------------------
urlpatterns = [
	
	url(r'^login/',							AccountViewSet.as_view({ 'post': 'login'    })),
	url(r'^logout/',						AccountViewSet.as_view({ 'post': 'logout'   })),
	url(r'^register/',						AccountViewSet.as_view({ 'post': 'register' })),
	
	url(r'^profile/edit/',					ProfileViewSet.as_view({ 'post': 'edit'     })),
	url(r'^profile/',						ProfileViewSet.as_view({ 'get' : 'view'     })),
	
	url(r'^pokemon/add/',					PokemonViewSet.as_view({ 'post': 'add'      })),
	url(r'^pokemon/list/',					PokemonViewSet.as_view({ 'get': 'list'      })),
	url(r'^pokemon/(?P<ref>\w+)/$',			PokemonViewSet.as_view({ 'get': 'view'      })),
	url(r'^pokemon/(?P<ref>\w+)/edit/',		PokemonViewSet.as_view({ 'post': 'edit'     })),
	url(r'^pokemon/(?P<ref>\w+)/delete/',	PokemonViewSet.as_view({ 'post': 'delete'   })),
]
