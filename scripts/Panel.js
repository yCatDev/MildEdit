var Panel = /** @class */ (function () {
    function Panel(editor, id) {
        var _this = this;
        if (id === void 0) { id = "panel"; }
        this.show = false;
        this.isOnPanel = false;
        this.panelElement = document.getElementById(id);
        this.editor = editor;
        document.addEventListener("mousemove", function () { _this.OnTextSelecting(); });
        //this.panelElement.addEventListener("click", ()=>{this.editor.RestoreFocus()});
        this.panelHTMLElement = this.panelElement;
        document.addEventListener('mousedown', function (event) {
            if (!_this.isOnPanel) {
                console.log("s1");
                editor.ClearSelection();
                console.log("s2");
                _this.HidePanel();
            }
        });
        document.addEventListener("click", function (ev) { return _this.OnClick(); });
        this.panelHTMLElement.addEventListener("mouseenter", function (ev) { return _this.isOnPanel = true; });
        this.panelHTMLElement.addEventListener("mouseleave", function (ev) { return _this.isOnPanel = false; });
        var selectTextFormat = document.getElementById("textFormatSelection");
        selectTextFormat.addEventListener("change", function () { return _this.editor.Format('formatblock', selectTextFormat.selectedOptions[0].value); });
        var selectTextFont = document.getElementById("textFontSelection");
        selectTextFont.addEventListener("change", function () { return _this.editor.Format('fontname', selectTextFont.selectedOptions[0].value); });
        var selectTextSize = document.getElementById("textSizeSelection");
        selectTextSize.addEventListener("change", function () { return _this.editor.Format('fontsize', selectTextSize.selectedOptions[0].value); });
        var selectTextColor = document.getElementById("textColorSelection");
        selectTextColor.addEventListener("change", function () { return _this.editor.Format('forecolor', selectTextColor.selectedOptions[0].value); });
        var selectBackgroundColor = document.getElementById("backgroundColorSelection");
        selectBackgroundColor.addEventListener("change", function () { return _this.editor.Format('backcolor', selectBackgroundColor.selectedOptions[0].value); });
        document.getElementById("btnRemoveTextFormat").addEventListener("click", function () { _this.editor.Format("removeFormat"); });
        document.getElementById("btnSetTextBold").addEventListener("click", function () { _this.editor.Format("bold"); });
        document.getElementById("btnSetTextItalic").addEventListener("click", function () { _this.editor.Format("italic"); });
        document.getElementById("btnSetTextUnderline").addEventListener("click", function () { _this.editor.Format("underline"); });
        document.getElementById("btnSetTextStrikeThrough").addEventListener("click", function () { _this.editor.Format("strikeThrough"); });
        document.getElementById("btnSetTextAlignLeft").addEventListener("click", function () { _this.editor.Format("justifyLeft"); });
        document.getElementById("btnSetTextAlignCenter").addEventListener("click", function () { _this.editor.Format("justifyCenter"); });
        document.getElementById("btnSetTextAlignRight").addEventListener("click", function () { _this.editor.Format("justifyRight"); });
        document.getElementById("btnSetTextAlignJustify").addEventListener("click", function () { _this.editor.Format("justifyFull"); });
        var fileSelector = document.getElementById('file-selector');
        fileSelector.addEventListener('change', function (event) {
            var fileList = event.target.files;
            _this.editor.Format("insertImage", URL.createObjectURL(fileList[0]));
        });
        document.getElementById("btnCreateNumList").addEventListener("click", function () { _this.editor.Format("insertorderedlist"); });
        document.getElementById("btnCreateList").addEventListener("click", function () { _this.editor.Format("insertunorderedlist"); });
        document.getElementById("btnIndent").addEventListener("click", function () { _this.editor.Format("indent"); });
        document.getElementById("btnOutdent").addEventListener("click", function () { _this.editor.Format("outdent"); });
        document.getElementById("btnInsertLink").addEventListener("click", function () { _this.OnLinkButtonClick(); });
        document.getElementById("btnInsertQuote").addEventListener("click", function () { _this.editor.Format('formatblock', 'blockquote'); });
        document.getElementById("btnInsertImage").addEventListener("click", function () { fileSelector.click(); });
        // @ts-ignore
        key('ctrl+space', function () { _this.ShowPanel(document.getSelection()); });
        // @ts-ignore
        key("escape", function () { _this.HidePanel(); editor.ClearSelection(); window.focus(); return false; });
        // @ts-ignore
        key('ctrl+a', function () { _this.OnTextSelecting(); });
    }
    Panel.prototype.OnClick = function () {
    };
    Panel.prototype.OnLinkButtonClick = function () {
        var link = prompt('Enter the URL', 'http:\/\/');
        if (link && link != '' && link != 'http://')
            this.editor.Format('createlink', link);
    };
    Panel.prototype.HidePanel = function () {
        if (this.show) {
            this.panelElement.className = "";
            this.show = false;
            console.log("hide");
        }
    };
    Panel.prototype.ShowPanel = function (selection) {
        this.show = true;
        this.panelElement.className = "panel-show";
        var oRange = selection.getRangeAt(0); //get the text range
        var oRect = oRange.getBoundingClientRect();
        if (oRect.left != 0 || oRect.right != 0) {
            this.lastleft = this.panelElement.style.left = oRect.left + "px";
            this.lastbottom = this.panelElement.style.top = oRect.bottom + "px";
        }
        else {
        }
    };
    Panel.prototype.OnTextSelecting = function () {
        var selection = window.getSelection();
        if (selection.toString() != "") {
            this.ShowPanel(selection);
        }
    };
    return Panel;
}());
//# sourceMappingURL=Panel.js.map