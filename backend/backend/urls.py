"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

"""Define las rutas principales del proyecto, incluye las rutas globales y enlaza las rutas de cada 
aplicación con include()"""
from django.contrib import admin
from django.urls import path, include
"""refirige todas las rutas dentro de una carpeta, en este caso no hay carpeta pero podria, asi no hace falta
definir las rutas completas en el urls de auth_app"""
urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("auth_app.urls")),  
]
