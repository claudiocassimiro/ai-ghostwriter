import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate } from "langchain/prompts";
import handlerVectorDB from "../services/applicationService/handlerVectorDB";

export const chatPrompt = async (command: string) => {
  const copywriteKnowledge = await handlerVectorDB.searchCopywriteKnowledge(
    // eslint-disable-next-line prettier/prettier
    "Boas práticas para escrever um bom conteúdo"
  );
  const context = await handlerVectorDB.search(command);

  if (context?.length === 0) {
    return "Desculpe, mas não tenho informações sobre esse assunto";
  }

  const chat = new ChatOpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo-1106",
  });
  const chatPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Como escritor fantasma especializado em criar conteúdos envolventes para redes sociais, utilizo as melhores práticas de copywriting, as quais estão disponíveis por meio do {copywriteKnowledge}. Meu objetivo é fornecer textos relevantes e persuasivos, alinhados com as estratégias eficazes de comunicação online. Para otimizar ainda mais a qualidade do conteúdo, levo em consideração as informações de contexto específicas fornecidas por {context}. Caso não tenha acesso a informações detalhadas sobre a resposta necessária, serei transparente ao afirmar que não possuo o contexto adequado, evitando respostas que estejam fora do escopo da situação.",
    ],
    ["human", "{command}"],
  ]);

  const chain = new LLMChain({
    prompt: chatPrompt,
    llm: chat,
  });

  const message = await chain.call({
    copywriteKnowledge: copywriteKnowledge?.map((ctx) => ctx.pageContent),
    context: context?.map((ctx) => ctx.pageContent),
    command,
  });

  return message;
};
