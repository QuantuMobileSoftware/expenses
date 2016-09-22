from django.conf.urls import include, url
from django.contrib import admin
from user_expenses.urls import extra_patterns


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(extra_patterns)),
    url(r'^api/', include('rest_framework.urls', namespace='rest_framework')),
]
