# ⚙️ Diseño de Procesos — SGCM

**Proyecto:** Sistema de Gestión de Citas Médicas  
**Versión:** 1.0 | **Fecha:** 2026

---

## 1. Diagrama de Flujo — Proceso Principal: Agendar Cita

Este diagrama describe la secuencia lógica completa del proceso de agendar una cita médica.

```mermaid
flowchart TD
    INICIO([🔵 Inicio]) --> LOGIN{¿Usuario<br/>autenticado?}
    LOGIN -->|No| REDIRIGIR[Redirigir a<br/>inicio de sesión]
    REDIRIGIR --> LOGIN
    LOGIN -->|Sí| SELECCIONAR_ESP[Seleccionar<br/>especialidad médica]
    SELECCIONAR_ESP --> SELECCIONAR_MED[Seleccionar<br/>médico disponible]
    SELECCIONAR_MED --> SELECCIONAR_FECHA[Seleccionar<br/>fecha deseada]
    SELECCIONAR_FECHA --> CONSULTAR_DISP[Consultar<br/>disponibilidad<br/>del médico]
    CONSULTAR_DISP --> HAY_DISP{¿Hay horarios<br/>disponibles?}
    HAY_DISP -->|No| MSG_NO_DISP[Mostrar mensaje:<br/>No hay disponibilidad]
    MSG_NO_DISP --> SELECCIONAR_FECHA
    HAY_DISP -->|Sí| MOSTRAR_HORARIOS[Mostrar horarios<br/>disponibles]
    MOSTRAR_HORARIOS --> SELECCIONAR_HORA[Seleccionar<br/>horario]
    SELECCIONAR_HORA --> INGRESAR_MOTIVO[Ingresar motivo<br/>de la consulta]
    INGRESAR_MOTIVO --> VALIDAR{¿Datos<br/>completos y<br/>válidos?}
    VALIDAR -->|No| ERROR_VAL[Mostrar errores<br/>de validación]
    ERROR_VAL --> INGRESAR_MOTIVO
    VALIDAR -->|Sí| VERIFICAR_CONFLICTO{¿Existe<br/>conflicto<br/>de horario?}
    VERIFICAR_CONFLICTO -->|Sí| MSG_CONFLICTO[Mostrar mensaje:<br/>Horario ocupado]
    MSG_CONFLICTO --> SELECCIONAR_HORA
    VERIFICAR_CONFLICTO -->|No| REGISTRAR_CITA[Registrar cita<br/>en base de datos]
    REGISTRAR_CITA --> REGISTRAR_HISTORIAL[Registrar en<br/>historial de cita]
    REGISTRAR_HISTORIAL --> ENVIAR_NOTIF[Enviar notificación<br/>de confirmación]
    ENVIAR_NOTIF --> MOSTRAR_CONF[Mostrar confirmación<br/>al usuario]
    MOSTRAR_CONF --> FIN([🔴 Fin])

    style INICIO fill:#4CAF50,color:#fff
    style FIN fill:#F44336,color:#fff
    style REGISTRAR_CITA fill:#2196F3,color:#fff
    style ENVIAR_NOTIF fill:#9C27B0,color:#fff
```

---

## 2. Diagramas de Actividades (UML)

### 2.1 Actividad: Registrar Paciente (RF-01)

```mermaid
flowchart TD
    INICIO([●]) --> ABRIR[Abrir formulario<br/>de registro]
    ABRIR --> CAPTURAR[Capturar datos personales:<br/>nombre, fecha nacimiento,<br/>sexo, teléfono, email,<br/>dirección, antecedentes]
    CAPTURAR --> VALIDAR_DATOS{¿Datos<br/>válidos?}
    VALIDAR_DATOS -->|No| MOSTRAR_ERR[Mostrar errores<br/>de validación]
    MOSTRAR_ERR --> CAPTURAR
    VALIDAR_DATOS -->|Sí| VERIFICAR_DUP{¿Paciente<br/>ya registrado?}
    VERIFICAR_DUP -->|Sí| MSG_DUP[Mostrar mensaje:<br/>Paciente ya existe]
    MSG_DUP --> FIN_ERR([●])
    VERIFICAR_DUP -->|No| CREAR_USUARIO[Crear cuenta de<br/>usuario con rol paciente]
    CREAR_USUARIO --> GUARDAR[Guardar registro<br/>de paciente en BD]
    GUARDAR --> CONFIRMAR[Mostrar confirmación<br/>de registro exitoso]
    CONFIRMAR --> FIN([◉])

    style INICIO fill:#000,color:#fff
    style FIN fill:#000,color:#fff
    style FIN_ERR fill:#000,color:#fff
```

### 2.2 Actividad: Gestionar Citas — Modificar y Cancelar (RF-02)

```mermaid
flowchart TD
    INICIO([●]) --> BUSCAR[Buscar cita existente<br/>por paciente/fecha/médico]
    BUSCAR --> ENCONTRADA{¿Cita<br/>encontrada?}
    ENCONTRADA -->|No| NO_EXISTE[Mostrar: Cita<br/>no encontrada]
    NO_EXISTE --> FIN_ERR([◉])
    ENCONTRADA -->|Sí| MOSTRAR_DET[Mostrar detalles<br/>de la cita]
    MOSTRAR_DET --> ACCION{¿Qué acción<br/>realizar?}

    ACCION -->|Modificar| EDITAR[Editar datos<br/>de la cita]
    EDITAR --> REVALIDAR{¿Nuevo horario<br/>disponible?}
    REVALIDAR -->|No| CONFLICTO[Mostrar:<br/>Conflicto de horario]
    CONFLICTO --> EDITAR
    REVALIDAR -->|Sí| GUARDAR_MOD[Actualizar cita<br/>en base de datos]
    GUARDAR_MOD --> HIST_MOD[Registrar cambio<br/>en historial]
    HIST_MOD --> NOTIF_MOD[Enviar notificación<br/>de modificación]
    NOTIF_MOD --> CONF_MOD[Mostrar confirmación<br/>de modificación]
    CONF_MOD --> FIN([◉])

    ACCION -->|Cancelar| MOTIVO_CANCEL[Solicitar motivo<br/>de cancelación]
    MOTIVO_CANCEL --> CONFIRMAR_CANCEL{¿Confirmar<br/>cancelación?}
    CONFIRMAR_CANCEL -->|No| MOSTRAR_DET
    CONFIRMAR_CANCEL -->|Sí| CANCELAR_BD[Cambiar estado a<br/>cancelada en BD]
    CANCELAR_BD --> HIST_CANCEL[Registrar cancelación<br/>en historial]
    HIST_CANCEL --> NOTIF_CANCEL[Enviar notificación<br/>de cancelación]
    NOTIF_CANCEL --> CONF_CANCEL[Mostrar confirmación<br/>de cancelación]
    CONF_CANCEL --> FIN

    style INICIO fill:#000,color:#fff
    style FIN fill:#000,color:#fff
    style FIN_ERR fill:#000,color:#fff
```

### 2.3 Actividad: Validar Disponibilidad de Horarios (RF-03)

```mermaid
flowchart TD
    INICIO([●]) --> RECIBIR[Recibir solicitud:<br/>médico_id, fecha,<br/>hora_inicio, hora_fin]
    RECIBIR --> BUSCAR_HORARIO[Consultar horarios<br/>del médico para<br/>ese día de la semana]
    BUSCAR_HORARIO --> TIENE_HORARIO{¿El médico atiende<br/>ese día?}
    TIENE_HORARIO -->|No| RESP_NO_DIA["Responder: El médico<br/>no atiende ese día"]
    RESP_NO_DIA --> FIN_RECHAZO([◉])
    TIENE_HORARIO -->|Sí| RANGO_HORARIO{¿La hora solicitada<br/>está dentro del<br/>rango de atención?}
    RANGO_HORARIO -->|No| RESP_FUERA["Responder: Hora fuera<br/>del rango de atención"]
    RESP_FUERA --> FIN_RECHAZO
    RANGO_HORARIO -->|Sí| BUSCAR_CITAS[Consultar citas existentes<br/>del médico en esa<br/>fecha y hora]
    BUSCAR_CITAS --> HAY_EMPALME{¿Existe empalme<br/>con citas existentes?}
    HAY_EMPALME -->|Sí| RESP_OCUPADO["Responder: Horario<br/>ocupado, sugerir<br/>alternativas"]
    RESP_OCUPADO --> FIN_RECHAZO
    HAY_EMPALME -->|No| RESP_OK["Responder: Horario<br/>disponible ✅"]
    RESP_OK --> FIN_OK([◉])

    style INICIO fill:#000,color:#fff
    style FIN_RECHAZO fill:#000,color:#fff
    style FIN_OK fill:#000,color:#fff
    style RESP_OK fill:#4CAF50,color:#fff
```

---

## 3. Diagramas de Secuencia (UML)

### 3.1 Secuencia: Agendar Cita Médica

```mermaid
sequenceDiagram
    actor U as 👤 Recepcionista / Paciente
    participant FE as 🌐 Frontend React
    participant API as 🔵 API REST
    participant SVC as 🟢 Servicio de Citas
    participant VAL as 🟡 Servicio de Validación
    participant BD as 🗄️ PostgreSQL
    participant NOT as 📧 Servicio de Notificaciones

    U->>FE: Seleccionar especialidad, médico y fecha
    FE->>API: GET /api/medicos/{id}/disponibilidad?fecha=YYYY-MM-DD
    API->>VAL: consultarDisponibilidad(medico_id, fecha)
    VAL->>BD: SELECT horarios WHERE medico_id AND dia_semana
    BD-->>VAL: Horarios del médico
    VAL->>BD: SELECT citas WHERE medico_id AND fecha
    BD-->>VAL: Citas existentes
    VAL-->>API: Lista de horarios disponibles
    API-->>FE: JSON con horarios disponibles
    FE-->>U: Mostrar horarios disponibles

    U->>FE: Seleccionar horario e ingresar motivo
    FE->>API: POST /api/citas/
    API->>SVC: crearCita(paciente_id, medico_id, fecha, hora, motivo)
    SVC->>VAL: validarDisponibilidad(medico_id, fecha, hora)
    VAL->>BD: Verificar conflictos
    BD-->>VAL: Sin conflictos ✅
    VAL-->>SVC: Disponible
    SVC->>BD: INSERT INTO cita (...)
    BD-->>SVC: Cita creada (id=123)
    SVC->>BD: INSERT INTO historial_cita (accion='creación')
    BD-->>SVC: Historial registrado
    SVC->>NOT: enviarNotificacion(cita_id, tipo='confirmación')
    NOT->>NOT: Generar mensaje de confirmación
    NOT-->>SVC: Notificación enviada ✅
    SVC-->>API: {cita_id: 123, estado: 'programada'}
    API-->>FE: 201 Created — JSON con datos de la cita
    FE-->>U: Mostrar confirmación de cita agendada
```

### 3.2 Secuencia: Cancelar Cita Médica

```mermaid
sequenceDiagram
    actor U as 👤 Usuario
    participant FE as 🌐 Frontend React
    participant API as 🔵 API REST
    participant SVC as 🟢 Servicio de Citas
    participant BD as 🗄️ PostgreSQL
    participant NOT as 📧 Servicio de Notificaciones

    U->>FE: Seleccionar cita a cancelar
    FE->>API: GET /api/citas/{id}
    API->>BD: SELECT * FROM cita WHERE id = {id}
    BD-->>API: Datos de la cita
    API-->>FE: JSON con detalle de la cita
    FE-->>U: Mostrar detalles de la cita

    U->>FE: Confirmar cancelación con motivo
    FE->>API: PATCH /api/citas/{id}/ {estado: 'cancelada', motivo}
    API->>SVC: cancelarCita(cita_id, motivo, usuario_id)
    SVC->>BD: UPDATE cita SET estado='cancelada'
    BD-->>SVC: Actualizado ✅
    SVC->>BD: INSERT INTO historial_cita (accion='cancelación')
    BD-->>SVC: Historial registrado
    SVC->>NOT: enviarNotificacion(cita_id, tipo='cancelación')
    NOT-->>SVC: Notificación enviada ✅
    SVC-->>API: {estado: 'cancelada'}
    API-->>FE: 200 OK
    FE-->>U: Mostrar confirmación de cancelación
```

### 3.3 Secuencia: Generar Reporte Administrativo

```mermaid
sequenceDiagram
    actor A as 👤 Administrador
    participant FE as 🌐 Frontend React
    participant API as 🔵 API REST
    participant RPT as 📊 Servicio de Reportes
    participant BD as 🗄️ PostgreSQL

    A->>FE: Seleccionar tipo de reporte y rango de fechas
    FE->>API: GET /api/reportes/?tipo=citas&desde=...&hasta=...
    API->>RPT: generarReporte(tipo, fecha_inicio, fecha_fin)
    RPT->>BD: SELECT COUNT(*) FROM cita<br/>GROUP BY estado<br/>WHERE fecha BETWEEN ...
    BD-->>RPT: Datos agregados
    RPT->>BD: SELECT COUNT(DISTINCT paciente_id)<br/>FROM cita WHERE ...
    BD-->>RPT: Pacientes activos
    RPT->>RPT: Calcular estadísticas y totales
    RPT-->>API: Datos del reporte estructurado
    API-->>FE: JSON con datos del reporte
    FE-->>A: Mostrar reporte con gráficas

    A->>FE: Solicitar exportación del reporte
    FE->>API: GET /api/reportes/exportar/?formato=pdf&...
    API->>RPT: exportarReporte(datos, formato='pdf')
    RPT-->>API: Archivo PDF generado
    API-->>FE: Archivo descargable
    FE-->>A: Descargar archivo del reporte
```

---

## 4. Diagrama BPMN — Proceso Completo de Gestión de Cita Médica

Este diagrama modela el proceso de negocio completo de una cita médica, desde la solicitud hasta la atención o cancelación.

```mermaid
flowchart LR
    subgraph PACIENTE["🧑 Paciente"]
        P1([Inicio:<br/>Necesita cita]) --> P2[Ingresar<br/>al sistema]
        P2 --> P3[Seleccionar<br/>especialidad<br/>y médico]
        P3 --> P4[Elegir fecha<br/>y horario]
    end

    subgraph SISTEMA["⚙️ Sistema SGCM"]
        S1{¿Horario<br/>disponible?}
        S2[Registrar cita<br/>en BD]
        S3[Generar registro<br/>en historial]
        S4[Preparar<br/>notificación]
    end

    subgraph NOTIFICACIONES["📧 Servicio de Notificaciones"]
        N1[Enviar confirmación<br/>al paciente]
        N2[Enviar aviso<br/>al médico]
    end

    subgraph MEDICO["👨‍⚕️ Médico"]
        M1[Recibir<br/>notificación]
        M2[Consultar<br/>agenda del día]
        M3[Atender<br/>al paciente]
        M4[Marcar cita<br/>como atendida]
    end

    subgraph RECEPCION["👩‍💼 Recepción"]
        R1[Confirmar<br/>asistencia<br/>del paciente]
    end

    P4 --> S1
    S1 -->|No| P4
    S1 -->|Sí| S2
    S2 --> S3
    S3 --> S4
    S4 --> N1
    S4 --> N2
    N2 --> M1
    N1 --> ESPERA([⏰ Esperar<br/>día de cita])
    ESPERA --> R1
    M1 --> M2
    R1 --> M3
    M2 --> M3
    M3 --> M4
    M4 --> FIN([🔴 Fin:<br/>Cita atendida])

    style PACIENTE fill:#E3F2FD,stroke:#1565C0,color:#000
    style SISTEMA fill:#FFF3E0,stroke:#EF6C00,color:#000
    style NOTIFICACIONES fill:#F3E5F5,stroke:#7B1FA2,color:#000
    style MEDICO fill:#E8F5E9,stroke:#2E7D32,color:#000
    style RECEPCION fill:#FFF8E1,stroke:#F9A825,color:#000
```

---

## 5. Diagrama BPMN — Subproceso: Cancelación de Cita

```mermaid
flowchart LR
    subgraph USUARIO["👤 Usuario (Paciente / Recepcionista)"]
        U1([Inicio:<br/>Solicitar<br/>cancelación]) --> U2[Buscar cita<br/>programada]
        U2 --> U3[Seleccionar<br/>cita a cancelar]
        U3 --> U4[Ingresar motivo<br/>de cancelación]
        U4 --> U5{¿Confirmar<br/>cancelación?}
        U5 -->|No| U6([Fin:<br/>Sin cambios])
    end

    subgraph SISTEMA["⚙️ Sistema SGCM"]
        S1[Cambiar estado<br/>a cancelada]
        S2[Registrar en<br/>historial]
        S3[Liberar horario<br/>del médico]
    end

    subgraph NOTIF["📧 Notificaciones"]
        N1[Notificar cancelación<br/>al paciente]
        N2[Notificar cancelación<br/>al médico]
    end

    U5 -->|Sí| S1
    S1 --> S2
    S2 --> S3
    S3 --> N1
    S3 --> N2
    N1 --> FIN([🔴 Fin:<br/>Cita cancelada])
    N2 --> FIN

    style USUARIO fill:#E3F2FD,stroke:#1565C0,color:#000
    style SISTEMA fill:#FFF3E0,stroke:#EF6C00,color:#000
    style NOTIF fill:#F3E5F5,stroke:#7B1FA2,color:#000
```

---

## 6. Resumen de Trazabilidad: Procesos → Requisitos

| Diagrama | Requisito(s) | Proceso Modelado |
|----------|-------------|------------------|
| Diagrama de Flujo — Agendar Cita | RF-02, RF-03 | Flujo completo de agendamiento |
| Actividad: Registrar Paciente | RF-01 | Alta de nuevo paciente |
| Actividad: Gestionar Citas | RF-02 | Modificación y cancelación |
| Actividad: Validar Disponibilidad | RF-03 | Lógica de validación de empalmes |
| Secuencia: Agendar Cita | RF-02, RF-03, RF-04 | Interacciones entre componentes |
| Secuencia: Cancelar Cita | RF-02, RF-04 | Flujo de cancelación |
| Secuencia: Generar Reporte | RF-05 | Proceso de reportes |
| BPMN: Gestión de Cita | RF-01 a RF-05 | Proceso de negocio completo |
| BPMN: Cancelación | RF-02, RF-04 | Subproceso de cancelación |
