#!/usr/bin/env python
# coding: utf-8

from django.conf.urls import url, include

from .views import *



#---------------------------------------------------------------------------------------------------
urlpatterns = [
	
	url(r'^login/',							AccountViewSet.as_view({ 'post': 'login'    })),
	url(r'^logout/',						AccountViewSet.as_view({ 'post': 'logout'   })),
	url(r'^register/',						AccountViewSet.as_view({ 'post': 'register' })),
	
	url(r'^profile/name/',					ProfileViewSet.as_view({ 'post': 'name'     })),
	url(r'^profile/team/',					ProfileViewSet.as_view({ 'post': 'team'     })),
	url(r'^profile/level/',					ProfileViewSet.as_view({ 'post': 'level'    })),
	url(r'^profile/',						ProfileViewSet.as_view({ 'get' : 'view'     })),
	
	url(r'^pokemon/add/',					PokemonViewSet.as_view({ 'post': 'add'      })),
	url(r'^pokemon/list/',					PokemonViewSet.as_view({ 'post': 'list'     })),
	url(r'^pokemon/(?P<ref>\w+)/$',			PokemonViewSet.as_view({ 'get': 'view'      })),
	url(r'^pokemon/(?P<ref>\w+)/name/',		PokemonViewSet.as_view({ 'post': 'name'     })),
	url(r'^pokemon/(?P<ref>\w+)/delete/',	PokemonViewSet.as_view({ 'post': 'delete'   })),
]
