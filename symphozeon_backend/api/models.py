import random
import string
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from symphozeon_backend.symphozeon_backend import settings
from django.core.exceptions import PermissionDenied
# Create your models here.

def generate_unique_room_code(length=8):
    while True:
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
        if not Room.objects.filter(room_code=code).exists():
            return code

class User(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    preferred_genres = models.ManyToManyField('Genre', related_name='users', blank=True)
    history_of_joined_rooms = models.ManyToManyField('Room', related_name='joined_users', blank=True)
    liked_rooms = models.ManyToManyField('Room', related_name='liked_by_users', blank=True)
    created_rooms = models.ManyToManyField('Room', related_name='creators', blank=True)


class Genre(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Room(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_rooms')
    room_name = models.CharField(max_length=255)
    genres = models.ManyToManyField(Genre, related_name='rooms')
    is_public = models.BooleanField(default=True)
    is_archived = models.BooleanField(default=False)
    archived_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    room_code = models.CharField(max_length=10, unique=True, blank=True)
    member_count = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.room_code:
            self.room_code = generate_unique_room_code()
        super().save(*args, **kwargs)

    def archive(self, user):
        if user != self.creator:
            raise PermissionDenied("Only the creator can archive this room.")
        self.is_archived = True
        self.archived_date = timezone.now()
        self.save()

    def activate(self, user):
        if user != self.creator:
            raise PermissionDenied("Only the creator can activate this room.")
        self.is_archived = False
        self.archived_date = None
        self.save()

    def make_private(self, user):
        if user != self.creator:
            raise PermissionDenied("Only the creator can make this room private.")
        self.is_public = False
        self.save()

    def make_public(self, user):
        if user != self.creator:
            raise PermissionDenied("Only the creator can make this room public.")
        self.is_public = True
        self.save()

    def delete_room(self, user):
        if user != self.creator:
            raise PermissionDenied("Only the creator can delete this room.")
        self.delete()

    def __str__(self):
        return f"{self.room_name} ({'Public' if self.is_public else 'Private'})"
    

class Role(models.Model):
    name = models.CharField(max_length=255)
    permissions = models.ManyToManyField('Permission', related_name='roles')

    def __str__(self):
        return self.name


class Permission(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class RoomMembership(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='memberships')
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)
    custom_permissions = models.ManyToManyField(Permission, blank=True)

    class Meta:
        unique_together = ('user', 'room')

    def has_permission(self, permission_name):
        # Check custom permissions first
        if self.custom_permissions.filter(name=permission_name).exists():
            return True
        # Check role permissions if role is assigned
        if self.role and self.role.permissions.filter(name=permission_name).exists():
            return True
        return False

    def __str__(self):
        return f"{self.user.username} in {self.room.name}"
    

class VibeVote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    song_id = models.CharField(max_length=100)  # This assumes external song data management

    class Meta:
        unique_together = ('user', 'room', 'song_id')  # One vote per user per song

    def __str__(self):
        return f"{self.user.username} voted to skip {self.song_id} in {self.room.code}"


class ChatMessage(models.Model):
    room = models.ForeignKey('Room', on_delete=models.CASCADE, related_name='messages')
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'[{self.timestamp}] {self.user.username}: {self.message}'
