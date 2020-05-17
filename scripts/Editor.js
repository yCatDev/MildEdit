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
        document.getElementById("btnSave").addEventListener("click", function () { return _this.Export2Doc(_this.editorElement.id); });
    };
    Editor.prototype.Format = function (command, value) {
        if (value === void 0) { value = ""; }
        document.execCommand(command, true, value);
        this.RestoreFocus();
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
    Editor.prototype.Export2Doc = function (element, filename) {
        if (filename === void 0) { filename = ''; }
        var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
        var postHtml = "</body></html>";
        var html = preHtml + document.getElementById(element).innerHTML + postHtml;
        var blob = new Blob(['\ufeff', html], {
            type: 'application/msword'
        });
        // Specify link url
        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
        // Specify file name
        filename = filename ? filename + '.doc' : 'document.doc';
        // Create download link element
        var downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, filename);
        }
        else {
            // Create a link to the file
            downloadLink.href = url;
            // Setting the file name
            downloadLink.download = filename;
            //triggering the function
            downloadLink.click();
        }
        document.body.removeChild(downloadLink);
    };
    return Editor;
}());
//# sourceMappingURL=Editor.js.map