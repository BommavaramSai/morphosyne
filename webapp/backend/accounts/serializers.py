from djoser.serializers import UserCreateSerializer as DjoserUserCreateSerializer
# from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserCreateSerializer(DjoserUserCreateSerializer):
    class Meta(DjoserUserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name' ,'password')
