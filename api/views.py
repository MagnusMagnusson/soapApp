from django.shortcuts import render

# Create your views here.
import json 
from django.http import JsonResponse

def respond(object, status=200):
    return JsonResponse({
        "success":status==200,
        "result":object
    }
    ,status=status)

def get_by_id(request, object=None, id=None):
    x = object.objects.all().filter(id=id)
    if(len(x) == 1):
        return respond(x[0].object())
    else:
        return respond({},404)

def get_all(request, object = None):
    x = object.objects.all()
    res = [a.object() for a in x]
    return respond(res, 200)