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
        document.getElementById("btnSave").addEventListener("click",()=>this.Export2Doc(this.editorElement.id));

    }

    public Format(command:string, value = "")
    {
        document.execCommand(command, true, value);
        this.RestoreFocus();
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

    private Export2Doc(element, filename = ''){
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+document.getElementById(element).innerHTML+postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });

    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Specify file name
    filename = filename?filename+'.doc':'document.doc';

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}

}