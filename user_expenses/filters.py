import django_filters
from rest_framework import filters
from models import Expenses


class ExpensesFilter(filters.FilterSet):
    date = django_filters.DateTimeFromToRangeFilter(name='date')
    cost = django_filters.NumberFilter(name='cost')
    text = django_filters.CharFilter(name='text', lookup_expr='icontains')

    class Meta:
        model = Expenses
        fields = ['date', 'text', 'cost']


