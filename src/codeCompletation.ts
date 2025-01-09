/* import * as vscode from 'vscode';


export async function codeComplete(context: vscode.ExtensionContext ) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be

const commandId = 'luminara-coworker.pickModel';

try {
    const modelPick = await vscode.window.showQuickPick(
        ['gpt-o4', 'gpt-o4-mini', 'none'],
        { placeHolder: 'Select model' });
    if(modelPick === undefined) {
        return;
    }
    if(modelPick === 'none') {
        return;
    }
    if(modelPick === 'gpt-o4') {
        const model = await vscode.lm.selectChatModels({
            vendor: 'copilot', family: 'gpt-o4'
        }); 
        if(model === undefined) {
            return;
        }
    }
    if(modelPick === 'gpt-o4-mini') {
        const model = await vscode.lm.selectChatModels({
            vendor: 'copilot', family: 'gpt-o4-mini'
        }); 
        if(model === undefined) {
            return;
        }
    }
} catch (err) {
    // Making the chat request might fail because
    // - model does not exist
    // - user consent not given
    // - quota limits were exceeded
    if (err instanceof vscode.LanguageModelError) {
      console.log(err.message, err.code, err.cause);
    
    } else {
      // add other error handling logic
      throw err;
    }
}

}

*/

