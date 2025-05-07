from rest_framework import generics
from .models import User, Genre, Room, Role, Permission, RoomMembership, VibeVote, ChatMessage
from .serializers import (
    UserSerializer, GenreSerializer, RoomSerializer, RoleSerializer, 
    PermissionSerializer, RoomMembershipSerializer, VibeVoteSerializer, ChatMessageSerializer
)

# ---- USER ----
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# ---- GENRE ----
class GenreCreateView(generics.CreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class GenreListView(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class GenreDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


# ---- ROOM ----
class RoomCreateView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class RoomListView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class RoomDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


# ---- ROLE ----
class RoleCreateView(generics.CreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class RoleListView(generics.ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class RoleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


# ---- PERMISSION ----
class PermissionCreateView(generics.CreateAPIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer

class PermissionListView(generics.ListAPIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer

class PermissionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer


# ---- ROOM MEMBERSHIP ----
class RoomMembershipCreateView(generics.CreateAPIView):
    queryset = RoomMembership.objects.all()
    serializer_class = RoomMembershipSerializer

class RoomMembershipListView(generics.ListAPIView):
    queryset = RoomMembership.objects.all()
    serializer_class = RoomMembershipSerializer

class RoomMembershipDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RoomMembership.objects.all()
    serializer_class = RoomMembershipSerializer


# ---- VIBE VOTE ----
class VibeVoteCreateView(generics.CreateAPIView):
    queryset = VibeVote.objects.all()
    serializer_class = VibeVoteSerializer

class VibeVoteListView(generics.ListAPIView):
    queryset = VibeVote.objects.all()
    serializer_class = VibeVoteSerializer

class VibeVoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = VibeVote.objects.all()
    serializer_class = VibeVoteSerializer


# ---- CHAT MESSAGE ----
class ChatMessageCreateView(generics.CreateAPIView):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

class ChatMessageListView(generics.ListAPIView):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

class ChatMessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
