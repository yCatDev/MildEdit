var Editor = /** @class */ (function () {
    function Editor(id) {
        if (id === void 0) { id = "editor"; }
        this.editorElement = document.getElementById(id);
        this.filenameElement = document.getElementById("filename");
        this.SetUpButtons();
    }
    Editor.prototype.SetUpButtons = function () {
        var _this = this;
        document.getElementById("btnNew").addEventListener("click", function () { return _this.NewFile(); });
        document.getElementById("btnClearText").addEventListener("click", function () { return _this.ClearText(true); });
        document.getElementById("btnPrintText").addEventListener("click", function () { return _this.PrintText(); });
        let;
    };
    Editor.Format = function (command, value) {
        if (value === void 0) { value = ""; }
        document.execCommand(command, false, value);
    };
    Editor.prototype.NewFile = function () {
        this.ClearText();
        this.filenameElement.innerHTML = prompt("Enter a new name of file", "Untitled");
        //this.RestoreFocus();
    };
    Editor.prototype.PrintText = function () {
        var oPrntWin = window.open("", "_blank", "width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
        oPrntWin.document.open();
        oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + this.editorElement.innerHTML + "<\/body><\/html>");
        oPrntWin.document.close();
    };
    Editor.prototype.ClearText = function (ask) {
        if (ask === void 0) { ask = false; }
        if (ask) {
            if (confirm("Are you sure you want to clear text?")) {
                this.editorElement.innerHTML = "";
                return;
            }
        }
        this.editorElement.innerHTML = "";
        //this.RestoreFocus();
    };
    Editor.prototype.RestoreFocus = function () {
        this.editorElement.focus();
    };
    return Editor;
}());
//# sourceMappingURL=Editor.js.map