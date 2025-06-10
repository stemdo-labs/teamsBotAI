
type Message = { role: 'user' | 'assistant' | 'system'; content: string };

type ConversationData = {
    current: string;
    conversations: Record<string, Message[]>;
};

const store: Record<string, ConversationData> = {};

export function initUser(userId: string) {
    if (!store[userId]) {
        const id = generateId();
        store[userId] = {
            current: id,
            conversations: {
                [id]: [{ role: 'system', content: 'Eres un asistente útil.' }]
            }
        };
    }
}

export function newConversation(userId: string): string {
    const id = generateId();
    store[userId].conversations[id] = [{ role: 'system', content: 'Eres un asistente útil.' }];
    store[userId].current = id;
    return id;
}

export function listConversations(userId: string): string[] {
    return Object.keys(store[userId]?.conversations || {});
}

export function switchConversation(userId: string, id: string): boolean {
    if (store[userId]?.conversations[id]) {
        store[userId].current = id;
        return true;
    }
    return false;
}

export function addMessage(userId: string, role: 'user' | 'assistant', content: string) {
    const currentId = store[userId].current;
    store[userId].conversations[currentId].push({ role, content });

    if (store[userId].conversations[currentId].length > 20) {
        store[userId].conversations[currentId] = store[userId].conversations[currentId].slice(-20);
    }
}

export function getCurrentConversation(userId: string): Message[] {
    const currentId = store[userId].current;
    return store[userId].conversations[currentId];
}

function generateId(): string {
    return Math.random().toString(36).substring(2, 8);
}
