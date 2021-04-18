import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	//kakouのオプション	1: toHankaku; 2: deleteKaigyo; 3: deleteKaigyoSpace;
	//					4: commaToTouten; 5: toutenToComma; 6:doubleKakko;
	//					7: toUpperCase; 8: toLowerCase; 9: warekiSeireki; 
	//					10: seirekiWareki
	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.toHankaku', () => {kakou(1);	}));

	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.deleteKaigyo', () => {kakou(2);}));

	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.deleteKaigyoSpace', () => {kakou(3);}));

	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.commaToTouten', () => {kakou(4);}));

	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.toutenToComma', () => {kakou(5);}));

	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.doubleKakko', () => {kakou(6);}));

	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.toUpperCase', () => {kakou(7);}));

	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.toLowerCase', () => {kakou(8);}));
	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.warekiSeireki', () => {kakou(9);}));
	context.subscriptions.push(vscode.commands.registerCommand('texthenkan.seirekiWareki', () => {kakou(10);}));
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
	//					4: commaToTouten; 5: toutenToComma; 6:doubleKakko;
	//					7: toUpperCase; 8: toLowerCase; 9: warekiSeireki; 
	//					10: seirekiWareki
		
		if(option === 1){
			text = toHankaku(text).replace(/　/g,' ');
		}

		if(option === 2){
			text = text.replace(/[\r\n]/g,'');
		}

		if(option === 3){
			text = text.replace(/\s/g,'');
		}

		if(option === 4){
			text = text.replace(/，/g,'、');
		}

		if(option === 5){
			text = text.replace(/、/g,'，');
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

		if(option === 9){
			while(true){
				let wareki = text.match(/(?<gengo>明[\s　]*治|大[\s　]*正|昭[\s　]*和|平[\s　]*成|令[\s　]*和)[\s　]*(?<year>[0-9０-９元]{1,2})(?<other>年[\s　]*[0-9０-９]{0,2}月?[\s　]*[0-9０-９]{0,2}日?)/);
				if(wareki === null){break;}
				if(wareki.groups === undefined){break;}
				if(wareki.groups.year === '元'){var wYear = "1";}
				else {var wYear = toHankaku(wareki.groups.year);}
				if(wareki.groups.gengo.includes('明')){ var addNum  : number = 1867;}
				else if (wareki.groups.gengo.includes('大')){addNum = 1911;}
				else if (wareki.groups.gengo.includes('昭')){addNum = 1925;}
				else if (wareki.groups.gengo.includes('平')){addNum = 1988;}
				else {addNum = 2018;}
				let sYear = addNum + Number(wYear);
				let otherHankaku = toHankaku(wareki.groups.other);
				text = text.replace(wareki[0],String(sYear)+otherHankaku);
			}

		}
		if(option === 10){
			while(true){
				let seireki = text.match(/(?<year>[0-9０-９]{4})(年[\s　]*)(?<month>[0-9０-９]{0,2})(月?[\s　]*)(?<day>[0-9０-９]{0,2})日?/);
				if(seireki === null){break;}
				if(seireki.groups === undefined){break;}
				let sNen = toHankaku(seireki.groups.year);
				let sNenNum = Number(sNen);
				if (seireki.groups.month === ''){
					var tsuki = '';
					var tsukiNum = 6;
				}
				else {
					tsuki = toHankaku(seireki.groups.month);
					tsukiNum = Number(tsuki);
				}
				if (seireki.groups.day === ''){
					var nichi = '';
					var nichiNum = 15;
				}
				else {
					nichi = toHankaku(seireki.groups.day);
					nichiNum = Number(nichi);
				}
				var date = new Date(sNenNum, tsukiNum -1 ,nichiNum, 0,0, 0);
				var waDate = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {era: 'long'}).format(date);
				let splits = waDate.split(/[年月]/);
				if (tsuki === ''){
					var string = splits[0] +  seireki[2];
				}
				else {
					if (nichi === ''){
						string = splits[0] + seireki[2] + splits[1] + seireki[4];
					}
					else {
						string = splits[0] + seireki[2] + splits[1] + seireki[4] + splits[2] ;
					}

				}
				text = text.replace(seireki[0],string);
			}

		}
		editor.edit(editBuilder => {
			editBuilder.replace(selection, text);
			});
	}


}

function toHankaku(input: string) {
	let result = input.replace(/[０-９Ａ-Ｚａ-ｚ！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［］]/g, function(s) {
	return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);});
	return result;}