"""
URL configuration for synergy project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
# from accounts.views import UserCreateView, UserViewSetWithRegistration
from django.conf import settings
import djoser

settings.DOMAIN = 'localhost:3000'  # Replace with your desired domain
djoser.url = settings.DOMAIN


urlpatterns = [
    path('admin/', admin.site.urls),

    # path('api/users/', UserCreateView.as_view(), name='user_create'),
    # path('api/users/me/', UserViewSetWithRegistration.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'}), name='user_detail'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]


