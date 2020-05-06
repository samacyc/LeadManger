from rest_framework import serializers

from django.contrib.auth import get_user_model

from django.contrib.auth import authenticate
from knox.models import AuthToken
from django.contrib.auth.hashers import make_password

User = get_user_model()
# User Serializer


class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


# Register Serializer

class RegisterSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    password2 = serializers.CharField(
        write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('id', 'username', 'email', "password", 'token', "password2")

        extra_kwargs = {
            "password": {
                "write_only": True,
                'style': {'input_type': 'password'}
            }
        }

    def validate(self, data):
        pw2 = data.pop('password2')
        pw = data.get('password')
        if (pw != pw2):
            raise serializers.ValidationError('password must Match')
        return data

    def get_token(self, obj):
        return AuthToken.objects.create(obj)[1]

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(
            username=validated_data['username'], email=validated_data['email'],
            password=(validated_data['password']))
        return user

# Login Serializer


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data.get('username'),
                            password=(data.get('password')))
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect Credentiels')
