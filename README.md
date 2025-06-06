# teamsBotAI
# Node.js + Azure + Microsoft Teams

---

## 1. Clonar o crear el proyecto

```bash
git clone https://github.com/stemdo-labs/teamsBotAI.git
cd teamsBotAI
```

---

## 2. Instalación de dependencias

```bash
npm install
```

---

## 3. Archivo `.env`

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
MicrosoftAppId=<TU_MICROSOFT_APP_ID>
MicrosoftAppPassword=<TU_APP_PASSWORD>
MicrosoftAppType=SingleTenant
MicrosoftAppTenantId=<TU_TENANT_ID>
AZURE_OPENAI_KEY=<MODEL_API_KEY>
```

Importante:

- No uses comillas.
- No agregues espacios después del `=`.

---

## 4. Ejecutar el bot localmente

```bash
npm start
```

Esto levantará el bot en el puerto 3978. Verás algo como:

```
restify listening to http://[::]:3978
```

---

## 5. Exponer el bot localmente usando ngrok

```bash
ngrok http 3978
```

Resultado esperado:

```
Forwarding    https://xxxxx.ngrok-free.app -> http://localhost:3978
```

---

## 6. Configurar el Azure Bot

1. Ve al portal de Azure: [https://portal.azure.com](https://portal.azure.com/)
2. Abre el recurso de tipo Azure Bot.
3. Ve a la sección "Configuración".
4. En el campo de "Punto de conexión de mensajería", ingresa:

```
https://xxxxx.ngrok-free.app/api/messages
```

---

## 7. Probar con Bot Framework Emulator

1. Abre el Emulator.
2. Haz clic en "Open Bot".
3. En los campos:
    
    - URL del bot: `http://localhost:3978/api/messages`
    - Microsoft App ID: tu App ID de Azure
    - Microsoft App Password: tu secreto de cliente (Client Secret)

---

## 8. Interacción desde Teams

Una vez empaquetado e instalado en Microsoft Teams, puedes hablar con tu bot utilizando comandos como:

```
/preguntar ¿Qué es Azure?
```

---

## 9. Archivos clave del proyecto

- `src/bots/teamsAssistAIBot.ts` → lógica principal del bot
- `src/services/azureOpenAI.ts` → integración con Azure OpenAI
- `.env` → archivo de configuración con credenciales
- `manifest/` → definición de la app para Teams (incluye `manifest.json`, íconos, etc.)

---

## 10. Crear el paquete `.zip` del manifiesto

```bash
cd manifest/
zip -r ../teamsAssistAI.zip *
```

Este `.zip` se puede subir en el [Developer Portal de Teams](https://dev.teams.microsoft.com/).

---

## Recursos útiles

- [Bot Framework Emulator](https://github.com/microsoft/BotFramework-Emulator)
- [Documentación de Azure Bot Service](https://learn.microsoft.com/en-us/azure/bot-service/)
- [Ngrok](https://ngrok.com/docs)
