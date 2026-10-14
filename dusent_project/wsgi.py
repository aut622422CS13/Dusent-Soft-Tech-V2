"""
WSGI config for dusent_project project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os
import sys
from pathlib import Path

# Add project root directory to sys.path for Vercel serverless environment
BASE_DIR = Path(__file__).resolve().parent.parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dusent_project.settings')

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()

# Alias required for Vercel serverless runtime
app = application

# Auto-initialize database on cold start (runs migrations & seeds data if empty)
try:
    from website.models import Course
    if Course.objects.count() == 0:
        from seed_data import run_seed
        run_seed()
except Exception:
    try:
        from django.core.management import call_command
        call_command('migrate', interactive=False)
        from seed_data import run_seed
        run_seed()
    except Exception:
        pass
