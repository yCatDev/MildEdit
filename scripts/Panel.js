var Panel = /** @class */ (function () {
    function Panel(editor, id) {
        var _this = this;
        if (id === void 0) { id = "panel"; }
        this.show = false;
        this.isOnPanel = false;
        this.panelElement = document.getElementById(id);
        this.editor = editor;
        document.addEventListener("mouseup", function () { _this.OnTextSelecting(); });
        document.addEventListener("mousedown", function () { _this.HidePanel(); });
        //this.panelElement.addEventListener("click", ()=>{this.editor.RestoreFocus()});
        var tmp = this.panelElement;
        tmp.addEventListener("click", function (ev) { return _this.OnClick(); });
        tmp.addEventListener("mouseenter", function (ev) { return _this.isOnPanel = true; });
        tmp.addEventListener("mouseleave", function (ev) { return _this.isOnPanel = false; });
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
        document.getElementById("btnRemoveTextFormat").addEventListener("click", function () { _this.editor.Format("removeFormat"); alert("clicked"); });
    }
    Panel.prototype.OnClick = function () {
    };
    Panel.prototype.HidePanel = function () {
        if (this.show && !this.isOnPanel) {
            this.panelElement.className = "";
            this.show = false;
        }
    };
    Panel.prototype.OnTextSelecting = function () {
        var selection = window.getSelection();
        if (selection.toString() != "") {
            this.show = true;
            this.panelElement.className = "panel-show";
            var oRange = selection.getRangeAt(0); //get the text range
            var oRect = oRange.getBoundingClientRect();
            this.panelElement.style.left = oRect.left + "px";
            this.panelElement.style.top = oRect.bottom + "px";
        }
    };
    return Panel;
}());
//# sourceMappingURL=Panel.js.map