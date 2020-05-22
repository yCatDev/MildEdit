class Panel
{
    private readonly editor: Editor;
    private readonly panelElement: Element;
    private readonly panelHTMLElement: HTMLElement;
    private show = false;
    private isOnPanel = false;

    constructor(editor: Editor, id = "panel") {
        this.panelElement = document.getElementById(id);
        this.editor = editor;

        document.addEventListener("mousemove", ()=>{this.OnTextSelecting()});


        //this.panelElement.addEventListener("click", ()=>{this.editor.RestoreFocus()});

        this.panelHTMLElement = (this.panelElement as HTMLElement);

        document.addEventListener('mousedown',  event => {
          if (!this.isOnPanel){
            console.log("s1");
              editor.ClearSelection();
            console.log("s2");
              this.HidePanel();
          }
        });
        document.addEventListener("click", ev => this.OnClick());

        this.panelHTMLElement.addEventListener("mouseenter", ev => this.isOnPanel = true);
        this.panelHTMLElement.addEventListener("mouseleave", ev => this.isOnPanel = false);


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
        document.getElementById("btnSetTextBold").addEventListener("click",()=>{this.editor.Format("bold")});
        document.getElementById("btnSetTextItalic").addEventListener("click",()=>{this.editor.Format("italic")});
        document.getElementById("btnSetTextUnderline").addEventListener("click",()=>{this.editor.Format("underline")});
        document.getElementById("btnSetTextStrikeThrough").addEventListener("click",()=>{this.editor.Format("strikeThrough")});

        document.getElementById("btnSetTextAlignLeft").addEventListener("click",()=>{this.editor.Format("justifyLeft")});
        document.getElementById("btnSetTextAlignCenter").addEventListener("click",()=>{this.editor.Format("justifyCenter")});
        document.getElementById("btnSetTextAlignRight").addEventListener("click",()=>{this.editor.Format("justifyRight")});
        document.getElementById("btnSetTextAlignJustify").addEventListener("click",()=>{this.editor.Format("justifyFull")});
        const fileSelector = document.getElementById('file-selector');

        document.getElementById("btnCreateNumList").addEventListener("click",()=>{this.editor.Format("insertorderedlist")});
        document.getElementById("btnCreateList").addEventListener("click",()=>{this.editor.Format("insertunorderedlist")});
        document.getElementById("btnIndent").addEventListener("click",()=>{this.editor.Format("indent")});
        document.getElementById("btnOutdent").addEventListener("click",()=>{this.editor.Format("outdent")});
        document.getElementById("btnInsertLink").addEventListener("click",()=>{let lnk=prompt('Введите ваш URL','http:\/\/');if(lnk&&lnk!=''&&lnk!='http://') this.editor.Format('createlink',lnk);});
        document.getElementById("btnInsertQuote").addEventListener("click",()=>{this.editor.Format('formatblock','blockquote')});
        document.getElementById("btnInsertImage").addEventListener("click",()=>{fileSelector.click()});

        fileSelector.addEventListener('change', (event) => {
            const fileList = (<HTMLInputElement>event.target).files;
            this.editor.Format("insertImage", URL.createObjectURL(fileList[0]))});
        // @ts-ignore
        key('ctrl+space', ()=> {this.ShowPanel(window.getSelection());});
        // @ts-ignore
        key("escape", ()=> {this.HidePanel();editor.ClearSelection(); window.focus(); return false;});
        // @ts-ignore
        key('ctrl+a', ()=>{ this.OnTextSelecting()});

    }

    private OnClick()
    {

    }

    private HidePanel()
    {
        if (this.show)
        {
            this.panelElement.className="";
            this.show = false;
            console.log("hide");
        }
    }

    private ShowPanel(selection: Selection)
    {
        this.show = true;
        this.panelElement.className="panel-show";

        let oRange = selection.getRangeAt(0); //get the text range
        let oRect = oRange.getBoundingClientRect();
        (this.panelElement as HTMLElement).style.left = oRect.left+"px";
        (this.panelElement as HTMLElement).style.top = oRect.bottom+"px";
    }

    private OnTextSelecting()
    {
        let selection = window.getSelection();
        if (selection.toString()!="")
        {
            this.ShowPanel(selection);
        }
    }

}