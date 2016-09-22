from .base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'expenses',
        'USER': 'expenses',
        'PASSWORD': 'Ahcai9da',
        'HOST': 'db',
        'PORT': '5432',
    }
}