# from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# from django.db import models

# class UserManager(BaseUserManager):
#     def create_user(self, email, first_name, last_name, password=None,      ):
#         """
#         Create and save a regular user with the given email and password.
#         """
#         if not email:
#             raise ValueError('The Email field must be set')
#         email = self.normalize_email(email)
#         user = self.model(email=email, first_name=first_name, last_name=last_name,      )
#         user.set_password(password)
#         # user = User.objects.create_user(email=email, first_name=first_name, last_name=last_name)
#         user.save()
#         return user

#     def create_superuser(self, email, first_name, last_name, password=None,     ):
#         """
#         Create and save a superuser with the given email and password.
#         """
#             .setdefault('is_staff', True)
#             .setdefault('is_superuser', True)

#         return self.create_user(email, first_name, last_name, password ,    )


# class User(AbstractBaseUser, PermissionsMixin):
#     email = models.EmailField(unique=True)
#     first_name = models.CharField(max_length=30, blank=True)
#     last_name = models.CharField(max_length=30, blank=True)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['first_name', 'last_name']

#     objects = UserManager()

#     def __str__(self):
#         return self.email
    
#     def getFullName(self):
#         return self.first_name
    
#     def getShortName(self):
#         return self.last_name

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        """
        Create and save a regular user with the given email and password.
        """
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, first_name, last_name, password=None):
        """
        Create and save a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            first_name=first_name,
            last_name=last_name,
            password=password,
        )

        user.is_staff = True
        user.is_superuser = True
        # setdefault('is_superuser', True)

        return self.create_user(email, first_name, last_name, password)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']


    objects = UserManager()

    def __str__(self):
        return self.email
    
    def getFullName(self):
        return self.first_name
    
    def getShortName(self):
        return self.last_name
