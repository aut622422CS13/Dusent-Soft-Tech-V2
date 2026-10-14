from django.urls import path
from . import views

app_name = 'website'

urlpatterns = [
    path('', views.index_view, name='index'),
    path('about/', views.about_view, name='about'),
    path('services/', views.services_view, name='services'),
    path('services/courses/', views.courses_view, name='courses'),
    path('services/software-development/', views.software_dev_view, name='software_dev'),
    path('services/placement-training/', views.training_view, name='training'),
    path('contact/', views.contact_view, name='contact'),
    path('inquiry/submit/', views.inquiry_submit_api, name='inquiry_submit_api'),
    path('project/<int:pk>/', views.project_detail_view, name='project_detail'),
    path('estimate/calculate/', views.estimate_cost_api, name='estimate_cost_api'),
]
