# from django.urls import path
# from djoser import views as djoser_views
# from your_app.views import UserCreateView, UserViewSetWithRegistration

# urlpatterns = [
#     path('api/users/', UserCreateView.as_view(), name='user_create'),
#     path('api/users/me/', UserViewSetWithRegistration.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'}), name='user_detail'),
#     path('api/auth/', include('djoser.urls')),
#     path('api/auth/', include('djoser.urls.jwt')),
# ]