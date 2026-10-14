from django.contrib import admin
from .models import Service, Course, Project, PlacementRecord, Inquiry, Testimonial

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'badge_text', 'order')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'short_description')


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'language_category', 'duration', 'skill_level', 'price', 'order')
    list_filter = ('language_category', 'skill_level')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'short_description', 'syllabus_list')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'client_name', 'is_featured', 'completed_date')
    list_filter = ('category', 'is_featured')
    search_fields = ('title', 'client_name', 'tech_stack')


@admin.register(PlacementRecord)
class PlacementRecordAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'placed_company', 'placed_role', 'salary_package', 'course_taken')
    search_fields = ('student_name', 'placed_company', 'placed_role')


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'inquiry_type', 'email', 'service_requested', 'budget_range', 'created_at', 'status')
    list_filter = ('inquiry_type', 'status', 'created_at')
    search_fields = ('full_name', 'email', 'message')
    readonly_fields = ('created_at',)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'client_role', 'rating')
