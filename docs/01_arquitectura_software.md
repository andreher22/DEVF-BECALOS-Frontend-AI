# 🏗️ Documento de Diseño de Arquitectura de Software

**Proyecto:** Sistema de Gestión de Citas Médicas (SGCM — Médico 2.0)  
**Versión:** 1.0 | **Fecha:** 2026  
**Elaborado por:** Equipo de Desarrollo

---

## 1. Introducción

Este documento describe el diseño de la arquitectura de software del SGCM. La arquitectura propuesta es **desacoplada, escalable, mantenible y económicamente viable**, sirviendo como guía técnica para el desarrollo, despliegue y evolución del sistema.

## 2. Contexto General del Sistema

El SGCM es un sistema web independiente que digitaliza el proceso de asignación y control de citas médicas para la Clínica Patito, permitiendo gestionar pacientes, agendas médicas, notificaciones y reportes administrativos.

---

## 3. Diagrama de Contexto del Sistema

Muestra al SGCM como caja negra y sus interacciones con actores y sistemas externos.

```mermaid
C4Context
    title Diagrama de Contexto — SGCM

    Person(paciente, "Paciente", "Agenda, consulta y cancela citas médicas")
    Person(recepcionista, "Recepcionista", "Administra citas y registra pacientes")
    Person(medico, "Médico", "Consulta agenda y datos del paciente")
    Person(admin, "Administrador", "Gestiona usuarios, permisos y reportes")

    System(sgcm, "SGCM", "Sistema de Gestión de Citas Médicas — Aplicación web")

    System_Ext(correo, "Servicio de Correo Electrónico", "Envío de notificaciones automáticas")
    System_Ext(navegador, "Navegador Web", "Chrome, Firefox, Edge, Safari")

    Rel(paciente, sgcm, "Usa", "HTTPS")
    Rel(recepcionista, sgcm, "Usa", "HTTPS")
    Rel(medico, sgcm, "Usa", "HTTPS")
    Rel(admin, sgcm, "Usa", "HTTPS")
    Rel(sgcm, correo, "Envía notificaciones", "SMTP/API")
```

---

## 4. Diagrama de Arquitectura General (Vista de Capas)

Arquitectura en capas desacopladas con API REST. Presenta los grandes bloques del sistema y sus relaciones.

```mermaid
graph TB
    subgraph USUARIOS["👥 Usuarios"]
        PAC["🧑 Pacientes"]
        REC["👩‍💼 Recepcionistas"]
        MED["👨‍⚕️ Médicos"]
        ADM["🔧 Administradores"]
    end

    subgraph NAVEGADOR["🌐 Navegador Web"]
        FE["Frontend Web<br/>React<br/>(Capa de Presentación)"]
    end

    subgraph SERVIDOR["☁️ Servidor de Aplicación"]
        API["Capa de Presentación API<br/>Django REST Framework<br/>Controladores / Vistas API"]
        APP["Capa de Aplicación<br/>Casos de Uso<br/>(Agendar, Cancelar, Validar, Reportar)"]
        DOM["Capa de Dominio<br/>Servicios de Negocio<br/>(Pacientes, Citas, Agenda, Reportes, Usuarios y Roles)"]
        INF["Capa de Infraestructura<br/>Repositorios, ORM<br/>Servicios Externos"]
    end

    subgraph BD["🗄️ Servidor de Base de Datos"]
        PG["PostgreSQL<br/>Base de Datos Relacional"]
    end

    subgraph EXT["📧 Servicios Externos"]
        NOTIF["Servicio de Notificaciones<br/>Correo Electrónico<br/>(SMTP / API)"]
    end

    PAC --> NAVEGADOR
    REC --> NAVEGADOR
    MED --> NAVEGADOR
    ADM --> NAVEGADOR

    FE -->|"API REST<br/>(HTTPS/JSON)"| API
    API --> APP
    APP --> DOM
    DOM --> INF
    INF -->|"ORM / SQL"| PG
    INF -->|"SMTP / API"| NOTIF

    style USUARIOS fill:#E8F0FE,stroke:#4285F4,color:#000
    style NAVEGADOR fill:#E6F4EA,stroke:#34A853,color:#000
    style SERVIDOR fill:#FFF3E0,stroke:#FB8C00,color:#000
    style BD fill:#FCE4EC,stroke:#E91E63,color:#000
    style EXT fill:#F3E5F5,stroke:#9C27B0,color:#000
```

---

## 5. Diagrama de Arquitectura Interna del Backend

Detalla las 4 capas internas del backend Django y sus responsabilidades.

```mermaid
graph TB
    subgraph BACKEND["Backend Django — Arquitectura Interna"]
        direction TB

        subgraph PRES["🔵 Capa de Presentación API"]
            V1["Vistas / Controladores REST"]
            SER["Serializadores"]
            PERM["Permisos y Autenticación"]
        end

        subgraph APPL["🟢 Capa de Aplicación"]
            UC1["Caso de Uso: Registrar Paciente"]
            UC2["Caso de Uso: Agendar Cita"]
            UC3["Caso de Uso: Cancelar Cita"]
            UC4["Caso de Uso: Validar Disponibilidad"]
            UC5["Caso de Uso: Generar Reporte"]
            UC6["Caso de Uso: Enviar Notificación"]
        end

        subgraph DOMI["🟡 Capa de Dominio"]
            E1["Entidad: Paciente"]
            E2["Entidad: Médico"]
            E3["Entidad: Cita"]
            E4["Entidad: Horario"]
            E5["Entidad: Especialidad"]
            E6["Entidad: Notificación"]
            RN["Reglas de Negocio<br/>(Validación de empalmes,<br/>restricciones de horario)"]
        end

        subgraph INFR["🔴 Capa de Infraestructura"]
            REPO["Repositorios / ORM Django"]
            MAIL["Servicio de Correo"]
            CACHE["Caché (futuro)"]
        end
    end

    V1 --> UC1
    V1 --> UC2
    V1 --> UC3
    V1 --> UC4
    V1 --> UC5
    SER --> V1
    PERM --> V1

    UC1 --> E1
    UC2 --> E3
    UC2 --> RN
    UC3 --> E3
    UC4 --> E4
    UC4 --> RN
    UC5 --> E3
    UC6 --> E6

    E1 --> REPO
    E2 --> REPO
    E3 --> REPO
    E4 --> REPO
    E6 --> MAIL

    REPO -->|"SQL"| DB["PostgreSQL"]
    MAIL -->|"SMTP"| CORREO["Servidor de Correo"]

    style PRES fill:#BBDEFB,stroke:#1565C0,color:#000
    style APPL fill:#C8E6C9,stroke:#2E7D32,color:#000
    style DOMI fill:#FFF9C4,stroke:#F9A825,color:#000
    style INFR fill:#FFCDD2,stroke:#C62828,color:#000
```

---

## 6. Flujo de Comunicación entre Capas

```mermaid
sequenceDiagram
    participant U as 👤 Usuario
    participant FE as 🌐 Frontend React
    participant API as 🔵 API REST
    participant APP as 🟢 Capa Aplicación
    participant DOM as 🟡 Capa Dominio
    participant INF as 🔴 Infraestructura
    participant BD as 🗄️ PostgreSQL
    participant MAIL as 📧 Correo

    U->>FE: Interacción (clic, formulario)
    FE->>API: Petición HTTP (JSON)
    API->>API: Autenticar y validar permisos
    API->>APP: Invocar caso de uso
    APP->>DOM: Aplicar reglas de negocio
    DOM->>INF: Acceder a repositorio
    INF->>BD: Consulta SQL
    BD-->>INF: Datos
    INF-->>DOM: Entidades
    DOM-->>APP: Resultado del dominio
    APP->>INF: Enviar notificación (si aplica)
    INF->>MAIL: SMTP / API
    MAIL-->>INF: Confirmación
    APP-->>API: Respuesta del caso de uso
    API-->>FE: Respuesta HTTP (JSON)
    FE-->>U: Actualizar interfaz
```

---

## 7. Estilo Arquitectónico Seleccionado

**Arquitectura en capas desacopladas con API REST**

| Característica | Descripción |
|----------------|-------------|
| **Estilo** | Capas desacopladas + API REST |
| **Frontend** | Single Page Application (React) |
| **Backend** | Django con Django REST Framework |
| **Base de datos** | PostgreSQL |
| **Comunicación** | HTTP/HTTPS con formato JSON |
| **Notificaciones** | Servicio externo vía SMTP/API |
| **Despliegue** | AWS Lightsail |

### Justificación

- **Desacoplamiento:** Frontend y Backend evolucionan independientemente.
- **Escalabilidad:** Permite escalar el backend sin modificar el frontend.
- **Mantenibilidad:** Cambios localizados por capa, sin propagación de impacto.
- **Seguridad:** Autenticación centralizada en el backend.
- **Portabilidad:** Accesible desde cualquier navegador moderno.
- **Evolución:** Base sólida para módulos futuros (historial clínico, pagos en línea).

---

## 8. Tabla de Trazabilidad: Requisitos → Arquitectura

| Requisito | Descripción | Componente Arquitectónico | Módulo | Justificación |
|-----------|-------------|---------------------------|--------|---------------|
| RF-01 | Registrar y administrar pacientes | Backend Django — Servicios de dominio | Módulo Pacientes | Centraliza validaciones e integridad de datos |
| RF-02 | Agendar, modificar y cancelar citas | Backend Django — Servicios de dominio | Módulo Citas | Controla reglas de negocio y evita conflictos |
| RF-03 | Validar disponibilidad de horarios | Backend Django — Servicios de dominio | Módulo Agenda | Valida empalmes y reglas antes de confirmar |
| RF-04 | Enviar notificaciones automáticas | Servicio externo integrado al backend | Módulo Notificaciones | Desacopla envío de mensajes de la lógica principal |
| RF-05 | Generar reportes administrativos | Backend Django — Servicios de dominio | Módulo Reportes | Consultas agregadas y exportación |
| RNF-Rendimiento | ≤ 2 segundos | Arquitectura desacoplada Front–Back | API REST | Reduce carga y optimiza peticiones |
| RNF-Seguridad | Autenticación y control de acceso | Backend + capa de seguridad | Usuarios y Roles | Centraliza autenticación y permisos |
| RNF-Disponibilidad | ≥ 95% | Infraestructura en nube | AWS Lightsail | Reduce caídas, facilita recuperación |
| RNF-Mantenibilidad | Actualizaciones sencillas | Arquitectura por capas | Todos los módulos | Cambios localizados |
| RNF-Portabilidad | Multiplataforma | Frontend desacoplado | React | Compatible con navegadores modernos |

---

## 9. Conclusión

La arquitectura propuesta cumple con los requisitos funcionales y no funcionales del SGCM, aplicando principios de diseño de software que garantizan **escalabilidad, seguridad, mantenibilidad y portabilidad**. El uso de una arquitectura desacoplada con API REST y PostgreSQL proporciona una base técnica sólida para la evolución futura del sistema.
