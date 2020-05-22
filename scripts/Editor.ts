

class Editor
{
    private readonly editorElement: Element;
    private filenameElement: Element;

    constructor(id = "editor") {
        this.editorElement = document.getElementById(id);
        this.filenameElement = document.getElementById("filename");

        // @ts-ignore
        key('ctrl+s', ()=> {this.ExportDocxFile(); return false;});
        // @ts-ignore
        key('ctrl+a', ()=> {this.Format('selectAll'); return false;});

        (this.editorElement as HTMLElement).onblur = ev => {
            this.RestoreFocus();
        }

        this.SetUpButtons();
        //this.SetUpCtrlBtn();
    }
    public ClearSelection()
    {
        if (window.getSelection) {window.getSelection().removeAllRanges();}
        else if (document.getSelection()) {document.getSelection().empty();}
        this.RestoreFocus();
    }
    private SetUpCtrlBtn()
    {
        let editor = this.editorElement;
        //document.addEventListener('focusout', ev => (this.editorElement as HTMLElement).focus());
        document.addEventListener('keydown', function(event) {
            if (event.keyCode === 18)  {
                // @ts-ignore
                editor.contentEditable = false;
            }

        }, false);

        document.addEventListener('keyup', function(event) {
            if (event.keyCode === 18) {
                // @ts-ignore
                editor.contentEditable = true;

            }(editor as HTMLElement).focus();window.focus();
        }, false);

    }

    private SetUpButtons()
    {
        document.getElementById("btnNew").addEventListener("click",()=>this.NewFile());
        document.getElementById("btnClearText").addEventListener("click",()=>this.ClearText(true));
        document.getElementById("btnPrintText").addEventListener("click",()=>this.PrintText());
        document.getElementById("btnSave").addEventListener("click",()=>this.ExportDocxFile());

    }

    public Format(command:string, value = "")
    {
        this.RestoreFocus();
        document.execCommand(command, true, value);

    }

    private NewFile()
    {
        if (confirm("Are you sure want to create new file")) {
            this.ClearText();
            this.filenameElement.innerHTML = prompt("Enter a new name of file", "Untitled");
        }
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
            }}else this.editorElement.innerHTML = "";

        this.RestoreFocus();
    }

    public RestoreFocus()
    {
        window.focus();
        (this.editorElement as HTMLElement).focus();
    }



    private ExportDocxFile() {
        var documentElement =this.editorElement;
        if (!window.Blob) {
            alert('Your legacy browser does not support this action.');
            return;
        }

        var processedDocumentElement = this.ConvertImagesToBase64(documentElement);

        var html = processedDocumentElement.innerHTML;
        // @ts-ignore
        var blob = htmlDocx.asBlob(html);

        var url = URL.createObjectURL(blob);
        var link = document.createElement('A') as HTMLLinkElement;

        link.href = url;
        // Set default file name.
        // Word will append file extension - do not add an extension here.
        //@ts-ignore
        link.download = this.filenameElement.innerHTML;

        document.body.appendChild(link);

        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, this.filenameElement.innerHTML+'.docx'); // IE10-11
        } else {
            link.click();  // other browsers
        }

        document.body.removeChild(link);
    }

    private ConvertImagesToBase64(targetDocumentElement) {
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
    }

    public Blur()
    {
        (this.editorElement as HTMLElement).blur();
    }

}