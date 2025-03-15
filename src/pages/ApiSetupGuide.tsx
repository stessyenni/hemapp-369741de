
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle, ExternalLink, Info } from 'lucide-react';
import GlassmorphicCard from '@/components/ui-elements/GlassmorphicCard';
import FadeIn from '@/components/animations/FadeIn';

const ApiSetupGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 pt-28 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <h1 className="text-3xl font-bold mb-2">Django Backend Setup Guide</h1>
          <p className="text-muted-foreground mb-8">
            Follow these steps to set up your Python/Django backend with MySQL for Hemapp
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <GlassmorphicCard className="p-6 mb-8">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-health-primary mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-sm">This React frontend is configured to work with a Django backend</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You'll need to create a Django project separately and connect it using the API configuration we've already set up.
                </p>
              </div>
            </div>
          </GlassmorphicCard>
        </FadeIn>

        <div className="space-y-6">
          <FadeIn delay={0.2}>
            <h2 className="text-xl font-semibold mb-4">Django Backend Setup Steps</h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <GlassmorphicCard className="p-6">
              <div className="flex mb-4">
                <div className="w-6 h-6 rounded-full bg-health-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-health-primary" />
                </div>
                <h3 className="font-medium">1. Set up Python environment</h3>
              </div>
              <div className="pl-9">
                <pre className="bg-muted/30 p-3 rounded-md text-sm overflow-x-auto">
                  <code>
{`# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows
venv\\Scripts\\activate
# On macOS/Linux
source venv/bin/activate

# Install Django and required packages
pip install django djangorestframework django-cors-headers mysqlclient`}
                  </code>
                </pre>
              </div>
            </GlassmorphicCard>
          </FadeIn>

          <FadeIn delay={0.4}>
            <GlassmorphicCard className="p-6">
              <div className="flex mb-4">
                <div className="w-6 h-6 rounded-full bg-health-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-health-primary" />
                </div>
                <h3 className="font-medium">2. Create Django project and configure MySQL</h3>
              </div>
              <div className="pl-9">
                <pre className="bg-muted/30 p-3 rounded-md text-sm overflow-x-auto">
                  <code>
{`# Create a new Django project
django-admin startproject hemapp_backend

# Navigate to project directory
cd hemapp_backend

# Configure MySQL in settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'hemapp_db',
        'USER': 'your_mysql_user',
        'PASSWORD': 'your_mysql_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}`}
                  </code>
                </pre>
              </div>
            </GlassmorphicCard>
          </FadeIn>

          <FadeIn delay={0.5}>
            <GlassmorphicCard className="p-6">
              <div className="flex mb-4">
                <div className="w-6 h-6 rounded-full bg-health-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <Circle className="h-4 w-4 text-health-primary" />
                </div>
                <h3 className="font-medium">3. Configure CORS for React frontend</h3>
              </div>
              <div className="pl-9">
                <pre className="bg-muted/30 p-3 rounded-md text-sm overflow-x-auto">
                  <code>
{`# In settings.py, add:
INSTALLED_APPS = [
    # ...
    'corsheaders',
    'rest_framework',
    # ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ... other middleware
]

# Allow requests from your React app
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite's default port
    "http://localhost:3000",  # Alternative React port
]

# JWT authentication (optional)
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}`}
                  </code>
                </pre>
              </div>
            </GlassmorphicCard>
          </FadeIn>

          <FadeIn delay={0.6}>
            <GlassmorphicCard className="p-6">
              <div className="flex mb-4">
                <div className="w-6 h-6 rounded-full bg-health-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <Circle className="h-4 w-4 text-health-primary" />
                </div>
                <h3 className="font-medium">4. Create Django apps for each feature</h3>
              </div>
              <div className="pl-9">
                <pre className="bg-muted/30 p-3 rounded-md text-sm overflow-x-auto">
                  <code>
{`# Create apps for each feature
python manage.py startapp authentication
python manage.py startapp diet
python manage.py startapp health_tracking
python manage.py startapp facilities
python manage.py startapp chatbot

# Create models, serializers, and views for each app
# Example: authentication/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    # Add other fields as needed`}
                  </code>
                </pre>
              </div>
            </GlassmorphicCard>
          </FadeIn>

          <FadeIn delay={0.7}>
            <GlassmorphicCard className="p-6">
              <div className="flex mb-4">
                <div className="w-6 h-6 rounded-full bg-health-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <Circle className="h-4 w-4 text-health-primary" />
                </div>
                <h3 className="font-medium">5. Set up URL routing</h3>
              </div>
              <div className="pl-9">
                <pre className="bg-muted/30 p-3 rounded-md text-sm overflow-x-auto">
                  <code>
{`# In hemapp_backend/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/diet/', include('diet.urls')),
    path('api/health/', include('health_tracking.urls')),
    path('api/facilities/', include('facilities.urls')),
    path('api/chatbot/', include('chatbot.urls')),
    path('api/settings/', include('settings.urls')),
]`}
                  </code>
                </pre>
              </div>
            </GlassmorphicCard>
          </FadeIn>

          <FadeIn delay={0.8}>
            <GlassmorphicCard className="p-6">
              <div className="flex mb-4">
                <div className="w-6 h-6 rounded-full bg-health-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <Circle className="h-4 w-4 text-health-primary" />
                </div>
                <h3 className="font-medium">6. Run migrations and start server</h3>
              </div>
              <div className="pl-9">
                <pre className="bg-muted/30 p-3 rounded-md text-sm overflow-x-auto">
                  <code>
{`# Create and apply migrations
python manage.py makemigrations
python manage.py migrate

# Create a superuser
python manage.py createsuperuser

# Run the development server
python manage.py runserver`}
                  </code>
                </pre>
              </div>
            </GlassmorphicCard>
          </FadeIn>
        </div>

        <FadeIn delay={0.9} className="mt-8">
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link to="/">Back to Dashboard</Link>
            </Button>
            <Button asChild>
              <a href="https://docs.djangoproject.com/en/stable/" target="_blank" rel="noopener noreferrer">
                Django Documentation
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default ApiSetupGuide;
