import django_filters
from rest_framework import filters
from models import Expenses


class ExpensesFilter(filters.FilterSet):
    date = django_filters.DateRangeFilter(name='date')
    time = django_filters.TimeRangeFilter(name='time')
    text = django_filters.CharFilter(name='text', lookup_expr='icontains')

    class Meta:
        model = Expenses
        fields = ('date', 'time', 'text')


