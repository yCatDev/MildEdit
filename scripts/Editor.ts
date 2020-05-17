class Editor
{
    private editorElement: Element;
    private filenameElement: Element;

    constructor(id = "editor") {
        this.editorElement = document.getElementById(id);
        this.filenameElement = document.getElementById("filename");

        this.SetUpButtons();
    }

    private SetUpButtons()
    {
        document.getElementById("btnNew").addEventListener("click",()=>this.NewFile());
        document.getElementById("btnClearText").addEventListener("click",()=>this.ClearText(true));
        document.getElementById("btnPrintText").addEventListener("click",()=>this.PrintText());
        let 
    }

    private static Format(command:string, value = "")
    {
        document.execCommand(command, false, value);
    }

    private NewFile()
    {
        this.ClearText();
        this.filenameElement.innerHTML = prompt("Enter a new name of file", "Untitled");

        //this.RestoreFocus();
    }

    private PrintText()
    {
        let oPrntWin = window.open("","_blank","width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
        oPrntWin.document.open();
        oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + this.editorElement.innerHTML + "<\/body><\/html>");
        oPrntWin.document.close();
    }

    private ClearText(ask = false)
    {
        if (ask){
            if (confirm("Are you sure you want to clear text?")){
                this.editorElement.innerHTML = "";
                return;
            }}
        this.editorElement.innerHTML = "";

        //this.RestoreFocus();
    }

    public RestoreFocus()
    {
        (this.editorElement as HTMLElement).focus();
    }

}