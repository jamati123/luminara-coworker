import * as vscode from 'vscode';
import axios from 'axios';
import { luminaraChat } from './luminaraChat';

export function createStatusbarItem(context: vscode.ExtensionContext) {
	// Create a status bar item
	const commandId = 'luminara-coworker.statusBarClicked';
	context.subscriptions.push(vscode.commands.registerCommand(commandId, async () => {
		const pageType = await vscode.window.showQuickPick(
			['Message', 'Chat GPT-04', 'Chat Ollama'],
			{ placeHolder: 'select type of web page to make' });
		
		if (pageType === 'Message') {

			
			const chat = vscode.window.createInputBox();	// Create Inout field for prompt
			chat.title = 'Chat with coworker';
			chat.placeholder = 'Type message here';
			chat.onDidAccept(() => {			//when user press enter
				const message = chat.value;	//get the message
				chat.value = '';   //clear the input field
				axios.post('http://10.10.11.11:5000/ask_programming_bot', { // sending message to the server
					prompt: message,
				}).then((response) => {	//if server response is success
					const responseData = response.data.choices[0].text;
					
					vscode.window.showInformationMessage("Luminara: " + responseData);
					console.log(responseData);
					if (!responseData) { //if response is null
						console.log('response is null');
					} 
				}).catch((error) => { //if server response is failed
					vscode.window.showErrorMessage('Failed to send message');
					console.error(error);
				});
				console.log(message);
			});
            
			// Display the input field

			chat.show();
		}

		if (pageType === 'Chat GPT-04') {
            
            vscode.commands.executeCommand("workbench.action.chat.open", "@CoworkerGPT-04");

		}
        if (pageType === 'Chat Ollama') {
            
            vscode.commands.executeCommand("workbench.action.chat.open", "@Coworker-llma hallo");
        }

	}));

	
	// define the status bar item and Configuring the status bar item
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = commandId;	

	context.subscriptions.push(statusBarItem);
	// Set the text and show the status bar item
	statusBarItem.text = "Luminara Coworker"; 
    
	statusBarItem.tooltip = 'view coworker';
	statusBarItem.show();


}