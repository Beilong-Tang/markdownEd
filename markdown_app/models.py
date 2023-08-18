from django.db import models

# Create your models here.

## TODO: Expir Time 5 seconds
expireTime = 5


class Markdown(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    text = models.TextField(blank=True, null=True)
    version = models.IntegerField(blank=True, null=True)

    def __str__(self) -> str:
        return self.title


class Record(models.Model):
    user = models.CharField(max_length=100, blank=True, null=True)
    markdownID = models.IntegerField()
    time = models.DateTimeField()
    pass
