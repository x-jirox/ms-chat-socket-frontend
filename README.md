# Angular Chat App con WebSockets

Este proyecto es una aplicación de chat en tiempo real desarrollada con Angular, utilizando WebSockets a través de STOMP y SockJS para la comunicación cliente-servidor. Está conectada a una API backend (por ejemplo, Spring Boot) que gestiona los mensajes y las salas de chat.

## Características

- Conexión en tiempo real usando STOMP sobre SockJS.
- Suscripción a canales de chat (`/topic/{roomId}`).
- Envío y recepción de mensajes.
- Renderizado de mensajes con diferenciación por usuario (enviado/recibido).

## Estructura

- **ChatComponent**: Componente principal del chat.
- **ChatService**: Servicio que gestiona la conexión WebSocket y la lógica STOMP.
- **ChatMessage**: Interfaz de datos para representar los mensajes.

## Instalación

1. Clona el repositorio frontend:

   ```bash
   git clone https://github.com/x-jirox/ms-chat-socket-frontend.git
   ```
1. Clona el repositorio backend:

   ```bash
   git clone https://github.com/x-jirox/ms-chat-socket-backend.git
   ```
