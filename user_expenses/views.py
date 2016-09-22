from rest_framework import filters
from django.contrib.auth.models import Group, User
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework import permissions
from permissions import CanManageUsers, CanManageRecords, IsOwner, CanManageGroups

from models import Expenses
from serializers import UserSerializer, GroupSerializer, ExpensesSerializer
from filters import ExpensesFilter


class CreateUserView(generics.CreateAPIView):
    model = User
    permission_classes = [permissions.AllowAny, ]
    serializer_class = UserSerializer


class ExpensesList(generics.ListCreateAPIView):
    serializer_class = ExpensesSerializer
    permission_classes = [permissions.IsAuthenticated, CanManageRecords]
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = ExpensesFilter

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated():
            if Group.objects.get(name='admin') not in user.groups.all():
                data = Expenses.objects.filter(owner=user)
            else:
                data = Expenses.objects.all()
            return data
        return Response(status=status.HTTP_403_FORBIDDEN)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ExpensesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer
    permission_classes = [permissions.IsAuthenticated, CanManageRecords, IsOwner]


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, CanManageUsers]

    def get_queryset(self):
        reg_user = Group.objects.filter(name='regular_user')
        if list(reg_user) == list(self.request.user.groups.all()):
            return User.objects.filter(id=self.request.user.id)
        return User.objects.all()


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, CanManageUsers]


class GroupList(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [CanManageGroups, ]


class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [CanManageGroups, ]






