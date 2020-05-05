
from django.urls import path 

from .api import LeadPublicApiView
from rest_framework import routers

router = routers.DefaultRouter()
router.register( 'api/leads' , LeadPublicApiView , 'leads')
urlpatterns = router.urls