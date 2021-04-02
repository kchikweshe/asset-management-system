# from assets.views import CustomAuthToken
from asset_management.views import *
from dj_rest_auth.registration.views import VerifyEmailView
from django.contrib import admin
from django.urls import path, include, re_path


urlpatterns = [
    path('admin/', admin.site.urls),
    path('dj-rest-auth/registration/', CustomRegisterView.as_view()),

    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    re_path(r'^account-confirm-email/', VerifyEmailView.as_view(),
            name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(),
            name='account_confirm_email'),

    path("", include("asset_management.urls")),

]
