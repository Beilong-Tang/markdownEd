import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "markdownEd.settings")

import django

django.setup()

from markdown_app.models import Record

import time
import datetime

timeInterval = 5

while True:
    now = datetime.datetime.utcnow()
    Record.objects.filter(time__lte=now).delete()
    time.sleep(timeInterval)
