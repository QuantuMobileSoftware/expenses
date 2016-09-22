import re
from rest_framework import permissions
from serializers import Group


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class CanManageRecords(permissions.BasePermission):
    def has_permission(self, request, view):
        admin = Group.objects.get(name='admin')
        user = Group.objects.get(name='regular_user')
        if admin in request.user.groups.all() or user in request.user.groups.all():
            return True
        return False


class CanManageUsers(permissions.BasePermission):
    def has_permission(self, request, view):
        user_manager = Group.objects.get(name='user_manager')
        admin = Group.objects.get(name='admin')
        if admin in request.user.groups.all():
            return True
        elif re.findall(r'/users/\d+/', request.path):
            if user_manager not in request.user.groups.all():
                if request.user.id != int(re.findall(r'\d+', request.path)[0]):
                    return False
            if 'groups' in request.data.keys():
                    group_ids = [el.id for el in request.user.groups.all()]
                    group_ids.sort()
                    request.data['groups'].sort()
                    if request.data['groups'] != group_ids:
                        return False
        else:
            if request.method == 'POST':
                if user_manager not in request.user.groups.all():
                    return False
        return True


class CanManageGroups(permissions.BasePermission):
    def has_permission(self, request, view):
        admin = Group.objects.get(name='admin')
        if admin in request.user.groups.all():
            return True
        return False





