from rest_framework import serializers
from .models import User, Genre, Room, Role, Permission, RoomMembership, VibeVote, ChatMessage

#Users
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile_picture', 
                  'preferred_genres', 'history_of_joined_rooms', 'liked_rooms']

#Genres
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']
        

#Rooms
class RoomSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    genres = GenreSerializer(many=True)

    class Meta:
        model = Room
        fields = ['id', 'creator', 'room_name', 'genres', 'is_public', 'is_archived', 
                  'archived_date', 'created_at', 'room_code', 'member_count']
        

#Roles
class RoleSerializer(serializers.ModelSerializer):
    permissions = serializers.StringRelatedField(many=True)

    class Meta:
        model = Role
        fields = ['id', 'name', 'permissions']


#Permissions
class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ['id', 'name']


#Room Memberships
class RoomMembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    room = RoomSerializer()
    role = RoleSerializer()
    custom_permissions = PermissionSerializer(many=True)

    class Meta:
        model = RoomMembership
        fields = ['user', 'room', 'role', 'custom_permissions']


#Vibe Votes
class VibeVoteSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    room = RoomSerializer()

    class Meta:
        model = VibeVote
        fields = ['user', 'room', 'song_id']


#Chat Messages
class ChatMessageSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = ChatMessage
        fields = ['id', 'room', 'user', 'message', 'timestamp']
