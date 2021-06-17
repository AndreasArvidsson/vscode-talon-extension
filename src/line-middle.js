const vscode = require("vscode");

module.exports = () => {
    const editor = vscode.window.activeTextEditor;
    const pos = editor.selection.active;
    const text = editor.document.lineAt(pos.line).text;
    const trimText = text.trim();
    let start, end;
    if (trimText) {
        start = text.indexOf(trimText[0]);
        end = start + trimText.length;
    }
    else {
        start = 0;
        end = text.length;
    }
    const middle = Math.floor((start + end) / 2);
    editor.selection = new vscode.Selection(
        pos.line, middle, pos.line, middle
    );
};