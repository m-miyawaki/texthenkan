# TextHenkan README
（主に日本語の）テキストの様々な変換をします

## 機能
選択範囲のテキスト（選択されていない場合は全範囲のテキスト）に対して、次の変換をします。

|コマンド|コマンドパレット上の表示|機能|
|---|---|---|
|`texthenkan.toHankaku`|textHenkan: toHankaku| 全角英数字・記号・スペースを半角に変換|
|`texthenkan.deleteKaigyo`|textHenkan: deleteKaigyo| 改行の削除|
|`texthenkan.deleteKaigyoSpace`|textHenkan: deleteKaigyoSpace| 改行とスペースの削除|
|`texthenkan.commaToTouten`|textHenkan: commaToTouten| 「，」（コンマ）を「、」に変換|
|`texthenkan.toutenToComma`|textHenkan: toutenToComma| 「、」を「，」（コンマ）に変換|
|`texthenkan.doubleKakko`|textHenkan: doubleKakko| カギカッコ（「」）でくくられた文字列内のカギカッコをすべて二重カギカッコ（『』）に変換（「aa「bb」cc」→「aa『bb』cc」）（下画像参照）|
|`texthenkan.toUpperCase`|textHenkan: toUpperCase| 半角アルファベットの小文字を大文字に変換|
|`texthenkan.toLowerCase`|textHenkan: toLowerCase| 半角アルファベットの大文字を小文字に変換|
|`texthenkan.warekiSeireki`|textHenkan: warekiSeireki| 和暦を西暦に変換|
|`texthenkan.seirekiWareki`|textHenkan: seirekiWareki| 西暦を和暦に変換|


![](./gif/doublekakko.gif)


## 使い方
コマンドパレットで上記のコマンドを呼び出して実行します。

キーボードショートカットで実行したい場合は、上記のコマンドを適当なキーに割り当ててください。

上の画像のように、コンテキストメニュー（Windowsの右クリックメニュー）から選択して実行することも可能です（要設定変更）。

## Extension Settings
Settingsの"Show In Editor Context Menu"のところでチェックを入れたコマンドは、コンテキストメニューに表示されるようになります。
