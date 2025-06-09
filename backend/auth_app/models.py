from django.db import models

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido_paterno = models.CharField(max_length=50)
    apellido_materno = models.CharField(max_length=50)
    rol = models.CharField(max_length=50)
    programa_educativo_area = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    correo = models.EmailField(max_length=100)
    contrasenia = models.CharField(max_length=100)  # Contraseña
    semestre = models.IntegerField(null=True, blank=True)
    estado = models.CharField(max_length=50)
    def __str__(self):
        return f"{self.id_usuario, self.contrasenia}"  # Cambia esto según el campo que quieras mostrar

    class Meta:
        db_table = "usuarios"


# class Sala(models.Model):
#     id_sala = models.AutoField(primary_key=True)
#     nombre = models.CharField(max_length=1)  # CHAR(1) en la BD

#     class Meta:
#         db_table = "salas"

#     def __str__(self):
#         return self.nombre

class Horario(models.Model):
    id_horario = models.AutoField(primary_key=True)
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()

    class Meta:
        db_table = "horarios"

    def __str__(self):
        return f"{self.hora_inicio}-{self.hora_fin}"

class AccesoDiario(models.Model):
    id_acceso = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        db_column='id_usuario_id'
    )
    fecha = models.DateField()
    hora = models.TimeField()
    uso_maquina = models.CharField(max_length=2)  # 'SI' o 'NO'
    sala = models.CharField(max_length=1)         # 'A', 'B' o 'C', etc.

    def _str_(self):
        return f"Acceso {self.id_acceso}: {self.id_usuario} - {self.fecha} {self.hora}"

    class Meta:
        db_table = "accesos_diarios"
class Invitado(models.Model):
    id_invitado = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido_paterno = models.CharField(max_length=50)
    motivo_visita    = models.TextField(db_column='motivo_visita')
    fecha  = models.DateField()
    apellido_materno = models.CharField(max_length=50)
    correo           = models.CharField(max_length=100, null=True, blank=True)  # coincide con tu columna `correo`
    telefono         = models.CharField(max_length=20, null=True, blank=True)   # columna `telefono`
    hora_entrada     = models.TimeField(null=True, blank=True)                # columna `hora_entrada`
    motivo_visita    = models.TextField(null=True, blank=True)               # columna `motivo_visita`

    class Meta:
        db_table = "invitados"

    def __str__(self):
        return self.nombre

class Dispositivo(models.Model):
    numero_serie = models.IntegerField(primary_key=True)  # PK según BD
    numero_dispositivo = models.CharField(max_length=100)
    tipo = models.CharField(max_length=50)  # VARCHAR(50)
    fecha_ingreso = models.DateField(auto_now_add=True)  # Fecha de ingreso al inventario, asignada automáticamente
    marca = models.CharField(max_length=20)
    modelo = models.CharField(max_length=50)

    class Meta:
        db_table = "dispositivos"

    def __str__(self):
        return f"{self.marca} {self.modelo}"

class Prestamo(models.Model):
    id_prestamo = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario_id')
    id_dispositivo = models.ForeignKey(Dispositivo, on_delete=models.CASCADE, db_column='id_dispositivo_id')
    estado = models.CharField(
        max_length=50
    )  # Estado actual del préstamo
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField(null=True, blank=True)
    firma = models.CharField(max_length=45)
    proposito = models.CharField(max_length=100)  # Posible typo: propósito
    fecha = models.DateField()

    class Meta:
        db_table = "prestamos"

    def __str__(self):
        return f"{self.id_usuario} - {self.id_dispositivo} - {self.estado} - {self.fecha}"  

class Reservacion(models.Model):
    id_reservacion = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario_id')
    id_horario = models.ForeignKey(Horario, on_delete=models.CASCADE, db_column='id_horario_id')
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    modalidad = models.CharField(max_length=50)
    materia = models.CharField(max_length=100)
    semestre = models.IntegerField()
    grupo = models.CharField(max_length=50)
    estado = models.CharField(max_length=50)
    sala = models.TextField(max_length=1)

    class Meta:
        db_table = "reservaciones"

    def __str__(self):
        return f"Reserva {self.id_reservacion} - {self.id_usuario}-{self.id_horario}"
    
class HuellaDactilar(models.Model):
    id_huella = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        db_column="id_usuario_id",
        related_name="huellas"
    )
    huella = models.TextField()

    class Meta:
        db_table = "huellas_dactilares"

    def __str__(self):
        return f"Huella {self.id_huella} → Usuario {self.id_usuario.id_usuario}"