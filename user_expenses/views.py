from rest_framework import filters
from django.contrib.auth.models import Group, User
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.renderers import TemplateHTMLRenderer, JSONRenderer, HTMLFormRenderer
from permissions import CanManageUsers, CanManageRecords, IsOwner

from models import Expenses
from serializers import UserSerializer, GroupSerializer, ExpensesSerializer
from filters import ExpensesFilter


class CreateUserView(generics.CreateAPIView):
    model = User
    permission_classes = [permissions.AllowAny, ]
    serializer_class = UserSerializer


class ExpensesList(generics.ListCreateAPIView):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer
    permission_classes = [permissions.IsAuthenticated, CanManageRecords]
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = ExpensesFilter

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get(self, request, *args, **kwargs):
        # import pdb; pdb.set_trace()
        if request.user.is_authenticated():
            if Group.objects.get(name='admin') not in request.user.groups.all():
                self.queryset = Expenses.objects.filter(owner=request.user)
            if Group.objects.get(name='regular_user') in request.user.groups.all():
                data = [{'text': el.text, 'date': el.date, 'time': el.time, 'cost': el.cost, 'id': el.id} for el in self.queryset.all()]
                return Response(data=data)
            return super(ExpensesList, self).get(request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN)


class ExpensesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer
    permission_classes = [permissions.IsAuthenticated, CanManageRecords, IsOwner]

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            return super(ExpensesDetail, self).get(request, args, kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN)


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [CanManageUsers, permissions.IsAuthenticated]


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [CanManageUsers, permissions.IsAuthenticated]

    def put(self, request, *args, **kwargs):
        # import pdb; pdb.set_trace()
        if self.check_groups():
            return super(UserDetail, self).update(request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def patch(self, request, *args, **kwargs):
        if self.check_groups():
            return super(UserDetail, self).partial_update(request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def check_groups(self, request):
        if Group.objects.get(name='admin'):
            for id in request.data['groups']:
                if int(id) not in [el.id for el in Group.objects.all()]:
                    break
            else:
                return True
        return False


class GroupList(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer





