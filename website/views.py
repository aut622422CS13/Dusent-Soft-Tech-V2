from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_POST
from django.conf import settings
import os
from .models import Service, Course, Project, PlacementRecord, Inquiry, Testimonial
from .forms import InquiryForm

def favicon_view(request):
    logo_path = os.path.join(settings.BASE_DIR, 'website', 'static', 'website', 'images', 'logo.jpg')
    if os.path.exists(logo_path):
        with open(logo_path, 'rb') as f:
            return HttpResponse(f.read(), content_type='image/jpeg')
    svg_data = """<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%2300F2FE'/><text x='50%' y='55%' dominant-baseline='central' text-anchor='middle' font-size='60' font-weight='900' fill='%230A0E1A' font-family='sans-serif'>D</text></svg>"""
    return HttpResponse(svg_data, content_type='image/svg+xml')


def safe_query(fetch_fn, fallback=None):
    try:
        return list(fetch_fn())
    except Exception:
        return fallback if fallback is not None else []


def index_view(request):
    services = safe_query(lambda: Service.objects.all())
    courses = safe_query(lambda: Course.objects.all())
    projects = safe_query(lambda: Project.objects.filter(is_featured=True))
    placements = safe_query(lambda: PlacementRecord.objects.all())
    testimonials = safe_query(lambda: Testimonial.objects.all())
    
    try:
        form = InquiryForm()
    except Exception:
        form = None
    
    stats = {
        'students_trained': 1500,
        'placement_rate': 98,
        'projects_delivered': 120,
        'hiring_partners': 85
    }

    if request.method == 'POST':
        form = InquiryForm(request.POST)
        if form.is_valid():
            try:
                inquiry = form.save()
            except Exception:
                inquiry = form.save(commit=False)
            msg = 'Thank you! Your course enrollment request has been registered. Our career counselor will call you within 2 hours.' if getattr(inquiry, 'inquiry_type', None) == 'course_enrollment' else 'Thank you! Your project inquiry has been received. Our tech lead will contact you shortly.'
            return render(request, 'website/index.html', {
                'services': services,
                'courses': courses,
                'projects': projects,
                'placements': placements,
                'testimonials': testimonials,
                'stats': stats,
                'form': InquiryForm() if form else None,
                'success_message': msg
            })

    context = {
        'services': services,
        'courses': courses,
        'projects': projects,
        'placements': placements,
        'testimonials': testimonials,
        'stats': stats,
        'form': form
    }
    return render(request, 'website/index.html', context)


import urllib.parse

@require_POST
def inquiry_submit_api(request):
    form = InquiryForm(request.POST)
    if form.is_valid():
        try:
            inquiry = form.save()
        except Exception:
            inquiry = form.save(commit=False)

        full_name = form.cleaned_data.get('full_name') or getattr(inquiry, 'full_name', 'Student')
        phone = form.cleaned_data.get('phone') or getattr(inquiry, 'phone', '')
        email = form.cleaned_data.get('email') or getattr(inquiry, 'email', '')
        message = form.cleaned_data.get('message') or getattr(inquiry, 'message', '')
        interested_in = form.cleaned_data.get('interested_in', 'General Inquiry')
        
        # Format WhatsApp web link with inquiry details
        text = f"Hello DUSENT SOFT TECH,\nMy Name: {full_name}\nPhone: {phone}\nEmail: {email}\nInterested In: {interested_in}\nMessage: {message}"
        encoded_text = urllib.parse.quote(text)
        whatsapp_url = f"https://wa.me/918825645950?text={encoded_text}"
        
        msg = f"Thank you, {full_name}! Your inquiry has been registered. Connecting you to WhatsApp..."
        return JsonResponse({
            'success': True,
            'message': msg,
            'whatsapp_url': whatsapp_url
        })
    else:
        field_errors = {}
        error_list = []
        for field, errs in form.errors.items():
            field_errors[field] = [str(e) for e in errs]
            field_label = form.fields[field].label if (field in form.fields and form.fields[field].label) else field.replace('_', ' ').title()
            error_list.append(f"{field_label}: {errs[0]}")

        first_error_msg = error_list[0] if error_list else 'Please fill in all required fields accurately.'
        return JsonResponse({
            'success': False,
            'message': f"Please fix the error: {first_error_msg}",
            'errors': field_errors,
            'error_list': error_list
        }, status=400)


def project_detail_view(request, pk):
    project = get_object_or_404(Project, pk=pk)
    related_projects = Project.objects.exclude(pk=pk)[:3]
    return render(request, 'website/project_detail.html', {
        'project': project,
        'related_projects': related_projects
    })


def about_view(request):
    placements = safe_query(lambda: PlacementRecord.objects.all()[:4])
    testimonials = safe_query(lambda: Testimonial.objects.all())
    stats = {
        'students_trained': 1500,
        'placement_rate': 98,
        'projects_delivered': 120,
        'hiring_partners': 85
    }
    return render(request, 'website/about.html', {
        'stats': stats,
        'placements': placements,
        'testimonials': testimonials
    })


def courses_view(request):
    courses = safe_query(lambda: Course.objects.all())
    if not courses:
        try:
            from django.core.management import call_command
            call_command('migrate', interactive=False)
            from seed_data import run_seed
            run_seed()
            courses = safe_query(lambda: Course.objects.all())
        except Exception:
            courses = []

    try:
        form = InquiryForm(initial={'inquiry_type': 'course_enrollment'})
    except Exception:
        form = None

    return render(request, 'website/courses.html', {
        'courses': courses,
        'form': form
    })


def software_dev_view(request):
    services = safe_query(lambda: Service.objects.all())
    projects = safe_query(lambda: Project.objects.all())
    try:
        form = InquiryForm(initial={'inquiry_type': 'client_project'})
    except Exception:
        form = None
    return render(request, 'website/software_dev.html', {
        'services': services,
        'projects': projects,
        'form': form
    })


def services_view(request):
    services = safe_query(lambda: Service.objects.all())
    courses = safe_query(lambda: Course.objects.all())
    try:
        form = InquiryForm()
    except Exception:
        form = None
    return render(request, 'website/services.html', {
        'services': services,
        'courses': courses,
        'form': form
    })


def training_view(request):
    placements = safe_query(lambda: PlacementRecord.objects.all())
    courses = safe_query(lambda: Course.objects.filter(language_category__in=['python', 'java', 'cpp', 'web']))
    try:
        form = InquiryForm(initial={'inquiry_type': 'course_enrollment'})
    except Exception:
        form = None
    return render(request, 'website/training.html', {
        'placements': placements,
        'courses': courses,
        'form': form
    })


def contact_view(request):
    try:
        form = InquiryForm()
    except Exception:
        form = None
    success_message = None
    if request.method == 'POST':
        form = InquiryForm(request.POST)
        if form.is_valid():
            try:
                inquiry = form.save()
            except Exception:
                inquiry = form.save(commit=False)
            name = form.cleaned_data.get('full_name') or getattr(inquiry, 'full_name', '')
            success_message = f'Thank you, {name}! Your message has been received. Our team will get back to you shortly.'
            try:
                form = InquiryForm()
            except Exception:
                form = None
            
    return render(request, 'website/contact.html', {
        'form': form,
        'success_message': success_message
    })


@require_POST
def estimate_cost_api(request):
    platform = request.POST.get('platform', 'web')
    features = request.POST.getlist('features')
    urgency = request.POST.get('urgency', 'normal')

    base_cost = 5000 if platform == 'web' else (7500 if platform == 'mobile' else 12000)
    feature_cost = len(features) * 1500
    multiplier = 1.4 if urgency == 'rush' else 1.0

    total_est = int((base_cost + feature_cost) * multiplier)
    min_est = int(total_est * 0.85)
    max_est = int(total_est * 1.15)
    
    weeks = 4 + len(features) * 2
    if urgency == 'rush':
        weeks = max(2, int(weeks * 0.65))

    return JsonResponse({
        'success': True,
        'min_estimate': f"${min_est:,}",
        'max_estimate': f"${max_est:,}",
        'estimated_weeks': f"{weeks} Weeks",
        'summary': f"Estimated for {platform.title()} build with {len(features)} key modules."
    })


def google_site_verification(request):
    content = "google-site-verification: googleb5b8517425e25d8e.html"
    return HttpResponse(content, content_type='text/html')

