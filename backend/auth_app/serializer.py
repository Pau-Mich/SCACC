import json
from datetime import date, time
from rest_framework import serializers  # <-- Add this line

from .models import Dispositivo, Prestamo, HuellaDactilar, Usuario, Horario, AccesoDiario, Invitado, Reservacion 
class CustomSerializer:
    def serialize(self, obj):
        raise NotImplementedError("Este método debe ser implementado en subclases")

    def to_json(self, obj):
        return json.dumps(self.serialize(obj), default=str)
#"contrasenia": usuario.contrasenia,
# Serializador para el modelo Usuario
class UsuarioSerializer(CustomSerializer):
    """
    Convierte una instancia de Usuario a un dict JSON.
    - id_usuario: la PK que ahora usas como identificador unívoco.
    - No exponemos 'contrasenia' en GET por seguridad.
    """
    def serialize(self, usuario):
        return {
            "id_usuario": usuario.id_usuario,
            "nombre": usuario.nombre,
            "apellido_paterno": usuario.apellido_paterno,
            "apellido_materno": usuario.apellido_materno,
            "rol": usuario.rol,
            "programa_educativo_area": usuario.programa_educativo_area,
            "telefono": usuario.telefono,
            "correo": usuario.correo,
            # "contrasenia": usuario.contrasenia,
            "semestre": usuario.semestre,
            "estado": usuario.estado,
        }

# Serializador para el modelo Sala
class SalaSerializer(CustomSerializer):
    def serialize(self, sala):
        return {
            "id_sala": sala.id_sala,
            "nombre": sala.nombre,
        }


# Serializador para el modelo Horario
class HorarioSerializer(CustomSerializer):
    def serialize(self, horario):
        return {
            "id_horario": horario.id_horario,
            "hora_inicio": horario.hora_inicio,
            "hora_fin": horario.hora_fin,
        }

class HorarioSerializerTabla(serializers.ModelSerializer):
    class Meta:
        model = Horario
        fields = ['id_horario', 'hora_inicio', 'hora_fin']  # Ajusta según tus campos

# Serializador para el modelo AccesoDiario
class AccesoDiarioSerializer:
    """
    Serializador manual para el modelo AccesoDiario.
    Construye un diccionario que incluya:
      - id_acceso
      - datos del usuario: id, nombre, apellido_paterno, apellido_materno
      - fecha (ISO string)
      - hora (HH:MM:SS)
      - uso_maquina ('SI' o 'NO')
      - sala ('A', 'B', 'C', …)
    """

    def serialize(self, acceso: AccesoDiario) -> dict:
        usuario = acceso.id_usuario
        return {
            "id_acceso": acceso.id_acceso,
            "usuario": {
                "matricula": usuario.id_usuario if usuario else None,
                "nombre": usuario.nombre if usuario else None,
                "apellido_paterno": usuario.apellido_paterno if usuario else None,
                "apellido_materno": usuario.apellido_materno if usuario else None,
            },
            "fecha": acceso.fecha.isoformat(),          # "YYYY-MM-DD"
            "hora": acceso.hora.strftime("%H:%M:%S"),   # "HH:MM:SS"
            "uso_maquina": acceso.uso_maquina,          # "SI" o "NO"
            "sala": acceso.sala,                        # "A", "B" o "C", …
        }
# Serializador para el modelo Invitado
class InvitadoSerializer(CustomSerializer):
    def serialize(self, invitado):
        return {
            "id_invitado":    invitado.id_invitado,
            "nombre":         invitado.nombre,
            "apellido_paterno": invitado.apellido_paterno,
            "apellido_materno": invitado.apellido_materno,
            "correo":         invitado.correo,
            "telefono":       invitado.telefono,
            "hora_entrada":   invitado.hora_entrada,
            "motivo_visita":   invitado.motivo_visita,  # <— coincide también aquí
            "fecha": invitado.fecha,
       }


# Serializador para el modelo Dispositivo
class DispositivoSerializer(serializers.ModelSerializer):
    # Campo personalizado para formatear la fecha de ingreso en formato año-mes-día
    fecha_ingreso = serializers.DateField(format="%Y-%m-%d")
    
    # Campo calculado que obtendrá el estado del dispositivo mediante un método personalizado
    estado = serializers.SerializerMethodField()

    class Meta:
        # Modelo al que se vincula el serializador
        model = Dispositivo
        # Especifica que se deben incluir todos los campos del modelo, además de 'estado'
        fields = '__all__'

    # Método para obtener el estado del dispositivo según su último préstamo
    def get_estado(self, obj):
        # Busca el préstamo más reciente del dispositivo ordenado por hora de inicio descendente
        ultimo_prestamo = Prestamo.objects.filter(id_dispositivo=obj).order_by('-hora_inicio').first()
        if ultimo_prestamo:
            # Si existe un préstamo, retorna su estado
            return ultimo_prestamo.estado
        # Si no hay préstamos, se indica que el dispositivo no tiene préstamos registrados
        return "Sin préstamo"
    
class DispositivoReporteSerializer (serializers.ModelSerializer):

    def serialize(self, dispositivo):
        return {
            "num_serie": dispositivo.numero_serie,
            "num_dispositivo": dispositivo.numero_dispositivo,
            "tipo": dispositivo.tipo,
            "fecha_ingreso": dispositivo.fecha_ingreso,
            "marca": dispositivo.marca,
            "modelo": dispositivo.modelo,
        }
    

# Clase base personalizada para serialización manual (no usa ModelSerializer)
class CustomSerializer:
    # Método que debe ser implementado por cualquier subclase
    def serialize(self, obj):
        raise NotImplementedError("Este método debe ser implementado en subclases")

    # Convierte la salida del método serialize a formato JSON
    def to_json(self, obj):
        return json.dumps(self.serialize(obj), default=str)  # default=str para convertir fechas u objetos no serializables



# Serializador para el modelo Prestamo  
class PrestamoSerializer(CustomSerializer):
    def serialize(self, prestamo):
        return {
            "id_prestamo": prestamo.id_prestamo,
            "usuario": f"{prestamo.id_usuario.nombre} {prestamo.id_usuario.apellido_paterno}",
 # Referencia al ID del usuario que realiza el préstamo
            "dispositivo": prestamo.id_dispositivo.numero_dispositivo,  # Referencia al número del dispositivo prestado
            "estado": prestamo.estado,
            "hora_inicio": prestamo.hora_inicio,
            "hora_fin": prestamo.hora_fin,
            "firma": prestamo.firma,
            "proposito": prestamo.proposito,  # Posible error tipográfico: debería ser `prestamo.proposito`
            "fecha": prestamo.fecha,
        }
        
class PrestamoReporteSerializer:
    """
    Serializador manual para el modelo Prestamo.
    Devuelve un dict con:
      - id_usuario (número de empleado)
      - nombre, apellido_paterno y apellido_materno (del usuario)
      - datos del dispositivo: numero_serie, numero_dispositivo, tipo, marca, modelo
      - fecha del préstamo
      - hora_inicio, hora_fin, proposito
    """

    def serialize(self, prestamo) -> dict:
        usuario = prestamo.id_usuario           # Instancia de Usuario vinculada
        dispositivo = prestamo.id_dispositivo    # Instancia de Dispositivo vinculada

        return {
            # Información del usuario (número de empleado + datos personales)
            "id_usuario": usuario.id_usuario,  
            "nombre": usuario.nombre,
            "apellido_paterno": usuario.apellido_paterno,
            "apellido_materno": usuario.apellido_materno,

            # Información del dispositivo que se prestó
            "numero_serie": dispositivo.numero_serie,
            "numero_dispositivo": dispositivo.numero_dispositivo,
            "tipo": dispositivo.tipo,
            "marca": dispositivo.marca,
            "modelo": dispositivo.modelo,

            # Fechas y horas del préstamo
            "fecha": prestamo.fecha.isoformat(),                # "YYYY-MM-DD"
            "hora_inicio": prestamo.hora_inicio.strftime("%H:%M:%S"),  # "HH:MM:SS"
            # Hora de finalización puede ser null, así que verificamos:
            "hora_fin": prestamo.hora_fin.strftime("%H:%M:%S") if prestamo.hora_fin else None,

            # Propósito del préstamo
            "proposito": prestamo.proposito,
        }
from rest_framework import serializers

class ReservacionSerializer(serializers.ModelSerializer):
    usuario = serializers.SerializerMethodField()
    horario = serializers.SerializerMethodField()

    class Meta:
        model = Reservacion
        fields = '__all__'

    def get_usuario(self, obj):
        usuario = obj.id_usuario
        return {
            "id": usuario.id_usuario if usuario else None,
            "nombre": usuario.nombre if usuario else None,
            "apellido_paterno": usuario.apellido_paterno if usuario else None,
            "apellido_materno": usuario.apellido_materno if usuario else None,
        }

    def get_horario(self, obj):
        horario = obj.id_horario
        return {
            "id_horario": horario.id_horario if horario else None,
            "hora_inicio": horario.hora_inicio.strftime("%H:%M") if horario and horario.hora_inicio else None,
            "hora_fin": horario.hora_fin.strftime("%H:%M") if horario and horario.hora_fin else None,
        }
        
class HuellaDactilarSerializer:
    def serialize(self, huella_obj: HuellaDactilar) -> dict:
        return {
            "id_huella": huella_obj.id_huella,
            "id_usuario": huella_obj.id_usuario.id_usuario,
            "huella": huella_obj.huella,
        }