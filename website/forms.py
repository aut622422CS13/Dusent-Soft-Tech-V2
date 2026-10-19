import re
from django import forms
from .models import Inquiry

INTEREST_CHOICES = [
    ('Placement Training', 'Placement Training'),
    ('IT / Web Development', 'IT / Web Development'),
    ('Software Development', 'Software Development'),
    ('College Training', 'College Training'),
    ('Business Solutions', 'Business Solutions'),
    ('Internship', 'Internship'),
    ('Career Guidance', 'Career Guidance'),
    ('Other', 'Other'),
]

class InquiryForm(forms.ModelForm):
    full_name = forms.CharField(
        label='Full Name',
        min_length=2,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': 'Enter your name',
            'required': True,
            'autocomplete': 'name'
        }),
        error_messages={
            'required': 'Please enter your full name.',
            'min_length': 'Full name must contain at least 2 characters.',
        }
    )

    email = forms.EmailField(
        label='Email Address',
        required=True,
        widget=forms.EmailInput(attrs={
            'class': 'form-input',
            'placeholder': 'Enter your email address (e.g. name@example.com)',
            'required': True,
            'autocomplete': 'email'
        }),
        error_messages={
            'required': 'Please enter your email address.',
            'invalid': 'Please enter a valid email address with a domain (e.g. name@gmail.com).',
        }
    )

    phone = forms.CharField(
        label='Phone Number',
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': 'Enter your phone number (e.g. 9876543210)',
            'required': True,
            'autocomplete': 'tel'
        }),
        error_messages={
            'required': 'Please enter your phone number.',
        }
    )

    message = forms.CharField(
        label='Message',
        min_length=5,
        required=True,
        widget=forms.Textarea(attrs={
            'class': 'form-textarea',
            'rows': 4,
            'placeholder': 'Tell us about your requirement...',
            'required': True
        }),
        error_messages={
            'required': 'Please enter your message.',
            'min_length': 'Please write at least 5 characters in your message.',
        }
    )

    interested_in = forms.CharField(
        label="I'm Interested In",
        widget=forms.Select(choices=INTEREST_CHOICES, attrs={'class': 'form-input', 'id': 'interested-in-select'}),
        required=False,
        initial='Placement Training'
    )

    def clean_email(self):
        email = self.cleaned_data.get('email', '').strip()
        if not email:
            raise forms.ValidationError('Please enter your email address.')
        if '@' not in email:
            raise forms.ValidationError('Email must contain an "@" symbol.')
        domain = email.split('@')[-1]
        if '.' not in domain or len(domain.split('.')[-1]) < 2:
            raise forms.ValidationError('Please enter a valid email address with a domain (e.g. name@gmail.com).')
        return email

    def clean_phone(self):
        phone = self.cleaned_data.get('phone', '').strip()
        if not phone:
            raise forms.ValidationError('Please enter your phone number.')
        cleaned = re.sub(r'[\s\-\(\)\+]', '', phone)
        if not cleaned.isdigit() or len(cleaned) < 7 or len(cleaned) > 15:
            raise forms.ValidationError('Please enter a valid phone number (7 to 15 digits).')
        return phone

    def save(self, commit=True):
        instance = super().save(commit=False)
        interest = self.cleaned_data.get('interested_in') or 'General Inquiry'
        instance.service_requested = interest
        if commit:
            instance.save()
        return instance

    class Meta:
        model = Inquiry
        fields = ['full_name', 'email', 'phone', 'message']


