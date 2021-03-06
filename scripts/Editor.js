var Editor = /** @class */ (function () {
    function Editor(id) {
        var _this = this;
        if (id === void 0) { id = "editor"; }
        this.editorElement = document.getElementById(id);
        this.filenameElement = document.getElementById("filename");
        // @ts-ignore
        key('ctrl+s', function () { _this.ExportDocxFile(); return false; });
        // @ts-ignore
        key('ctrl+a', function () { _this.Format('selectAll'); return false; });
        this.editorElement.onblur = function (ev) {
            _this.RestoreFocus();
        };
        this.SetUpButtons();
        //this.SetUpCtrlBtn();
    }
    Editor.prototype.ClearSelection = function () {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        else if (document.getSelection()) {
            document.getSelection().empty();
        }
        this.RestoreFocus();
    };
    Editor.prototype.SetUpCtrlBtn = function () {
        var editor = this.editorElement;
        //document.addEventListener('focusout', ev => (this.editorElement as HTMLElement).focus());
        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 18) {
                // @ts-ignore
                editor.contentEditable = false;
            }
        }, false);
        document.addEventListener('keyup', function (event) {
            if (event.keyCode === 18) {
                // @ts-ignore
                editor.contentEditable = true;
            }
            editor.focus();
            window.focus();
        }, false);
    };
    Editor.prototype.GetEditorElement = function () {
        return this.editorElement;
    };
    Editor.prototype.SetUpButtons = function () {
        var _this = this;
        document.getElementById("btnNew").addEventListener("click", function () { return _this.NewFile(); });
        document.getElementById("btnClearText").addEventListener("click", function () { return _this.ClearText(true); });
        document.getElementById("btnPrintText").addEventListener("click", function () { return _this.PrintText(); });
        document.getElementById("btnSave").addEventListener("click", function () { return _this.ExportDocxFile(); });
    };
    Editor.prototype.Format = function (command, value) {
        if (value === void 0) { value = ""; }
        this.RestoreFocus();
        document.execCommand(command, true, value);
    };
    Editor.prototype.NewFile = function () {
        if (confirm("Are you sure want to create new file")) {
            this.ClearText();
            this.filenameElement.innerHTML = prompt("Enter a new name of file", "Untitled");
        }
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
        else
            this.editorElement.innerHTML = "";
        this.RestoreFocus();
    };
    Editor.prototype.RestoreFocus = function () {
        window.focus();
        this.editorElement.focus();
    };
    Editor.prototype.ExportDocxFile = function () {
        var documentElement = this.editorElement;
        if (!window.Blob) {
            alert('Your legacy browser does not support this action.');
            return;
        }
        var processedDocumentElement = this.ConvertImagesToBase64(documentElement);
        var html = '<head> <meta charset="UTF-8"></head>' + processedDocumentElement.innerHTML;
        // @ts-ignore
        var blob = htmlDocx.asBlob(html);
        var url = URL.createObjectURL(blob);
        var link = document.createElement('A');
        link.href = url;
        // Set default file name.
        // Word will append file extension - do not add an extension here.
        //@ts-ignore
        link.download = this.filenameElement.innerHTML;
        document.body.appendChild(link);
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, this.filenameElement.innerHTML + '.docx'); // IE10-11
        }
        else {
            link.click(); // other browsers
        }
        document.body.removeChild(link);
    };
    Editor.prototype.ConvertImagesToBase64 = function (targetDocumentElement) {
        var clonedDocumentElement = targetDocumentElement.cloneNode(true);
        var regularImages = targetDocumentElement.querySelectorAll("img");
        var clonedImages = clonedDocumentElement.querySelectorAll("img");
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        for (var i = 0; i < regularImages.length; i++) {
            var regularImgElement = regularImages[i];
            var clonedImgElement = clonedImages[i];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = regularImgElement.width;
            canvas.height = regularImgElement.height;
            ctx.scale(regularImgElement.width / regularImgElement.naturalWidth, regularImgElement.height / regularImgElement.naturalHeight);
            ctx.drawImage(regularImgElement, 0, 0);
            // by default toDataURL() produces png image, but you can also export to jpeg
            // checkout function's documentation for more details
            var dataURL = canvas.toDataURL();
            clonedImgElement.setAttribute('src', dataURL);
        }
        canvas.remove();
        return clonedDocumentElement;
    };
    Editor.prototype.Blur = function () {
        this.editorElement.blur();
    };
    return Editor;
}());
//# sourceMappingURL=Editor.js.map