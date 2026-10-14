from django.db import models

class Service(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    icon_name = models.CharField(max_length=50, default="code-bracket", help_text="SVG icon selector or class")
    badge_text = models.CharField(max_length=50, blank=True, null=True)
    short_description = models.TextField()
    full_description = models.TextField(blank=True)
    features_list = models.TextField(help_text="Comma-separated key features")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return self.title

    def get_features(self):
        if not self.features_list:
            return []
        return [f.strip() for f in self.features_list.split(',') if f.strip()]


class Course(models.Model):
    CATEGORY_CHOICES = [
        ('python', 'Python & Django AI'),
        ('java', 'Java & Microservices'),
        ('cpp', 'C++ & DSA Masterclass'),
        ('web', 'Full-Stack Web Dev'),
        ('mobile', 'Mobile App Dev'),
        ('ai', 'Data Science & AI/ML'),
        ('cloud', 'Cloud & DevOps'),
        ('cyber', 'Cybersecurity & Hacking'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    language_category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='python')
    badge_text = models.CharField(max_length=50, default="Job Guaranteed Track")
    duration = models.CharField(max_length=50, default="12 Weeks")
    skill_level = models.CharField(max_length=50, default="Zero to Hero")
    validity_period = models.CharField(max_length=150, default="Lifetime Video Access + 2 Yrs Placement Drive Support")
    certification_name = models.CharField(max_length=150, default="Certified Full-Stack Software Engineer")
    short_description = models.TextField()
    syllabus_list = models.TextField(help_text="Comma-separated syllabus modules")
    price = models.CharField(max_length=50, default="₹14,999 / $199")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return f"{self.title} ({self.get_language_category_display()})"

    def get_modules(self):
        if not self.syllabus_list:
            return []
        return [m.strip() for m in self.syllabus_list.split(',') if m.strip()]


class Project(models.Model):
    CATEGORY_CHOICES = [
        ('web', 'Web Applications'),
        ('mobile', 'Mobile Apps'),
        ('ai', 'AI & Machine Learning'),
        ('cloud', 'Cloud & DevOps'),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='web')
    client_name = models.CharField(max_length=150, default="Enterprise Client")
    short_description = models.TextField()
    full_description = models.TextField(blank=True)
    tech_stack = models.CharField(max_length=255)
    image_gradient = models.CharField(max_length=100, default="linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)")
    live_url = models.URLField(blank=True, null=True)
    is_featured = models.BooleanField(default=True)
    completed_date = models.CharField(max_length=50, default="2025")

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return f"{self.title} ({self.get_category_display()})"

    def get_tags(self):
        if not self.tech_stack:
            return []
        return [t.strip() for t in self.tech_stack.split(',') if t.strip()]


class PlacementRecord(models.Model):
    student_name = models.CharField(max_length=150)
    placed_company = models.CharField(max_length=150)
    placed_role = models.CharField(max_length=150, help_text="e.g. Full-Stack Engineer")
    salary_package = models.CharField(max_length=50, help_text="e.g. 14 LPA / $85k")
    course_taken = models.CharField(max_length=150, default="Python Django Full-Stack")
    avatar_color = models.CharField(max_length=50, default="#00F2FE")
    avatar_initials = models.CharField(max_length=5, default="DS")
    review = models.TextField()

    def __str__(self):
        return f"{self.student_name} -> {self.placed_company} ({self.salary_package})"


class Inquiry(models.Model):
    TYPE_CHOICES = [
        ('course_enrollment', 'Student Course Enrollment & Placement Training'),
        ('client_project', 'Client Software Project / Service Request'),
    ]

    STATUS_CHOICES = [
        ('new', 'New Lead'),
        ('contacted', 'Contacted'),
        ('enrolled', 'Enrolled / Signed'),
        ('closed', 'Closed'),
    ]

    inquiry_type = models.CharField(max_length=50, choices=TYPE_CHOICES, default='course_enrollment')
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    service_requested = models.CharField(max_length=150, blank=True, default="General Inquiry")
    budget_range = models.CharField(max_length=100, blank=True, default="Standard")
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='new')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.get_inquiry_type_display()} from {self.full_name} ({self.email})"


class Testimonial(models.Model):
    client_name = models.CharField(max_length=150)
    client_role = models.CharField(max_length=150)
    rating = models.IntegerField(default=5)
    quote = models.TextField()
    avatar_initials = models.CharField(max_length=5, default="DT")
    avatar_color = models.CharField(max_length=50, default="#8B5CF6")

    def __str__(self):
        return f"{self.client_name} - {self.client_role}"
