import { channel } from 'diagnostics_channel';
import { open } from 'fs';
import { start } from 'repl';
import * as vscode from 'vscode';

export async function luminaraChat(context: vscode.ExtensionContext ) {

    const commandId = 'luminara-coworker.luminaraChatGPT-04';
    const disposable = vscode.commands.registerCommand(commandId, async () => {
        
      // get the model
    const [model] = await vscode.lm.selectChatModels({ vendor: 'copilot', family: 'gpt-4o' });
    
    const BASE_PROMPT = 
    'You are a helpful code tutor. Your job is to teach the user with simple descriptions and sample code of the concept. Respond with a guided overview of the concept in a series of messages. Do not give the user the answer directly, but guide them to find the answer themselves. If the user asks a non-programming question, politely decline to respond.';
    const handler: vscode.ChatRequestHandler =  async (       // define the handler
        request: vscode.ChatRequest, 
        context: vscode.ChatContext,
        stream: vscode.ChatResponseStream,
        token: vscode.CancellationToken
     ) =>
    {  

    let prompt = BASE_PROMPT;
    const messages = [vscode.LanguageModelChatMessage.User(prompt)];  // add the base prompt

    
    // add in the user's message
    messages.push(vscode.LanguageModelChatMessage.User(request.prompt));
  
    // send the request
    const chatResponse = await request.model.sendRequest(messages, {}, token);
  
    // stream the response
    for await (const fragment of chatResponse.text) {
      stream.markdown(fragment);
    }
    
    return;
    
    };

    // create the chat participant
    const chat = vscode.chat.createChatParticipant('luminara-coworker.chatGPT-04', handler);
    chat.iconPath = vscode.Uri.joinPath(context.extensionUri, 'luminara.png');
    // open the chat
    
    vscode.commands.executeCommand("workbench.action.chat.open", "@CoworkerGPT-04");     
  });
}