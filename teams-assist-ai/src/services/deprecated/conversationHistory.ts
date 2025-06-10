// src/services/conversationHistory.ts

const conversations: Record<string, { role: string; content: string }[]> = {};

export function addMessage(userId: string, role: 'user' | 'assistant' | 'system', content: string) {
    if (!conversations[userId]) {
        conversations[userId] = [{ role: 'system', content: 'Eres un asistente útil.' }];
    }
    conversations[userId].push({ role, content });

    // Opcional: limitar el historial a las últimas 10 entradas
    if (conversations[userId].length > 20) {
        conversations[userId] = conversations[userId].slice(-20);
    }
}

export function getConversation(userId: string) {
    return conversations[userId] || [{ role: 'system', content: 'Eres un asistente útil.' }];
}
