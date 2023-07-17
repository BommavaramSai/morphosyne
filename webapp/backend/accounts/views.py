# # # from django.shortcuts import render
# # from rest_framework import generics, permissions, status
# # from rest_framework.response import Response
# # from rest_framework_simplejwt.tokens import RefreshToken
# # from djoser.views import UserViewSet
# # from .serializers import UserCreateSerializer

# # class UserCreateView(generics.CreateAPIView):
# #     serializer_class = UserCreateSerializer
# #     permission_classes = (permissions.AllowAny,)

# #     def post(self, request, *args, **kwargs):
# #         serializer = self.get_serializer(data=request.data)
# #         serializer.is_valid(raise_exception=True)
# #         user = serializer.save()
# #         refresh = RefreshToken.for_user(user)
# #         return Response(
# #             {
# #                 "user": serializer.data,
# #                 "refresh": str(refresh),
# #                 "access": str(refresh.access_token),
# #             },
# #             status=status.HTTP_201_CREATED,
# #         )


# # class UserViewSetWithRegistration(UserViewSet):
# #     """
# #     Override the default Djoser UserViewSet to disable user registration via API endpoints.
# #     """
# #     permission_classes_by_action = {
# #         'create': [permissions.AllowAny],
# #         'list': [permissions.IsAdminUser],
# #         'retrieve': [permissions.IsAuthenticated],
# #         'update': [permissions.IsAuthenticated],
# #         'partial_update': [permissions.IsAuthenticated],
# #         'destroy': [permissions.IsAdminUser],
# #     }

# #     def get_permissions(self):
# #         try:
# #             # return permission_classes depending on `action`
# #             return [permission() for permission in self.permission_classes_by_action[self.action]]
# #         except KeyError:
# #             # action is not set, return default permission_classes
# #             return [permission() for permission in self.permission_classes]
# import django
# from djoser.conf import UserSettings

# def configure_djoser_settings():
#     django.setup()
#     djoser_settings = UserSettings()
#     djoser_settings.DOMAIN = 'http://localhost:3000'
#     djoser_settings.configure()

# configure_djoser_settings()