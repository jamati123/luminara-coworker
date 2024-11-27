// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import axios, { create } from 'axios';
import * as vscode from 'vscode';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "luminara-coworker" is now active!');
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('luminara-coworker.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from luminara_coworker!');
	});

	createStatusbarItem(context);

	context.subscriptions.push(disposable);
}




// This method is called when your extension is deactivated
export function deactivate() {}


function createStatusbarItem(context: vscode.ExtensionContext) {
	// Create a status bar item
	const commandId = 'luminara-coworker.statusBarClicked';
	context.subscriptions.push(vscode.commands.registerCommand(commandId, async () => {
		const pageType = await vscode.window.showQuickPick(
			['chat', 'fetch rows, list in table'],
			{ placeHolder: 'select type of web page to make' });
		
		if (pageType === 'chat') {


			const chat = vscode.window.createInputBox();	
			chat.title = 'Chat with coworker';
			chat.placeholder = 'Type message here';
			chat.onDidAccept(() => {
				const message = chat.value;
				chat.value = '';
				chat.hide();
				axios.post('http://10.10.11.11:5000/ask_ollama', {
					prompt: message,
				}).then((response) => {
					const responseData = response.data;
					vscode.window.showInformationMessage(responseData);
					console.log(responseData);
					if (!responseData) {
						console.log('response is null');
					}
				}).catch((error) => {
					vscode.window.showErrorMessage('Failed to send message');
					console.error(error);
				});
				console.log(message);
			});
			

			chat.show();
		}
		if (pageType === 'fetch rows, list in table') {
			console.log('fetch rows, list in table');
		}
	}));

	

	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = commandId;

	context.subscriptions.push(statusBarItem);
	// Set the text and show the status bar item
	statusBarItem.text = 'Luminara Coworker';
	statusBarItem.tooltip = 'view coworker';
	statusBarItem.show();


}
