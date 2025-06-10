import axios from 'axios';

export async function getAIResponse(question: string): Promise<string> {
    try {
        const response = await axios.post(
            'http://localhost:8000/ask',
            { texto: question },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        console.log('[getAIResponse] Respuesta:', response.data);

        return response.data.respuesta || 'No se obtuvo respuesta del modelo RAG.';
    } catch (error: any) {
        console.error('Error al llamar a la API RAG:', error?.response?.data || error.message);
        return 'Error al contactar al motor de búsqueda interno.';
    }
}