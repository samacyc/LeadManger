
from rest_framework import generics, permissions, viewsets
from .models import Lead
from .serializer import LeadSerializer


class LeadPublicApiView(viewsets.ModelViewSet):

    #queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.lead.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
