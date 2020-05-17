class Panel
{
    private readonly editor: Editor;
    private readonly panelElement: Element;
    private show = false;
    private isOnPanel = false;

    constructor(editor: Editor, id = "panel") {
        this.panelElement = document.getElementById(id);
        this.editor = editor;

        document.addEventListener("mouseup", ()=>{this.OnTextSelecting()});
        document.addEventListener("mousedown", ()=>{this.HidePanel()});

        //this.panelElement.addEventListener("click", ()=>{this.editor.RestoreFocus()});

        let tmp = (this.panelElement as HTMLElement);
        tmp.addEventListener("click", ev => this.OnClick());

        tmp.addEventListener("mouseenter", ev => this.isOnPanel = true);
        tmp.addEventListener("mouseleave", ev => this.isOnPanel = false);


        let selectTextFormat = document.getElementById("textFormatSelection") as HTMLSelectElement;
        selectTextFormat.addEventListener("change",()=>this.editor.Format('formatblock',selectTextFormat.selectedOptions[0].value));

        let selectTextFont = document.getElementById("textFontSelection") as HTMLSelectElement;
        selectTextFont.addEventListener("change",()=>this.editor.Format('fontname',selectTextFont.selectedOptions[0].value));

        let selectTextSize = document.getElementById("textSizeSelection") as HTMLSelectElement;
        selectTextSize.addEventListener("change",()=>this.editor.Format('fontsize',selectTextSize.selectedOptions[0].value));

        let selectTextColor = document.getElementById("textColorSelection") as HTMLSelectElement;
        selectTextColor.addEventListener("change",()=>this.editor.Format('forecolor',selectTextColor.selectedOptions[0].value));

        let selectBackgroundColor = document.getElementById("backgroundColorSelection") as HTMLSelectElement;
        selectBackgroundColor.addEventListener("change",()=>this.editor.Format('backcolor',selectBackgroundColor.selectedOptions[0].value));

        document.getElementById("btnRemoveTextFormat").addEventListener("click",()=>{this.editor.Format("removeFormat"); alert("clicked")});
    }

    private OnClick()
    {

    }

    private HidePanel()
    {
        if (this.show && !this.isOnPanel)
        {
            this.panelElement.className="";
            this.show = false;
        }
    }

    private OnTextSelecting()
    {
        let selection = window.getSelection();
        if (selection.toString()!="")
        {
            this.show = true;
            this.panelElement.className="panel-show";

            let oRange = selection.getRangeAt(0); //get the text range
            let oRect = oRange.getBoundingClientRect();
            (this.panelElement as HTMLElement).style.left = oRect.left+"px";
            (this.panelElement as HTMLElement).style.top = oRect.bottom+"px";
        }
    }

}