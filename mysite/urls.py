# from assets.views import CustomAuthToken
from dj_rest_auth.registration.views import VerifyEmailView
from django.contrib import admin
from django.urls import path, include, re_path

from asset_management.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dj-rest-auth/registration/', CustomRegisterView.as_view()),

    path('dj-rest-auth/login/', CustomLoginView.as_view(), name='rest_login'),

    re_path(r'^account-confirm-email/', VerifyEmailView.as_view(),
            name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(),
            name='account_confirm_email'),

    path("", include("asset_management.urls")),

]
