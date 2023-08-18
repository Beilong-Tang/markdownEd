import datetime

from django.http import HttpResponseRedirect, HttpResponseBadRequest, JsonResponse
from django.urls import reverse

from .models import Markdown, Record


def submit(request):
    if request.method == "POST":
        file = request.POST["text"]
        title = request.POST["title"]
        id = request.POST["id"]

        m = Markdown.objects.get(id=id)

        # if the text is the same, then nothing saved
        # TODO: This part can be expensive in comparing large files
        if m.text.replace("\r", "") == file:
            return JsonResponse({"data": "ok"})

        m.text = file
        m.title = title
        m.version += 1
        m.save()

        return JsonResponse({"data": "ok", "version": m.version})

    pass


def getFile(request, fileID, userName):
    if not Markdown.objects.filter(id=fileID).exists():
        return HttpResponseBadRequest()

    m = Markdown.objects.get(id=fileID)

    now = datetime.datetime.utcnow()
    timeDue = now + datetime.timedelta(seconds=10)

    if not userName == "__":
        Record.objects.create(user=userName, time=timeDue, markdownID=fileID)

    user = list(Record.objects.filter(markdownID=fileID).values_list("user"))
    return JsonResponse(
        {"text": m.text, "version": m.version, "user": user, "title": m.title}
    )

    pass


def createFile(request):
    if request.method == "POST":
        title = request.POST["title"]
        if Markdown.objects.filter(title=title).exists():
            return HttpResponseBadRequest()

        m = Markdown.objects.create(title=title)
        m.text = ""
        m.version = 0
        m.save()

        return HttpResponseRedirect(reverse("markdown_app:index", args=()))


def getActiveEditors(request):
    users = list(Record.objects.all().values_list("user", "markdownID"))

    return JsonResponse({"users": users})

    pass


def changeFileName(request):
    fileID = request.GET.get("id")
    fileName = request.GET.get("title")
    if Markdown.objects.filter(title=fileName).exists():
        return HttpResponseBadRequest()

    m = Markdown.objects.get(id=fileID)
    if not m.title == fileName:
        m.title = fileName
        m.save()
    return JsonResponse({"data": "ok"})


def deleteFile(request):
    fileID = request.GET.get("id")
    m = Markdown.objects.get(id=fileID)
    m.delete()
    return JsonResponse({"data": "ok"})
