import {
    TeamsActivityHandler,
    TurnContext
} from 'botbuilder';
import { getAIResponse } from '../services/azureOpenAI';

export class TeamsAssistAIBot extends TeamsActivityHandler {
    constructor() {
        super();

        this.onMessage(async (context: TurnContext, next) => {
            const userMessage = context.activity.text.trim();

            if (!userMessage) {
                await context.sendActivity("No he recibido ningún mensaje. ¿Puedes repetir?");
                return;
            }

            try {
                const answer = await getAIResponse(userMessage);
                await context.sendActivity(`${answer}`);
            } catch (error) {
                console.error('Error al llamar a Azure OpenAI:', error);
                await context.sendActivity("Ocurrió un error al procesar tu mensaje con IA.");
            }

            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    await context.sendActivity("Hola, soy tu asistente. Escríbeme cualquier cosa y te responderé.");
                }
            }
            await next();
        });
    }
}
