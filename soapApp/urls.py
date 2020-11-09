"""soapApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.urls import path
from api.models import Ingredient,Recipie,Design,Batch
from api.views import get_all, get_by_id 


urlpatterns = [
    path("api/i/<int:id>", get_by_id,{"object":Ingredient}),
    path("api/r/<int:id>", get_by_id,{"object":Recipie}),
    path("api/d/<int:id>", get_by_id,{"object":Design}),
    path("api/b/<int:id>", get_by_id,{"object":Batch}),

    path("api/i/", get_all,{"object":Ingredient}),
    path("api/r/", get_all,{"object":Recipie}),
    path("api/d/", get_all,{"object":Design}),
    path("api/b/", get_all,{"object":Batch}),
]
