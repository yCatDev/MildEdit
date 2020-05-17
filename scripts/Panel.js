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
        var tmp = this.panelElement;
        tmp.addEventListener("click", function (ev) { return _this.OnClick(); });
        tmp.addEventListener("mouseenter", function (ev) { return _this.isOnPanel = true; });
        tmp.addEventListener("mouseleave", function (ev) { return _this.isOnPanel = false; });
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