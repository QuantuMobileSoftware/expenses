from django.conf.urls import include, url
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from user_expenses.views import UserDetail, UserList, GroupDetail, GroupList, ExpensesDetail, ExpensesList, CreateUserView


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^create/', CreateUserView.as_view(), name='create'),
    url(r'^users/$', UserList.as_view(), name='user-list'),
    url(r'^users/(?P<pk>\d+)/$', UserDetail.as_view(), name='user-detail'),
    url(r'^groups/$', GroupList.as_view(), name='group-list'),
    url(r'^groups/(?P<pk>\d+)/$', GroupDetail.as_view(), name='group-detail'),
    url(r'^expenses/$', ExpensesList.as_view(), name='expenses-list'),
    url(r'^expenses/(?P<pk>\d+)/$', ExpensesDetail.as_view(), name='expenses-detail'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
