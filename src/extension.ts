// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import axios, { create } from 'axios';
import * as vscode from 'vscode';
import { createStatusbarItem } from './statusBar';
import { codeComplete } from './codeCompletation';
import { luminaraChat } from './luminaraChat';
import { luminaraChatOllama } from './luminaraChatOllama';
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
	codeComplete(context);
	luminaraChat(context);
	luminaraChatOllama(context);



	context.subscriptions.push(disposable);
}





// This method is called when your extension is deactivated
export function deactivate() {}




