import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	//kakouのオプション	1: toHankaku; 2: deleteKaigyo; 3: deleteKaigyoSpace;
	//				   4: commaToTouten; 5: toutenToComma; 6:doubleKakko;
	//				   7: toUpperCase; 8: toLowerCase
	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.toHankaku', () => {kakou(1);	}));

	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.deleteKaigyo', () => {kakou(2);}));

	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.deleteKaigyoSpace', () => {kakou(3);}));

	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.commaToTouten', () => {kakou(4);}));

	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.toutenToComma', () => {kakou(5);}));

	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.doubleKakko', () => {kakou(6);}));

	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.toUpperCase', () => {kakou(7);}));

	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.toLowerCase', () => {kakou(8);}));

}


export function deactivate() {}

function kakou(option: number){
	let editor = vscode.window.activeTextEditor;
	if (editor){
		const document = editor.document;  
		let selection = editor.selection;
		if (selection.isEmpty) {
			let firstLine = editor.document.lineAt(0);
			let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
			selection = new vscode.Selection(firstLine.range.start, lastLine.range.end);
		}
		let text = document.getText(selection); 

	//kakouのオプション	1: toHankaku; 2: deleteKaigyo; 3: deleteKaigyoSpace;
	//				   4: commaToTouten; 5: toutenToComma; 6:doubleKakko;
	//				   7: toUpperCase; 8: toLowerCase
	
		if(option === 1){
			text = chikan(toHankaku(text),/　/g,' ');
		}

		if(option === 2){
			text = chikan(text,/[\r\n]/g,'');
		}

		if(option === 3){
			text = chikan(text,/\s/g,'');
		}

		if(option === 4){
			text = chikan(text,/，/g,'、');
		}

		if(option === 5){
			text = chikan(text,/、/g,'，');
		}

		if(option === 6){
			while (text !== text.replace(/(「[^「」]*)「([^」]+)」/g, '$1『$2』')){
				text =  text.replace(/(「[^「」]*)「([^」]+)」/g, '$1『$2』');
			}
		}

		if(option === 7){
			text = text.toUpperCase();
		}

		if(option === 8){
			text = text.toLowerCase() ;
		}

		editor.edit(editBuilder => {
			editBuilder.replace(selection, text);
			});
	}


}

function chikan(string: string, regex1: RegExp, regex2: string){
	let result = string.replace(regex1, regex2);
	return result;
}

function toHankaku(input: string) {
	let result = input.replace(/[０-９Ａ-Ｚａ-ｚ！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［］]/g, function(s) {
	return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);});
	return result;}