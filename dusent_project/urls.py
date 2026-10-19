from django.contrib import admin
from django.urls import path, include
from website.views import favicon_view, google_site_verification

urlpatterns = [
    path('favicon.ico', favicon_view, name='favicon'),
    path('googleb5b8517425e25d8e.html', google_site_verification, name='google_verification'),
    path('admin/', admin.site.urls),
    path('', include('website.urls')),
]
