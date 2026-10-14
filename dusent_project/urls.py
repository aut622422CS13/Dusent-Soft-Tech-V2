from django.contrib import admin
from django.urls import path, include
from website.views import favicon_view

urlpatterns = [
    path('favicon.ico', favicon_view, name='favicon'),
    path('admin/', admin.site.urls),
    path('', include('website.urls')),
]
