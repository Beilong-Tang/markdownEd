from django.urls import path

from . import views
from . import api_view

app_name = "markdown_app"

urlpatterns = [
    path("", views.index, name="index"),
    path("submit", api_view.submit, name="submit"),
    path("file/<int:fileID>", views.file, name="file"),
    path("file/preview/<int:fileID>", views.filePreview, name="file_preview"),
    path("api/file/<int:fileID>/<str:userName>", api_view.getFile, name="api_file"),
    path("api/create_file", api_view.createFile, name="api_create_file"),
    path("api/active_user", api_view.getActiveEditors, name="api_active_user"),
    path(
        "api/change_file_name",
        api_view.changeFileName,
        name="api_change_file_name",
    ),
    path(
        "api/delete_file",
        api_view.deleteFile,
        name="api_delete_file",
    ),
]
