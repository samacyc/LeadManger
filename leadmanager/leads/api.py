
from rest_framework import generics , permissions , viewsets
from .models import Lead
from .serializer import LeadSerializer


class LeadPublicApiView(viewsets.ModelViewSet) :

    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [permissions.AllowAny] 


