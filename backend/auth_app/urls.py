from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login_view, name="login_view"),
    
    # Reservaciones
    path("reservaciones/", views.listar_reservaciones, name="listar_reservaciones"),
    path("reservaciones/crear/", views.crear_reservacion, name="crear_reservacion"),
    # path('usuarios/', views.listar_usuarios, name='listar_usuarios'),
    path("prestamos/", views.listar_prestamos, name="listar_prestamos"),
    path("salas/", views.listar_salas, name="listar_salas"),
    path("reservaciones/horarios/", views.listar_horarios, name="listar_horarios"),
    path('crear_acceso/', views.crear_acceso, name='crear_acceso'),
    # Ruta para agregar un nuevo dispositivo al sistema
    path('agregar_dispositivo/', views.agregar_dispositivo, name='agregar_dispositivo'),

    # Ruta para registrar un préstamo de un dispositivo
    path('realizar_prestamo/', views.realizar_prestamo, name='realizar_prestamo'),

    # Ruta para buscar un dispositivo por su número de serie
    path('buscar_dispositivo/<str:numero_serie>/', views.buscar_dispositivo, name='buscar_dispositivo'),

    # Ruta para eliminar un dispositivo por su número de serie
    path('eliminar_dispositivo/<str:numero_serie>/', views.eliminar_dispositivo, name='eliminar_dispositivo'),

    # Ruta para listar todos los dispositivos disponibles
    path('dispositivos/disponibles/', views.dispositivos_disponibles, name='dispositivos_disponibles'),

    # Ruta para listar los dispositivos no disponibles (sin nombre asignado a la ruta)
    path('dispositivos_no_disponibles/', views.dispositivos_no_disponibles),

    # Ruta para registrar la entrega (devolución) de un dispositivo
    path('entregar_dispositivo/<str:numero_serie>/', views.entregar_dispositivo, name='entregar_dispositivo'),
    
    path("usuarios/",               views.listar_usuarios,    name="listar_usuarios"),
    path("usuarios/registrar/",     views.crear_usuario,      name="crear_usuario"),
    path("usuarios/<int:pk>/",      views.usuario_detalle,    name="usuario_detalle"),

    # --- Invitados ---
    path("invitados/registrar/",    views.crear_invitado,     name="crear_invitado"),

    # auth_app/urls.py (sigue dentro de urlpatterns)
    path("usuarios/<int:pk>/eliminar/", views.eliminar_usuario, name="eliminar_usuario"),

    # --- REPORTES ---
    path('reportes/salas/', views.listar_accesos_diarios, name='listar_accesos_diarios'),  
    path("reportes/estadisticas/", views.estadisticas_generales, name="estadisticas_generales"),
    path("reportes/prestamos/", views.listar_prestamos_reporte, name="listar_prestamos_reporte"),

]
#     # Ruta para listar los dispositivos que están en préstamo