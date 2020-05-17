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

        let tmp = (this.panelElement as HTMLElement);
        tmp.addEventListener("click", ev => this.OnClick());

        tmp.addEventListener("mouseenter", ev => this.isOnPanel = true);
        tmp.addEventListener("mouseleave", ev => this.isOnPanel = false);
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