from django.shortcuts import render

# from django.http import HttpResponse

from .models import Markdown

# Create your views here.


def index(request):
    """
    Show all the existing files
    """
    all = Markdown.objects.all()
    context = {"all": all}

    return render(request, "markdown_app/all.html", context=context)


def file(request, fileID):
    m = Markdown.objects.get(id=fileID)
    context = {}
    context["file"] = m.text
    context["title"] = m.title
    context["id"] = m.id
    context["version"] = m.version
    return render(request, "markdown_app/file.html", context=context)


def filePreview(request, fileID):
    m = Markdown.objects.get(id=fileID)
    context = {}
    context["file"] = m.text
    context["title"] = m.title
    context["id"] = m.id
    context["version"] = m.version
    return render(request, "markdown_app/file_preview.html", context=context)
