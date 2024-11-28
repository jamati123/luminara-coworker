import * as vscode from 'vscode';
import axios from 'axios';
import { json } from 'stream/consumers';



export async function luminaraChatOllama(context: vscode.ExtensionContext ) {

    const commandId = 'luminara-coworker.luminaraChatOllama'; // define the command
    const disposable = vscode.commands.registerCommand(commandId, async () => { // register the command
        

    const BASE_PROMPT = 
    'You are a helpful code tutor. Your job is to teach the user with simple descriptions and sample code of the concept. Respond with a guided overview of the concept in a series of messages. Do not give the user the answer directly, but guide them to find the answer themselves. If the user asks a non-programming question, politely decline to respond.';
    
    // define the handler
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


    // define the payload
      const payload = {
        model: 'qwen2.5-coder:0.5b',
        prompt: request.prompt
      };

      // send the request to the server
      const chatResponse = await axios.post('http://10.10.11.11:5000/ask_programming_bot', payload).then((response) => {

      return response.data.choices[0].text;
					
  });
  
    // stream the response+
    for await (const fragment of await chatResponse) {
      stream.markdown(fragment);
    }
  
    return;
    };

    // create the chat participant
    const chat = vscode.chat.createChatParticipant('luminara-coworker.chatOllama', handler);
    chat.iconPath = vscode.Uri.joinPath(context.extensionUri, 'luminara.png');

    vscode.commands.executeCommand("workbench.action.chat.open", "@Coworker-llma hallo");     

    });
}

