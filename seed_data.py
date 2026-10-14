import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dusent_project.settings')
if not django.apps.apps.ready:
    django.setup()

from website.models import Service, Course, Project, PlacementRecord, Testimonial

def run_seed():
    print("Clearing old data...")
    Service.objects.all().delete()
    Course.objects.all().delete()
    Project.objects.all().delete()
    PlacementRecord.objects.all().delete()
    Testimonial.objects.all().delete()

    print("Seeding Courses with Validity & Certification...")
    courses_data = [
        {
            "title": "Python Full-Stack & Generative AI Masterclass",
            "slug": "python-fullstack-ai-masterclass",
            "language_category": "python",
            "badge_text": "100% Placement Track",
            "duration": "12 Weeks",
            "skill_level": "Zero to Hero",
            "validity_period": "Lifetime Video Access + 2 Yrs Placement Drive Support",
            "certification_name": "Certified Full-Stack Python & AI Engineer",
            "short_description": "Master Python 3.13, Django 5.x backend development, REST APIs, PostgreSQL, and LLM Generative AI integration with live project building.",
            "syllabus_list": "Python Core & OOP Architecture, Django 5 Web Apps & ORM, REST & GraphQL API Integration, OpenAI & LangChain AI Automation, Live Client Project Internship",
            "price": "₹14,999 / $199",
            "order": 1
        },
        {
            "title": "Java Enterprise & Spring Boot Microservices",
            "slug": "java-enterprise-spring-boot",
            "language_category": "java",
            "badge_text": "High Demand",
            "duration": "14 Weeks",
            "skill_level": "Job Ready",
            "validity_period": "Lifetime Video Access + 2 Yrs Placement Drive Support",
            "certification_name": "Certified Enterprise Java Architect",
            "short_description": "Comprehensive Java 21 training, Spring Boot 3 microservices, Hibernate ORM, Kafka event streaming, and enterprise cloud architecture.",
            "syllabus_list": "Java 21 Core & Multithreading, Spring Boot & Security Framework, Microservices Architecture & Gateway, Kafka Event Streaming & Redis Caching, AWS Cloud Deployment",
            "price": "₹16,499 / $219",
            "order": 2
        },
        {
            "title": "C++ Masterclass & DSA Competitive Coding",
            "slug": "cpp-dsa-competitive-coding",
            "language_category": "cpp",
            "badge_text": "Core Foundation",
            "duration": "10 Weeks",
            "skill_level": "Beginner to Advanced",
            "validity_period": "Lifetime Video Access + Unlimited Coding Drills Access",
            "certification_name": "Certified Data Structures & Algorithms Specialist",
            "short_description": "Crack technical coding interviews at top tech companies. Master Data Structures, Algorithms, Dynamic Programming, and C++ STL.",
            "syllabus_list": "C++ Pointers & Memory Optimization, Arrays LinkedLists Trees & Graphs, Dynamic Programming & Backtracking, 250+ LeetCode Problem Solutions, 1-on-1 Mock Interview Drills",
            "price": "₹11,999 / $159",
            "order": 3
        },
        {
            "title": "Full-Stack Web Development (MERN & Django)",
            "slug": "fullstack-web-development-mern-django",
            "language_category": "web",
            "badge_text": "Popular",
            "duration": "16 Weeks",
            "skill_level": "Job Ready",
            "validity_period": "Lifetime Video Access + 2 Yrs Placement Drive Support",
            "certification_name": "Certified Modern Full-Stack Developer",
            "short_description": "Build modern responsive websites and SaaS apps with React, Vue.js, Node.js, and Python Django with real-world deployment pipelines.",
            "syllabus_list": "HTML5 CSS3 & Tailwind Glassmorphism UI, React & Vue.js Interactive Frontend, Django & Node.js Backend Microservices, CI/CD Pipeline & Vercel/AWS Deployment",
            "price": "₹17,999 / $239",
            "order": 4
        },
        {
            "title": "Data Science, Machine Learning & PyTorch",
            "slug": "data-science-machine-learning-pytorch",
            "language_category": "ai",
            "badge_text": "Future Tech",
            "duration": "14 Weeks",
            "skill_level": "Advanced",
            "validity_period": "Lifetime Video Access + AI Community Pass",
            "certification_name": "Certified Data Scientist & ML Engineer",
            "short_description": "Dive deep into data analytics, predictive machine learning models, PyTorch deep learning, computer vision, and AI pipeline deployment.",
            "syllabus_list": "Pandas & NumPy Data Analysis, Scikit-Learn ML Predictive Models, PyTorch Deep Neural Networks, Computer Vision & Natural Language Processing, AI Model API Deployment",
            "price": "₹18,999 / $249",
            "order": 5
        },
        {
            "title": "Cloud DevOps, Docker & Kubernetes",
            "slug": "cloud-devops-docker-kubernetes",
            "language_category": "cloud",
            "badge_text": "High Salary Track",
            "duration": "12 Weeks",
            "skill_level": "Professional",
            "validity_period": "Lifetime Video Access + Cloud Lab Sandbox",
            "certification_name": "Certified DevOps & Cloud Solutions Engineer",
            "short_description": "Learn cloud infrastructure management, Docker containerization, Kubernetes cluster orchestration, and automated Terraform CI/CD pipelines.",
            "syllabus_list": "Linux System Administration & Shell Scripting, Docker Containerization & Compose, Kubernetes Cluster Orchestration, Terraform Infrastructure as Code, AWS Cloud & Security Hardening",
            "price": "₹15,999 / $209",
            "order": 6
        },
        {
            "title": "Ethical Hacking & Cybersecurity Masterclass",
            "slug": "ethical-hacking-cybersecurity",
            "language_category": "cyber",
            "badge_text": "Security Track",
            "duration": "10 Weeks",
            "skill_level": "Zero to Hero",
            "validity_period": "Lifetime Access + Cyber Security Lab Pass",
            "certification_name": "Certified Ethical Hacker & Security Auditor",
            "short_description": "Master web application security auditing, penetration testing, network defense, OWASP vulnerability patching, and digital forensics.",
            "syllabus_list": "Network Security & Packet Analysis, Web Application Penetration Testing, OWASP Top 10 Exploits & Patching, Vulnerability Assessment & Auditing, Cyber Security Cert Prep",
            "price": "₹13,999 / $179",
            "order": 7
        }
    ]

    for c_data in courses_data:
        Course.objects.create(**c_data)

    print("Seeding Placement Records...")
    placements_data = [
        {
            "student_name": "Suresh R.",
            "placed_company": "TechCorp Global",
            "placed_role": "Python Full-Stack Developer",
            "salary_package": "14.5 LPA",
            "course_taken": "Python Full-Stack & AI Track",
            "avatar_color": "#00F2FE",
            "avatar_initials": "SR",
            "review": "The live client project internship and mock interviews at Dusent Soft Tech got me 3 job offers before graduation!"
        },
        {
            "student_name": "Ananya Sharma",
            "placed_company": "FinScale Systems",
            "placed_role": "Backend Java Engineer",
            "salary_package": "18.2 LPA",
            "course_taken": "Java & Microservices Track",
            "avatar_color": "#8B5CF6",
            "avatar_initials": "AS",
            "review": "Learning Spring Boot microservices and solving DSA problems daily made my technical interview feel effortless."
        },
        {
            "student_name": "Karthik V.",
            "placed_company": "CloudMatrix Inc",
            "placed_role": "DevOps & Cloud Specialist",
            "salary_package": "16.0 LPA",
            "course_taken": "Cloud DevOps & Kubernetes",
            "avatar_color": "#10B981",
            "avatar_initials": "KV",
            "review": "From zero Linux knowledge to managing Kubernetes clusters in production. 100% placement support!"
        },
        {
            "student_name": "Priya Nair",
            "placed_company": "OmniAI Labs",
            "placed_role": "AI Data Engineer",
            "salary_package": "15.8 LPA",
            "course_taken": "Data Science & AI/ML",
            "avatar_color": "#EC4899",
            "avatar_initials": "PN",
            "review": "Alex Code Buddy and the mentors guided me every step of the way. Recommending Dusent Soft Tech to all freshers!"
        }
    ]

    for p_rec in placements_data:
        PlacementRecord.objects.create(**p_rec)

    print("Seeding Services...")
    services_data = [
        {
            "title": "Custom Django Web Development",
            "slug": "custom-django-web-development",
            "badge_text": "Core Division",
            "short_description": "Robust, high-security Python Django web applications built with scalable database architectures, REST APIs, and admin dashboards.",
            "features_list": "Django 5.x Backend, PostgreSQL / SQLite ORM, Custom Admin Panel, REST & GraphQL API, Redis Caching",
            "order": 1
        },
        {
            "title": "Artificial Intelligence & Machine Learning",
            "slug": "ai-machine-learning-solutions",
            "badge_text": "AI Powered",
            "short_description": "Generative AI models, LLM fine-tuning, predictive data analytics pipelines, custom AI agents, and automated workflows.",
            "features_list": "OpenAI / Anthropic API, Custom RAG Systems, PyTorch & TensorFlow, LangChain Integration, Vector Search",
            "order": 2
        },
        {
            "title": "Cross-Platform Mobile Apps",
            "slug": "mobile-app-development",
            "badge_text": "iOS & Android",
            "short_description": "High-performance cross-platform mobile apps for iOS and Android with intuitive micro-interactions and seamless API connectivity.",
            "features_list": "React Native & Flutter, Biometric Auth, Real-time WebSockets, Offline Sync, App Store Deployment",
            "order": 3
        },
        {
            "title": "Cloud Infrastructure & DevOps",
            "slug": "cloud-infrastructure-devops",
            "badge_text": "99.99% Uptime",
            "short_description": "Automated CI/CD deployment pipelines, containerized Docker microservices, AWS cloud hosting, and Kubernetes orchestration.",
            "features_list": "AWS / DigitalOcean Cloud, Docker & Compose, Kubernetes Clusters, Nginx Reverse Proxy, SSL Hardening",
            "order": 4
        }
    ]

    for s_data in services_data:
        Service.objects.create(**s_data)

    print("Seeding Projects...")
    projects_data = [
        {
            "title": "FinPulse Global - Payment Gateway",
            "category": "web",
            "client_name": "FinScale Capital",
            "short_description": "Enterprise Django-powered payment reconciliation platform handling 500,000+ daily transactions.",
            "tech_stack": "Django, Python 3.13, PostgreSQL, Redis, Stripe API",
            "image_gradient": "linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)",
            "is_featured": True,
            "completed_date": "Q1 2025"
        },
        {
            "title": "OmniVision AI Analytics Suite",
            "category": "ai",
            "client_name": "OmniTech Global",
            "short_description": "Generative AI computer vision and NLP intelligence suite for automated transcript analysis.",
            "tech_stack": "Python, PyTorch, OpenAI API, Django REST, Celery",
            "image_gradient": "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
            "is_featured": True,
            "completed_date": "Q4 2024"
        },
        {
            "title": "HealthSync Telemedicine Mobile App",
            "category": "mobile",
            "client_name": "HealthSync Inc",
            "short_description": "HIPAA-compliant video consultation app connecting over 50,000 patients with specialist doctors.",
            "tech_stack": "React Native, Django, WebRTC, Twilio, PostgreSQL",
            "image_gradient": "linear-gradient(135deg, #10B981 0%, #059669 100%)",
            "is_featured": True,
            "completed_date": "Q2 2025"
        }
    ]

    for prj in projects_data:
        Project.objects.create(**prj)

    print("Database seeding completed successfully!")

if __name__ == '__main__':
    run_seed()
