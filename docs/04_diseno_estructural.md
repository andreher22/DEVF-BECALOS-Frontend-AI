# 🧱 Diseño Estructural — SGCM

**Proyecto:** Sistema de Gestión de Citas Médicas  
**Versión:** 1.0 | **Fecha:** 2026

---

## 1. Diagrama de Clases UML

Define las clases del dominio, sus atributos, métodos y relaciones (herencia, asociación, composición).

```mermaid
classDiagram
    class Usuario {
        -int id
        -String username
        -String email
        -String contrasenaHash
        -String rol
        -boolean activo
        -DateTime fechaCreacion
        -DateTime ultimoAcceso
        +autenticar(username, contrasena) boolean
        +cambiarContrasena(nueva) void
        +estaActivo() boolean
        +tienePermiso(permiso) boolean
    }

    class Paciente {
        -int id
        -String nombreCompleto
        -String curp
        -Date fechaNacimiento
        -String sexo
        -String telefono
        -String email
        -String direccion
        -String antecedentes
        -DateTime fechaRegistro
        -boolean activo
        +registrar() void
        +actualizar() void
        +desactivar() void
        +obtenerCitas() List~Cita~
        +obtenerHistorial() List~HistorialCita~
    }

    class Medico {
        -int id
        -String nombreCompleto
        -String cedulaProfesional
        -String telefono
        -String email
        -boolean activo
        -DateTime fechaRegistro
        +obtenerAgenda(fecha) List~Cita~
        +obtenerHorarios() List~HorarioMedico~
        +estaDisponible(fecha, hora) boolean
        +registrar() void
        +actualizar() void
    }

    class Especialidad {
        -int id
        -String nombre
        -String descripcion
        -boolean activa
        +obtenerMedicos() List~Medico~
    }

    class HorarioMedico {
        -int id
        -String diaSemana
        -Time horaInicio
        -Time horaFin
        -int duracionCitaMin
        -boolean activo
        +estaEnRango(hora) boolean
        +obtenerSlots(fecha) List~TimeSlot~
    }

    class Cita {
        -int id
        -Date fecha
        -Time horaInicio
        -Time horaFin
        -String motivo
        -String estado
        -String observaciones
        -DateTime fechaCreacion
        -DateTime fechaModificacion
        +agendar() void
        +modificar() void
        +cancelar(motivo) void
        +confirmar() void
        +marcarAtendida() void
        +obtenerHistorial() List~HistorialCita~
        +esModificable() boolean
    }

    class HistorialCita {
        -int id
        -String accion
        -String estadoAnterior
        -String estadoNuevo
        -DateTime fecha
        -String descripcion
        +registrar() void
    }

    class Notificacion {
        -int id
        -String tipo
        -String canal
        -String estado
        -String mensaje
        -DateTime fechaEnvio
        -DateTime fechaLectura
        +enviar() void
        +marcarLeida() void
        +reenviar() void
    }

    class ServicioCitas {
        +agendarCita(datos) Cita
        +modificarCita(citaId, datos) Cita
        +cancelarCita(citaId, motivo) Cita
        +obtenerCitasPorMedico(medicoId, fecha) List~Cita~
        +obtenerCitasPorPaciente(pacienteId) List~Cita~
    }

    class ServicioValidacion {
        +validarDisponibilidad(medicoId, fecha, hora) boolean
        +verificarConflictos(medicoId, fecha, horaInicio, horaFin) boolean
        +obtenerHorariosDisponibles(medicoId, fecha) List~TimeSlot~
    }

    class ServicioNotificaciones {
        +enviarConfirmacion(cita) void
        +enviarRecordatorio(cita) void
        +enviarCancelacion(cita) void
        +enviarModificacion(cita) void
    }

    class ServicioReportes {
        +generarReporteCitas(fechaInicio, fechaFin) Reporte
        +generarReportePacientes() Reporte
        +exportarPDF(reporte) File
        +exportarCSV(reporte) File
    }

    %% Relaciones
    Usuario "1" -- "0..1" Paciente : tiene perfil
    Usuario "1" -- "0..1" Medico : tiene perfil
    Medico "N" --> "1" Especialidad : pertenece a
    Medico "1" --> "*" HorarioMedico : define
    Paciente "1" --> "*" Cita : agenda
    Medico "1" --> "*" Cita : atiende
    Cita "1" --> "*" HistorialCita : registra
    Cita "1" --> "*" Notificacion : genera
    Usuario "1" --> "*" Notificacion : recibe

    %% Servicios
    ServicioCitas ..> Cita : gestiona
    ServicioCitas ..> ServicioValidacion : usa
    ServicioCitas ..> ServicioNotificaciones : invoca
    ServicioValidacion ..> HorarioMedico : consulta
    ServicioValidacion ..> Cita : verifica
    ServicioReportes ..> Cita : consulta
    ServicioReportes ..> Paciente : consulta
```

---

## 2. Diagrama de Componentes UML

Identifica los módulos principales del software y sus dependencias técnicas.

```mermaid
graph TB
    subgraph FRONTEND["🌐 Componente: Frontend React"]
        direction TB
        UI_LOGIN["Módulo de<br/>Autenticación"]
        UI_PACIENTES["Módulo de<br/>Gestión de Pacientes"]
        UI_CITAS["Módulo de<br/>Gestión de Citas"]
        UI_AGENDA["Módulo de<br/>Agenda Médica"]
        UI_REPORTES["Módulo de<br/>Reportes"]
        UI_ADMIN["Módulo de<br/>Administración"]
        UI_NOTIF["Módulo de<br/>Notificaciones"]
        HTTP["Servicio HTTP<br/>(Axios/Fetch)"]
    end

    subgraph APIREST["🔵 Componente: API REST (Django REST Framework)"]
        direction TB
        EP_AUTH["Endpoint:<br/>/api/auth/"]
        EP_PACIENTES["Endpoint:<br/>/api/pacientes/"]
        EP_MEDICOS["Endpoint:<br/>/api/medicos/"]
        EP_CITAS["Endpoint:<br/>/api/citas/"]
        EP_HORARIOS["Endpoint:<br/>/api/horarios/"]
        EP_REPORTES["Endpoint:<br/>/api/reportes/"]
        EP_NOTIF["Endpoint:<br/>/api/notificaciones/"]
        MW["Middleware:<br/>Autenticación JWT<br/>y Permisos"]
    end

    subgraph DOMINIO["🟡 Componente: Servicios de Dominio"]
        direction TB
        SVC_PAC["Servicio:<br/>GestionPacientes"]
        SVC_CIT["Servicio:<br/>GestionCitas"]
        SVC_VAL["Servicio:<br/>ValidacionDisponibilidad"]
        SVC_RPT["Servicio:<br/>GeneracionReportes"]
        SVC_USR["Servicio:<br/>GestionUsuarios"]
    end

    subgraph INFRA["🔴 Componente: Infraestructura"]
        direction TB
        REPO["Repositorios<br/>(Django ORM)"]
        MAIL_SVC["Servicio de<br/>Correo (SMTP)"]
        CACHE_SVC["Caché<br/>(futuro)"]
    end

    subgraph EXTERNO["📧 Componentes Externos"]
        PG["PostgreSQL"]
        SMTP["Servidor SMTP"]
    end

    %% Frontend → API
    HTTP -->|"HTTPS/JSON"| EP_AUTH
    HTTP -->|"HTTPS/JSON"| EP_PACIENTES
    HTTP -->|"HTTPS/JSON"| EP_MEDICOS
    HTTP -->|"HTTPS/JSON"| EP_CITAS
    HTTP -->|"HTTPS/JSON"| EP_HORARIOS
    HTTP -->|"HTTPS/JSON"| EP_REPORTES

    UI_LOGIN --> HTTP
    UI_PACIENTES --> HTTP
    UI_CITAS --> HTTP
    UI_AGENDA --> HTTP
    UI_REPORTES --> HTTP
    UI_ADMIN --> HTTP

    %% API → Dominio
    EP_AUTH --> SVC_USR
    EP_PACIENTES --> SVC_PAC
    EP_CITAS --> SVC_CIT
    EP_CITAS --> SVC_VAL
    EP_HORARIOS --> SVC_VAL
    EP_REPORTES --> SVC_RPT
    MW --> EP_AUTH

    %% Dominio → Infraestructura
    SVC_PAC --> REPO
    SVC_CIT --> REPO
    SVC_CIT --> MAIL_SVC
    SVC_VAL --> REPO
    SVC_RPT --> REPO
    SVC_USR --> REPO

    %% Infraestructura → Externos
    REPO -->|"SQL"| PG
    MAIL_SVC -->|"SMTP"| SMTP

    style FRONTEND fill:#E8F5E9,stroke:#2E7D32,color:#000
    style APIREST fill:#BBDEFB,stroke:#1565C0,color:#000
    style DOMINIO fill:#FFF9C4,stroke:#F9A825,color:#000
    style INFRA fill:#FFCDD2,stroke:#C62828,color:#000
    style EXTERNO fill:#F3E5F5,stroke:#7B1FA2,color:#000
```

---

## 3. Dependencias entre Componentes

| Componente Origen | Componente Destino | Tipo de Dependencia | Protocolo |
|-------------------|--------------------|---------------------|-----------|
| Frontend React | API REST Django | Consumo de servicios | HTTPS / JSON |
| API REST | Servicios de Dominio | Invocación directa | Python |
| Servicios de Dominio | Repositorios (ORM) | Acceso a datos | Django ORM |
| Servicios de Dominio | Servicio de Correo | Envío de notificaciones | SMTP / API |
| Repositorios | PostgreSQL | Persistencia | SQL / TCP |
| Servicio de Correo | Servidor SMTP | Envío de emails | SMTP |
| Middleware JWT | Todos los endpoints | Interceptor de seguridad | Python |

---

## 4. Principios de Diseño Aplicados

| Principio | Aplicación en el SGCM |
|-----------|----------------------|
| **Responsabilidad Única (SRP)** | Cada servicio de dominio gestiona una sola entidad o proceso |
| **Abierto/Cerrado (OCP)** | Nuevos módulos (ej. pagos) se agregan sin modificar los existentes |
| **Inversión de Dependencias (DIP)** | Los servicios dependen de abstracciones (repositorios), no del ORM directamente |
| **Separación de Preocupaciones** | Frontend, API, dominio e infraestructura en capas independientes |
| **Bajo Acoplamiento** | Comunicación entre frontend y backend solo vía API REST |
| **Alta Cohesión** | Cada módulo agrupa funcionalidades relacionadas |
