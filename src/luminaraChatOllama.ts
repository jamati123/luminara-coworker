import * as vscode from 'vscode';
import axios from 'axios';
import { json } from 'stream/consumers';



export async function luminaraChatOllama(context: vscode.ExtensionContext ) {

    const commandId = 'luminara-coworker.luminaraChatOllama';
    const disposable = vscode.commands.registerCommand(commandId, async () => {
        

    /*const [model] = await axios.post('http://10.10.11.11:5000/ask_programming_bot') // add the endpoint here
    .then((response) => {
        return response.data;
    }); */

    const BASE_PROMPT = 
    'You are a helpful code tutor. Your job is to teach the user with simple descriptions and sample code of the concept. Respond with a guided overview of the concept in a series of messages. Do not give the user the answer directly, but guide them to find the answer themselves. If the user asks a non-programming question, politely decline to respond.';
    const handler: vscode.ChatRequestHandler =  async (
        request: vscode.ChatRequest,
        context: vscode.ChatContext,
        stream: vscode.ChatResponseStream,
        token: vscode.CancellationToken
     ) =>
    {  

    let prompt = BASE_PROMPT;
    const messages = [vscode.LanguageModelChatMessage.User(prompt)];

    
    // add in the user's message
    messages.push(vscode.LanguageModelChatMessage.User(request.prompt));
   // console.log(JSON.stringify(messages));
      const payload = {
        model: 'qwen2.5-coder:0.5b',
        prompt: request.prompt
      };
   // const chatResponse = await request.model.sendRequest(messages, {}, token);
    const chatResponse = await axios.post('http://10.10.11.11:5000/ask_programming_bot', payload).then((response) => {

      return response.data.choices[0].text;
					
  });
  
    // stream the response+
    for await (const fragment of await chatResponse) {
      stream.markdown(fragment);
    }
  
    return;
    };

    const chat = vscode.chat.createChatParticipant('luminara-coworker.chatOllama', handler);

    });
}

