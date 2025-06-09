from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt  # Para permitir solicitudes POST sin token CSRF
from django.views.decorators.http import require_http_methods  # Para restringir los métodos HTTP permitidos
import json  # Para trabajar con datos en formato JSON
from .models import Usuario, Reservacion, Horario, Prestamo, AccesoDiario, Dispositivo, HuellaDactilar, Invitado  # Importa los modelos necesarios
from .serializer import UsuarioSerializer, ReservacionSerializer, HorarioSerializer, PrestamoSerializer,PrestamoReporteSerializer, AccesoDiarioSerializer, DispositivoSerializer, InvitadoSerializer  # Importa los serializadores personalizados
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime, date
from rest_framework import status
from django.utils import timezone  # Usa esto si estás trabajando con zonas horarias
from rest_framework.decorators import api_view
from django.db.models import Q, Count
from rest_framework.response import Response
# --- Servicio de Login ---
# CAMBIO: Se reemplaza @csrf_exempt y @require_http_methods(["POST"]) por @api_view(["POST"])
# MOTIVO: api_view maneja métodos permitidos y ya desactiva CSRF en contextos de API (cuando no se usan sesiones)
@api_view(["POST"])
def login(request):
    try:
        # Carga el contenido del cuerpo de la solicitud como un diccionario Python
        data = json.loads(request.body)

        # Extrae las credenciales desde el cuerpo JSON
        id_usuario = data.get("id_usuario")
        contrasenia = data.get("contrasenia")

        # Busca en la base de datos un usuario con esas credenciales
        usuario = Usuario.objects.filter(id_usuario=id_usuario, contrasenia=contrasenia).first()

        # Si el usuario existe, serializa su información y la devuelve
        if usuario:
            serializer = UsuarioSerializer()
            return JsonResponse(serializer.serialize(usuario), status=200)
        else:
            # Credenciales incorrectas
            return JsonResponse({"error": "Credenciales incorrectas"}, status=401)

    except json.JSONDecodeError:
        # Error si el cuerpo no es JSON válido
        return JsonResponse({"error": "JSON inválido"}, status=400)
    except Exception as e:
        # Cualquier otro error interno
        return JsonResponse({"error": str(e)}, status=500)


# --- Servicio: Listar Reservaciones ---
@require_http_methods(["GET"])  # Solo acepta solicitudes HTTP GET
def listar_reservaciones(request):
    try:
        # Recupera todas las reservaciones desde la base de datos
        reservaciones = Reservacion.objects.all()

        # Instancia del serializador
        serializer = ReservacionSerializer()

        # Serializa cada reservación
        data = [serializer.serialize(r) for r in reservaciones]

        # Devuelve la lista en formato JSON
        return JsonResponse(data, safe=False, status=200)
    except Exception as e:
        # En caso de error, lo retorna como mensaje JSON
        return JsonResponse({"error": str(e)}, status=500)


# --- Servicio: Crear Reservación ---
# CAMBIO: Se reemplaza @csrf_exempt y @require_http_methods(["POST"]) por @api_view(["POST"])
@api_view(["POST"])
def crear_reservacion(request):
    try:
        data = json.loads(request.body)

        fecha_inicio_str = data.get("fecha_inicio")
        fecha_fin_str = data.get("fecha_fin")

        # Validar formato y convertir fechas
        try:
            fecha_inicio = datetime.strptime(fecha_inicio_str, "%Y-%m-%d").date()
            fecha_fin = datetime.strptime(fecha_fin_str, "%Y-%m-%d").date()
        except ValueError:
            return JsonResponse({"error": "Formato de fecha inválido. Use AAAA-MM-DD."}, status=400)

        # Validar que ninguna fecha sea domingo (weekday() == 6 es domingo en Python)
        if fecha_inicio.weekday() == 6 or fecha_fin.weekday() == 6:
            return JsonResponse({"error": "No se permiten reservaciones los domingos."}, status=400)

        # Crear reservación
        nueva_reserva = Reservacion.objects.create(
            id_usuario_id=data.get("id_usuario"),
            id_horario_id=data.get("id_horario"),
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            modalidad=data.get("modalidad"),
            materia=data.get("materia"),
            semestre=data.get("semestre"),
            grupo=data.get("grupo"),
            estado=data.get("estado"),
            sala=data.get("sala"),
        )
        nueva_reserva.refresh_from_db()

        serializer = ReservacionSerializer()
        return JsonResponse(serializer.serialize(nueva_reserva), status=201)

    except ObjectDoesNotExist as e:
        return JsonResponse({"error": f"Usuario o horario inválido: {e}"}, status=400)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

# --- Servicio: Listar Horarios ---
@require_http_methods(['GET'])
def listar_horarios(request):
    try:
        horarios = Horario.objects.all()
        serializer = HorarioSerializer()
        data = [serializer.serialize(horario) for horario in horarios]
        return JsonResponse(data, safe=False) # safe=False permite devolver una lista
    except Exception as e:
        print(f"Error al obtener horarios: {e}")
        return JsonResponse({"error": "Error interno del servidor"}, status=500)
    
@require_http_methods(['GET'])
def listar_prestamos(request):
    try:
        prestamos = Prestamo.objects.all()
        ahora = timezone.now()

        for p in prestamos:
            if not p.estado:
                p.estado = "Desconocido"

            if p.estado.lower() == 'vigente' and p.hora_fin and p.fecha:
                dt_fin = datetime.combine(p.fecha, p.hora_fin)
                dt_fin = timezone.make_aware(dt_fin, timezone.get_current_timezone())

                if ahora > dt_fin:
                    p.estado = 'Atrasado'
                    p.save()

        serializer = PrestamoSerializer()
        data = [serializer.serialize(prestamo) for prestamo in prestamos]

        return JsonResponse(data, safe=False)

    except Exception as e:
        print(f"Error al obtener préstamos: {e}")
        return JsonResponse({"error": "Error interno del servidor"}, status=500)

# --- Servicio: Listar Salas Activas ---
@require_http_methods(['GET'])
def listar_salas(request):
    try:
        today = timezone.localdate()  # Usa localdate para evitar problemas con zona horaria

        # Filtrar reservaciones activas cuyo rango de fechas incluya hoy
        reservaciones = Reservacion.objects.filter(
            fecha_inicio__lte=today,
            fecha_fin__gte=today,
            estado="activa"
        )

        serializer = ReservacionSerializer()
        data = [serializer.serialize(r) for r in reservaciones]

        return JsonResponse(data, safe=False)

    except Exception as e:
        print(f"Error al obtener salas: {e}")
        return JsonResponse({"error": "Error interno del servidor"}, status=500)
    

# --- Servicio: Crear Acceso Diario ---
# CAMBIO: Se reemplaza @csrf_exempt y @require_http_methods(["POST"]) por @api_view(["POST"])
@api_view(["POST"])
def crear_acceso(request):
    try:
        data = json.loads(request.body)

        usuario = Usuario.objects.get(pk=data["matricula"])  # pk = id_usuario

        nuevo_acceso = AccesoDiario.objects.create(
            id_usuario_id=usuario.id_usuario,
            # id_invitado=None,  # Por ahora dejamos el invitado en None
            fecha=date.today(),
            hora=datetime.now().time(),
            uso_maquina=data.get("uso_maquina"),
            sala=data.get("sala"),
        )
        nuevo_acceso.refresh_from_db()

        serializer = AccesoDiarioSerializer()
        return JsonResponse(serializer.serialize(nuevo_acceso), status=201)

    except ObjectDoesNotExist as e:
        return JsonResponse({"error": f"Usuario no válido: {str(e)}"}, status=400)

    except Exception as e:
        return JsonResponse({"error": f"Error inesperado: {str(e)}"}, status=500)


"""
    Registra un nuevo préstamo de un dispositivo a un usuario.

    Método: POST
    Datos esperados en JSON:
        - numero_empleado (ID del usuario)
        - numero_serie (ID del dispositivo)
        - hora_inicio (hora de inicio del préstamo)
        - hora_fin (opcional)
        - motivo (opcional)

    Retorna:
        - Mensaje de éxito y detalles del préstamo creado, o mensaje de error.
"""
# CAMBIO: Se reemplaza @csrf_exempt por @api_view(["POST"])
# El control de método ya se maneja dentro con `if request.method == 'POST'`
@api_view(["POST"])
def realizar_prestamo(request):
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            id_usuario = data.get('numero_empleado')
            id_dispositivo = data.get('numero_serie')
            hora_inicio = data.get('hora_inicio')
            hora_fin = data.get('hora_fin', '')
            proposito = data.get('motivo', '')
            fecha = datetime.now()

            if not (id_usuario and id_dispositivo and hora_inicio):
                return Response({'error': 'Faltan campos obligatorios.'}, status=400)

            try:
                usuario = Usuario.objects.get(id_usuario=id_usuario)
            except Usuario.DoesNotExist:
                return Response({'error': 'Usuario no encontrado.'}, status=404)

            try:
                dispositivo = Dispositivo.objects.get(numero_serie=id_dispositivo)
            except Dispositivo.DoesNotExist:
                return Response({'error': 'Dispositivo no encontrado.'}, status=404)

            nuevo_prestamo = Prestamo.objects.create(
                id_usuario=usuario,
                id_dispositivo=dispositivo,  # ✅ Aquí va la instancia
                estado='Vigente',
                hora_inicio=hora_inicio,
                hora_fin=hora_fin,
                firma="",
                proposito=proposito,
                fecha=fecha
            )

            serializer = PrestamoSerializer()
            return Response({
                'mensaje': 'Préstamo registrado correctamente.',
                'prestamo': serializer.serialize(nuevo_prestamo)
            }, status=201)

        except Exception as e:
            print("Error al registrar préstamo:", e)
            return Response({'error': str(e)}, status=500)

    return Response({'error': 'Método no permitido.'}, status=405)


"""
    Obtiene la lista de dispositivos que actualmente no están disponibles
    porque tienen préstamos con estado 'Activo' o 'Atrasado'.

    Antes de mostrar la lista, actualiza los préstamos cuyo tiempo ha finalizado.

    Retorna:
        - Lista de dispositivos con su estado de préstamo actual.
    """
@api_view(['GET'])
def dispositivos_no_disponibles(request):
    from datetime import datetime

    # Actualizar estados atrasados
    prestamos_activos = Prestamo.objects.filter(estado="Activo")
    ahora = datetime.now().time()
    for prestamo in prestamos_activos:
        if prestamo.hora_fin and prestamo.hora_fin < ahora:
            prestamo.estado = "Atrasado"
            prestamo.save()

    dispositivos_no_disponibles = Dispositivo.objects.filter(
        prestamo__estado__in=['Vigente', 'Atrasado']
    ).distinct()

    dispositivos_data = []
    for dispositivo in dispositivos_no_disponibles:
        # Obtener el último préstamo activo o atrasado
        prestamo = Prestamo.objects.filter(
            id_dispositivo=dispositivo,
            estado__in=["Vigente", "Atrasado"]
        ).order_by('-id_prestamo').first()

        data = DispositivoSerializer(dispositivo).data
        data["id_prestamo"] = prestamo.id_prestamo if prestamo else None
        data["estado"] = prestamo.estado if prestamo else "Desconocido"
        dispositivos_data.append(data)

    return Response(dispositivos_data)


"""
    Marca como 'Devuelto' el último préstamo activo de un dispositivo.

    Parámetros:
        - numero_serie: cadena con el número de serie del dispositivo.

    Retorna:
        - Mensaje de confirmación o error si el dispositivo o el préstamo no existen.
    """
@api_view(['PUT'])
def entregar_dispositivo(request, numero_serie):
    try:
        dispositivo = Dispositivo.objects.get(numero_serie=numero_serie)
        prestamo = Prestamo.objects.filter(id_dispositivo=dispositivo).latest('hora_inicio')

        # Aquí simplemente marcas como "Devuelto"
        prestamo.estado = "Devuelto"
        prestamo.save()

        return Response({"mensaje": f"Dispositivo entregado. Estado préstamo: {prestamo.estado}"})

    except Dispositivo.DoesNotExist:
        return Response({"error": "Dispositivo no encontrado."}, status=404)
    except Prestamo.DoesNotExist:
        return Response({"error": "No se encontró el préstamo asociado."}, status=404)
 
"""
    Registra un nuevo dispositivo en el sistema.

    Método: POST
    Datos esperados en JSON:
        - numero_dispositivo
        - numero_serie
        - tipo
        - marca (opcional)
        - modelo (opcional)

    Retorna:
        - Mensaje de éxito con los datos del dispositivo, o error si ya existe.
    """
# CAMBIO: Se reemplaza @csrf_exempt por @api_view(["POST"])
@api_view(["POST"])
def agregar_dispositivo(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            numero_dispositivo = data.get('numero_dispositivo')
            numero_serie = data.get('numero_serie')
            tipo = data.get('tipo')
            marca = data.get('marca', '')
            modelo = data.get('modelo', '')
            fecha_ingreso = datetime.now()  # 👈 Usamos datetime completo, no .date()

            # Verificar campos obligatorios
            if not (numero_dispositivo and numero_serie and tipo):
                return Response({'error': 'Faltan campos obligatorios.'}, status=400)

            # Verificar que el dispositivo no exista ya
            if Dispositivo.objects.filter(numero_serie=numero_serie).exists():
                return Response({'error': 'El número de serie ya existe.'}, status=400)

            # Crear y guardar nuevo dispositivo
            nuevo_dispositivo = Dispositivo.objects.create(
                numero_dispositivo=numero_dispositivo,
                numero_serie=numero_serie,
                tipo=tipo,
                marca=marca,
                modelo=modelo,
                fecha_ingreso=fecha_ingreso
            )

            # Serializar y devolver el objeto creado
            serializer = DispositivoSerializer(nuevo_dispositivo)
            return Response({
                'mensaje': 'Dispositivo agregado correctamente.',
                'dispositivo': serializer.data
            }, status=201)

        except Exception as e:
            print("Error al agregar dispositivo:", e)
            return Response({'error': str(e)}, status=500)

    return Response({'error': 'Método no permitido.'}, status=405)




"""
    Busca un dispositivo en la base de datos por su número de serie.

    Parámetros:
        - numero_serie: cadena con el número de serie del dispositivo.

    Retorna:
        - Objeto del dispositivo encontrado o mensaje de error si no existe.
    """
@api_view(['GET'])
def buscar_dispositivo(request, numero_serie):
    try: 
        dispositivo = Dispositivo.objects.filter(numero_serie=numero_serie).first()
        if not dispositivo:
            return Response({'error': 'Dispositivo no encontrado.'}, status=404)

        serializer = DispositivoSerializer(dispositivo)
        return  Response({'dispositivo': serializer.data})
    except Exception as e:
        print("ERROR en buscar_dispositivo:", e)
        return  Response({'error': f'Error al buscar el dispositivo: {str(e)}'}, status=500)



"""
    Elimina un dispositivo si no tiene préstamos activos o atrasados.

    Parámetros:
        - numero_serie: cadena con el número de serie del dispositivo.

    Retorna:
        - Mensaje de éxito o error si el dispositivo está en préstamo o no existe.
    """
# CAMBIO: Se reemplaza @csrf_exempt y @require_http_methods(["DELETE"]) por @api_view(["DELETE"])
@api_view(["DELETE"])
def eliminar_dispositivo(request, numero_serie):
    try:
        # Buscar el dispositivo por su número de serie (clave primaria)
        dispositivo = Dispositivo.objects.filter(numero_serie=numero_serie).first()
        if not dispositivo:
            return Response({'error': 'Dispositivo no encontrado.'}, status=404)

        # Verificar si hay préstamos que no estén devueltos
        prestamo_activo = Prestamo.objects.filter(
            id_dispositivo=dispositivo,
            estado__in=["Vigente", "Atrasado"]  # Evita eliminar si no está devuelto
        ).exists()

        if prestamo_activo:
            return Response({
                'error': 'No se puede eliminar el dispositivo porque está en préstamo.'
            }, status=400)

        # Eliminar el dispositivo
        dispositivo.delete()
        return Response({'mensaje': 'Dispositivo eliminado correctamente.'}, status=200)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({'error': f'Error al eliminar el dispositivo: {str(e)}'}, status=500)


    
    

"""
    Retorna una lista de dispositivos disponibles (no tienen préstamos activos o atrasados).

    Retorna:
        - Lista de dispositivos que se pueden prestar.
    """
@api_view(['GET'])
def dispositivos_disponibles(request):
    # Obtener los números de serie de dispositivos con préstamos activos o atrasados
    prestados_ids = Prestamo.objects.filter(
        Q(estado="Vigente") | Q(estado="Atrasado")
    ).values_list('id_dispositivo__numero_serie', flat=True)

    # Filtrar los dispositivos que NO están en esa lista
    disponibles = Dispositivo.objects.exclude(numero_serie__in=prestados_ids)

    serializer = DispositivoSerializer(disponibles, many=True)
    return Response(serializer.data)

# Ventajas del cambio
# Seguridad: @api_view maneja CSRF apropiadamente según el tipo de autenticación usada.

# Claridad: No necesitas usar múltiples decoradores (@csrf_exempt, @require_http_methods) para una vista API.

# Compatibilidad con DRF: Al usar @api_view, request.data está disponible directamente si quieres mejorar luego tu manejo de datos.

@csrf_exempt
@require_http_methods(["POST"])
def crear_usuario(request):
    try:
        data = json.loads(request.body)

        # Creamos solo el Usuario, sin tocar HuellaDactilar
        usuario = Usuario.objects.create(
            id_usuario            = data["id_usuario"],                # matrícula / número de empleado
            nombre                = data["nombre"],
            apellido_paterno      = data["apellido_paterno"],
            apellido_materno      = data["apellido_materno"],
            rol                   = data["rol"],
            programa_educativo_area = data.get("programa_educativo_area", ""),
            telefono              = data.get("telefono", ""),
            correo                = data.get("correo", ""),
            contrasenia           = data.get("contrasenia", ""),
            semestre              = data.get("semestre"),              # podrá ser None si no aplica
            estado                = data.get("estado", "Activo"),
        )

        # Devolvemos al cliente la representación JSON del nuevo usuario
        return JsonResponse(UsuarioSerializer().serialize(usuario), status=201)

    except json.JSONDecodeError:
        return JsonResponse({"error": "JSON inválido"}, status=400)

    except Exception as e:
        # Para depuración en consola
        # traceback.print_exc()
        return JsonResponse({"error": str(e)}, status=500)


# --- Listar Todos ---
@require_http_methods(["GET"])
def listar_usuarios(request):
    usuarios = Usuario.objects.all()
    data = [UsuarioSerializer().serialize(u) for u in usuarios]
    return JsonResponse(data, safe=False, status=200)

# ————————————————— Obtener y Actualizar —————————————————
@csrf_exempt
@require_http_methods(["GET", "PUT"])
def usuario_detalle(request, pk):
    try:
        usuario = Usuario.objects.filter(id_usuario=pk).first()
        if not usuario:
            return JsonResponse({"error": "No encontrado"}, status=404)

        if request.method == "GET":
            return JsonResponse(UsuarioSerializer().serialize(usuario), status=200)

        # PUT: actualizar sólo los campos que vienen en el JSON
        data = json.loads(request.body)
        for field in [
            "nombre", "apellido_paterno", "apellido_materno",
            "rol", "programa_educativo_area", "telefono",
            "correo", "contrasenia", "semestre", "estado"
        ]:
            if field in data:
                setattr(usuario, field, data[field])
        usuario.save()
        return JsonResponse(UsuarioSerializer().serialize(usuario), status=200)

    except json.JSONDecodeError:
        return JsonResponse({"error": "JSON inválido"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
@require_http_methods(["DELETE"])
def eliminar_usuario(request, pk):
    try:
        usuario = Usuario.objects.filter(id_usuario=pk).first()
        if not usuario:
            return JsonResponse({"error": "No encontrado"}, status=404)

        # 1) Borrar primero las huellas
        HuellaDactilar.objects.filter(id_usuario=usuario).delete()

        # 2) Ahora sí borramos el usuario
        usuario.delete()
        return JsonResponse({"deleted": pk}, status=204)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

# --- Servicio Crear Invitado ---
@csrf_exempt
@require_http_methods(["POST"])
def crear_invitado(request):
    try:
        data = json.loads(request.body)
        inv = Invitado.objects.create(
            nombre           = data["nombre"],
            apellido_paterno = data["apellido_paterno"],
            apellido_materno = data["apellido_materno"],
            correo           = data["correo"],
            telefono         = data["telefono"],
            hora_entrada     = data["hora_entrada"],
            motivo_visita    = data["motivo_visita"],    # <— coincide con el modelo
            fecha            = data.get("fecha", date.today()),
        )
        return JsonResponse(InvitadoSerializer().serialize(inv), status=201)
    except Exception as e:
        # traceback.print_exc()
        return JsonResponse({"error": str(e)}, status=500)
# --- Servicio: Tabla de Uso de salas ---
@require_http_methods(["GET"])
def listar_accesos_diarios(request):
    """
    Lista los registros de AccesoDiario, opcionalmente filtrados
    por rango de fechas (fecha_inicio, fecha_fin).
    Parámetros GET permitidos:
      - fecha_inicio: "YYYY-MM-DD" (inclusive)
      - fecha_fin:    "YYYY-MM-DD" (inclusive)
    Si no se pasan fechas, devuelve todos los accesos.
    """
    try:
        # 1. Leer parámetros de query string
        fecha_inicio = request.GET.get("fecha_inicio", None)
        fecha_fin = request.GET.get("fecha_fin", None)

        # 2. Construir el queryset
        accesos_qs = AccesoDiario.objects.all()
        print("AccesoDiario importado desde:", AccesoDiario.__module__)
        print("Campos del modelo:", [f.name for f in AccesoDiario._meta.fields])
        # 3. Si se especifica fecha_inicio, filtrar desde esa fecha
        if fecha_inicio:
            accesos_qs = accesos_qs.filter(fecha__gte=fecha_inicio)

        # 4. Si se especifica fecha_fin, filtrar hasta esa fecha
        if fecha_fin:
            accesos_qs = accesos_qs.filter(fecha__lte=fecha_fin)

        # 5. Ordenamos por fecha ascendente y hora ascendente (opcional)
        accesos_qs = accesos_qs.order_by("fecha", "hora")
        

        # 6. Serializar cada objeto
        serializer = AccesoDiarioSerializer()
        data = [serializer.serialize(acceso) for acceso in accesos_qs]

        # 7. Devolver JSON con la lista de accesos
        return JsonResponse(data, safe=False, status=200)

    except Exception as e:
        # En caso de error imprevisto, devolvemos un mensaje y logueamos
        print(f"Error en listar_accesos_diarios: {e}")
        return JsonResponse({"error": str(e)}, status=500)

# --- Servicio: Generar estadisticas ---
@require_http_methods(["GET"])
def estadisticas_generales(request):
    """
    Devuelve un JSON con las siguientes estadísticas, filtradas por rango de fechas (si vienen en GET):
      - sala_mas_ocupada: la sala con más AccesoDiario en el rango.
      - tipo_dispositivo_mas_usado: el tipo de dispositivo más prestado en el rango.
      - veces_uso_equipo: conteo de AccesoDiario con uso_maquina="SI" en el rango.
      - carrera_mas_ingresa: la carrera (programa_educativo_area) con más AccesoDiario en el rango.
      - cantidad_invitados: conteo de Invitado en el rango.
    Parámetros GET:
      - fecha_inicio: "YYYY-MM-DD" (inclusive)
      - fecha_fin:    "YYYY-MM-DD" (inclusive)
    """

    # 1. Leer parámetros de query string
    fecha_inicio = request.GET.get("fecha_inicio", None)
    fecha_fin = request.GET.get("fecha_fin", None)

    # Construir filtros de fecha (Q objects)
    filtro_fecha = Q()
    if fecha_inicio:
        filtro_fecha &= Q(fecha__gte=fecha_inicio)
    if fecha_fin:
        filtro_fecha &= Q(fecha__lte=fecha_fin)

    # 2. Sala más ocupada (solo AccesoDiario dentro del rango de fecha)
    sala_qs = (
        AccesoDiario.objects
        .filter(filtro_fecha)  # aplicamos el rango aquí
        .values("sala")
        .annotate(total=Count("sala"))
        .order_by("-total")
    )
    sala_mas_ocupada = sala_qs[0]["sala"] if sala_qs else None

    # 3. Tipo de dispositivo más usado (Prestamo join Dispositivo) dentro del rango de fecha de préstamo
    tipo_qs = (
        Prestamo.objects
        .filter(filtro_fecha)  # filtramos por Prestamo.fecha usando el mismo filtro
        .values("id_dispositivo__tipo")
        .annotate(total=Count("id_dispositivo__tipo"))
        .order_by("-total")
    )
    tipo_dispositivo_mas_usado = tipo_qs[0]["id_dispositivo__tipo"] if tipo_qs else None

    # 4. Veces que un alumno usó un equipo (AccesoDiario.uso_maquina="SI", dentro del rango)
    veces_uso_equipo = (
        AccesoDiario.objects
        .filter(filtro_fecha, uso_maquina__iexact="SI")
        .count()
    )

    # 5. Carrera que más ingresa (programa_educativo_area de Usuario) dentro del rango
    carrera_qs = (
        AccesoDiario.objects
        .filter(filtro_fecha)
        .values("id_usuario__programa_educativo_area")
        .annotate(total=Count("id_usuario__programa_educativo_area"))
        .order_by("-total")
    )
    carrera_mas_ingresa = carrera_qs[0]["id_usuario__programa_educativo_area"] if carrera_qs else None

    # 6. Cantidad de invitados que ingresaron (Invitado.fecha dentro del rango)
    invitados_qs = Invitado.objects.filter(
        Q(fecha__gte=fecha_inicio) if fecha_inicio else Q(),
        Q(fecha__lte=fecha_fin) if fecha_fin else Q()
    )
    cantidad_invitados = invitados_qs.count()

    # 7. Construir el JSON de respuesta
    data = {
        "sala_mas_ocupada": sala_mas_ocupada,
        "tipo_dispositivo_mas_usado": tipo_dispositivo_mas_usado,
        "veces_uso_equipo": veces_uso_equipo,
        "carrera_mas_ingresa": carrera_mas_ingresa,
        "cantidad_invitados": cantidad_invitados,
    }

    return JsonResponse(data, status=200)

# --- Servicio: Generar estadisticas ---
@require_http_methods(["GET"])
def listar_prestamos_reporte(request):
    """
    Devuelve un JSON con todas las solicitudes de préstamo filtradas por:
      - fecha_inicio (inclusive)
      - fecha_fin    (inclusive)
      - id_usuario   (número de empleado)
    Parámetros GET permitidos:
      - fecha_inicio: "YYYY-MM-DD"
      - fecha_fin:    "YYYY-MM-DD"
      - id_usuario:   número de empleado (int)
    Si algún parámetro falta, se ignora ese filtro.
    """
    try:
        # 1) Leemos los parámetros de query string
        fecha_inicio = request.GET.get("fecha_inicio", None)
        fecha_fin = request.GET.get("fecha_fin", None)
        id_usuario = request.GET.get("id_usuario", None)

        # 2) Partimos de todos los préstamos
        prestamos_qs = Prestamo.objects.all()

        # 3) Si se dio fecha_inicio, filtramos todos los préstamos con fecha >= fecha_inicio
        if fecha_inicio:
            prestamos_qs = prestamos_qs.filter(fecha__gte=fecha_inicio)

        # 4) Si se dio fecha_fin, filtramos todos los préstamos con fecha <= fecha_fin
        if fecha_fin:
            prestamos_qs = prestamos_qs.filter(fecha__lte=fecha_fin)

        # 5) Si se dio id_usuario, filtramos todos los préstamos cuyo FK id_usuario coincida
        if id_usuario:
            prestamos_qs = prestamos_qs.filter(id_usuario_id=id_usuario)

        # 6) Orden opcional: por fecha ascendente, hora_inicio ascendente
        prestamos_qs = prestamos_qs.order_by("fecha", "hora_inicio")

        # 7) Serializamos cada préstamo
        serializer = PrestamoReporteSerializer()
        data = [serializer.serialize(p) for p in prestamos_qs]

        # 8) Devolvemos JSON con la lista de prestamos
        return JsonResponse(data, safe=False, status=200)

    except Exception as e:
        # En caso de algún error imprevisto, devolvemos un mensaje y el stack trace al log
        print(f"Error en listar_prestamos: {e}")
        return JsonResponse({"error": str(e)}, status=500)