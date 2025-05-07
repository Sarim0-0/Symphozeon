from django.urls import path
from . import views

urlpatterns = [
    # User
    path('users/', views.UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetailView.as_view(), name='user-detail'),
    path('users/create/', views.UserCreateView.as_view(), name='user-create'),

    # Genre
    path('genres/', views.GenreListView.as_view(), name='genre-list'),
    path('genres/<int:pk>/', views.GenreDetailView.as_view(), name='genre-detail'),
    path('genres/create/', views.GenreCreateView.as_view(), name='genre-create'),

    # Room
    path('rooms/', views.RoomListView.as_view(), name='room-list'),
    path('rooms/<int:pk>/', views.RoomDetailView.as_view(), name='room-detail'),
    path('rooms/create/', views.RoomCreateView.as_view(), name='room-create'),

    # Role
    path('roles/', views.RoleListView.as_view(), name='role-list'),
    path('roles/<int:pk>/', views.RoleDetailView.as_view(), name='role-detail'),
    path('roles/create/', views.RoleCreateView.as_view(), name='role-create'),

    # Permission
    path('permissions/', views.PermissionListView.as_view(), name='permission-list'),
    path('permissions/<int:pk>/', views.PermissionDetailView.as_view(), name='permission-detail'),
    path('permissions/create/', views.PermissionCreateView.as_view(), name='permission-create'),

    # RoomMembership
    path('room-memberships/', views.RoomMembershipListView.as_view(), name='room-membership-list'),
    path('room-memberships/<int:pk>/', views.RoomMembershipDetailView.as_view(), name='room-membership-detail'),
    path('room-memberships/create/', views.RoomMembershipCreateView.as_view(), name='room-membership-create'),

    # VibeVote
    path('vibe-votes/', views.VibeVoteListView.as_view(), name='vibe-vote-list'),
    path('vibe-votes/<int:pk>/', views.VibeVoteDetailView.as_view(), name='vibe-vote-detail'),
    path('vibe-votes/create/', views.VibeVoteCreateView.as_view(), name='vibe-vote-create'),

    # ChatMessage
    path('chat-messages/', views.ChatMessageListView.as_view(), name='chat-message-list'),
    path('chat-messages/<int:pk>/', views.ChatMessageDetailView.as_view(), name='chat-message-detail'),
    path('chat-messages/create/', views.ChatMessageCreateView.as_view(), name='chat-message-create'),
]
