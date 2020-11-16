from django.shortcuts import render
from django.http import QueryDict

# Create your views here.
import json 
from django.http import JsonResponse

def respond(object, status=200):
    return JsonResponse({
        "success":status==200 or status==201,
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
    if 'ids' in request.GET:
        idList = []
        try:
            id = request.GET['ids'].split(",")
            idList = list(map(lambda x: int(x),id))
        except ValueError as e: # pylint: disable=unused-variable
            return respond({"Malformed ID's"}, 400)
        res = [a.object() for a in x if a.id in idList]
        return respond(res, 200)
    else:
        res = [a.object() for a in x]
        return respond(res, 200)

def processGroupRequest(request, object = None):
    if request.method == "GET":
        return get_all(request, object)
    elif request.method == "POST":
        data = getData(request.body)
        if(data == None):
            return respond({}, 400)
        else:
            o = object.create(data)
            return respond(o.object(), 201)
    else: 
        respond({}, 501)



def getData(body):
    _d = json.loads(body.decode('utf-8'))
    print(_d)
    if 'data' in _d:
        data = _d['data']
    else:
        data = None
    return data