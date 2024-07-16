import openai from '../openai';
import { openaiSystemPromptWriter } from '../openai';

class GirlfriendAIService {
  async *processStreamedText(stream: AsyncIterable<any>): AsyncGenerator<string, void, unknown> {
    for await (const part of stream) {
      const chunk = part.choices[0]?.delta?.content;
      if (chunk) {
        yield chunk;
      }
    }
  }

  async create(userPrompt: string, systemPrompt: string) {
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      stream: true,
      temperature: 0.9,
    });

    try {
      let completeMessage = '';
      for await (const textChunk of this.processStreamedText(stream)) {
        completeMessage += textChunk;
      }
      return completeMessage;
    } catch (error) {
      console.error('Error processing OpenAI stream', error);
      throw new Error('Failed to process OpenAI stream');
    }
  }
}

export default GirlfriendAIService;
