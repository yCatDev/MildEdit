/// <reference path="Panel.ts"/>
/// <reference path="Editor.ts"/>

window.onload = function start(){

    let editor = new Editor();
    let panel = new Panel(editor);
    //setInterval(()=>editor.RestoreFocus(), 33);
}