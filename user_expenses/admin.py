from django.contrib import admin
from models import Expenses

class ExpensesAdmin(admin.ModelAdmin):
    pass

admin.site.register(Expenses, ExpensesAdmin)
