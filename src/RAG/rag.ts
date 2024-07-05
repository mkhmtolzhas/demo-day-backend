require('dotenv').config();
let OpenAI = require("openai");
let { OpenAIEmbeddings } = require("@langchain/openai");
let { loadQAStuffChain } = require("langchain/chains");
const LangchainOpenAI = require("@langchain/openai");
import pinecone from "../pinecone";
import openai from "../openai";

interface Message {
    user: string;
    message: string;
}

const indexName = "zhanynda";
const index = pinecone.index(indexName);

async function saveMessageToDatabase(message: Message): Promise<void> {
    const currentDate = new Date();
    const embeddings = new OpenAIEmbeddings({
        apiKey: process.env.OPENAI_API_KEY, 
    });

    const { user, message: msg } = message;

    const text = `${user}: ${msg}`;

    const embedding = await embeddings.embedDocuments([text]);
    const flattenedEmbedding = embedding.flat();

    await index.upsert([
        {
            id: `${user}-${Date.now()}`,
            values: flattenedEmbedding,
            metadata: {
                user,
                message: msg,
                lastChecked: currentDate.toString(),
            }
        }
    ]);
}

async function getMessagesFromDatabase(query: string): Promise<Message[]> {
    const embeddings = new OpenAIEmbeddings({
        apiKey: process.env.OPENAI_API_KEY, 
    });


    // Создание вектора для запроса
    const queryEmbedding = await embeddings.embedDocuments([query]);
    const flattenedQueryEmbedding = queryEmbedding.flat();

    // Выполнение запроса к Pinecone для поиска ближайших векторов
    const response = await index.query({
        vector: flattenedQueryEmbedding,
        topK: 10, // Количество ближайших векторов, которые нужно вернуть
        includeMetadata: true
    });

    // Извлечение сообщений из результатов запроса
    const messages: Message[] = response.matches.map((match: any) => ({
        user: match.metadata.user,
        message: match.metadata.message,
        lastChecked: match.metadata.lastChecked
    }));

    console.log(messages);
    return messages;
}

async function queryWithOpenAI (message: Message) {
    const query = message.message;
    const embeddings = new OpenAIEmbeddings({
        apiKey: process.env.OPENAI_API_KEY, 
    });
    const queryEmbedding = await embeddings.embedDocuments([query]);
    const flattenedQueryEmbedding = queryEmbedding.flat();

    const response = await index.query({
        vector: flattenedQueryEmbedding,
        topK: 3,
        includeMetadata: true
    });

    const concatenatedMessages = response.matches.map((match: any) => `${match.metadata.user}: ${match.metadata.message}`).join("\n");
    console.log(concatenatedMessages);

    const llm = new LangchainOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const chain = loadQAStuffChain(llm);

    // const answer = await chain.generateResponse(query, concatenatedMessages);
    // console.log(answer);
    // const query = message.message;
    // const queryEmbedding = await new OpenAIEmbeddings().embedDocuments([query]);

    // const queryResponse = await index.query({
    //     vector: queryEmbedding.flat(),
    //     topK: 3,
    //     includeMetadata: true
    // });

    // const concatenatedMessages = queryResponse.matches.map((match: any) => `${match.metadata.user}: ${match.metadata.message}`).join("\n");
    // console.log(concatenatedMessages);

    // const llm = new LangchainOpenAI({
    //     apiKey: process.env.OPENAI_API_KEY,
    // });

    // const chain = loadQAStuffChain(llm);

    // const response = await chain.generateResponse(query, concatenatedMessages);
    // console.log(response);
}



export { saveMessageToDatabase, getMessagesFromDatabase, queryWithOpenAI };
