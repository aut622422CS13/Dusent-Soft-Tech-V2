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
    interested_in = forms.CharField(
        widget=forms.Select(choices=INTEREST_CHOICES, attrs={'class': 'form-input', 'id': 'interested-in-select'}),
        required=False,
        initial='Placement Training'
    )

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
        widgets = {
            'full_name': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Enter your name',
                'required': True
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-input',
                'placeholder': 'Enter your email address',
                'required': True
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Enter your phone number',
                'required': True
            }),
            'message': forms.Textarea(attrs={
                'class': 'form-textarea',
                'rows': 4,
                'placeholder': 'Tell us about your requirement...',
                'required': True
            }),
        }

