import axios from 'axios';

const AZURE_OPENAI_ENDPOINT = 'https://botmodeltester.openai.azure.com';
const DEPLOYMENT_NAME = 'gpt-35-turbo';
const API_VERSION = '2024-12-01-preview';
const API_KEY = process.env.AZURE_OPENAI_KEY || '';

export async function getAIResponse(question: string): Promise<string> {
    try {
        const response = await axios.post(
            `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${DEPLOYMENT_NAME}/chat/completions?api-version=${API_VERSION}`,
            {
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: question }
                ],
                max_tokens: 100,
                temperature: 1.0,
                top_p: 1.0
            },
            {
                headers: {
                    'api-key': API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices?.[0]?.message?.content || 'No se obtuvo respuesta de la IA.';
    } catch (error: any) {
        console.error('Error al consultar Azure OpenAI:', error?.response?.data || error.message);
        return 'Hubo un error al contactar la IA.';
    }
}