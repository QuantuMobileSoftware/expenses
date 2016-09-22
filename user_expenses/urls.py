from django.conf.urls import url
from user_expenses.views import UserDetail, UserList, GroupDetail, GroupList, ExpensesDetail, ExpensesList, \
    CreateUserView


extra_patterns = [
    url(r'^create/', CreateUserView.as_view(), name='create'),
    url(r'^users/$', UserList.as_view(), name='user-list'),
    url(r'^users/(?P<pk>\d+)/$', UserDetail.as_view(), name='user-detail'),
    url(r'^groups/$', GroupList.as_view(), name='group-list'),
    url(r'^groups/(?P<pk>\d+)/$', GroupDetail.as_view(), name='group-detail'),
    url(r'^expenses/$', ExpensesList.as_view(), name='expenses-list'),
    url(r'^expenses/(?P<pk>\d+)/$', ExpensesDetail.as_view(), name='expenses-detail'),
]
