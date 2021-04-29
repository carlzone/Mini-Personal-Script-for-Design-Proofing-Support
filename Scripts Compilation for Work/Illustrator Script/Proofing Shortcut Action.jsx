#targetengine "session";

/**
GLOBAL VARIABLES
*/
var bridgeTalk = new BridgeTalk();
var windowPalette;
     var textMessage;
     var btnAllTextPropties;
     var manipulationPanel;
         var btnSelectSameFont;
         var btnCombineText;
     var cosistencyPanel;
         var btnMakeSizeConsistent;
         var btnMakeTrackingConsistent;
         var btnMakeStrokeConsistent;
         var btnMakeFillConsistent;
     var cftPanel;
         var btnExportRGBTIFF;
         var btnExportCMYKTIFF;


// Thus function will combined all selected text that is selected in the illustator
function combineText(){
    try{
        if(selection.length > 0){        
            for(var index = 1; index < selection.length; selection[index].remove()){
                selection[0].contents += " "+selection[index].contents;
            }
            selection[0].textRange.justification = Justification.CENTER;
        }else{
            alert("There is no selected object!");
        }
    }catch(error){
        alert(error);
    }
}

// This function will make all selected text letter spacing consistent in refer to the text that is at the top of the layer.
function makeTrackingConsistent(){
    try{
        if(selection.length > 1){
            if(selection[0].typename == "TextFrame"){
                
                for(var index=1; index < selection.length; index++){
                    var aCharAttrib = selection[0].textRange.characterAttributes;
                    selection[index].textRange.characterAttributes.tracking = aCharAttrib.tracking;
                }
                
            }
        }else{
            alert("No textbox is selected!");
        }
    }catch(error){
       alert(error.message); 
    }
}

// This function will make the text object that is select consistent in size in refer to the text that iis at the top of the layer
function makeSizeConsistent(){
    try{
        if(selection.length > 1){
            if(selection[0].typename == "TextFrame"){
                
                for(var index=1; index < selection.length; index++){
                    var aCharAttrib = selection[0].textRange.characterAttributes;
                    selection[index].textRange.characterAttributes.size = aCharAttrib.size;
                }
                
            }
        }else{
            alert("No textbox is selected!");
        }
    }catch(error){
       alert(error.message); 
    }
}

// This function will make the stroke consistent for the selected text objects
function makeStrokeConsistent(){
    try{
        if(selection.length > 1){
            if(selection[0].typename == "TextFrame"){
                
                for(var index=1; index < selection.length; index++){
                    var aCharAttrib = selection[0].textRange.characterAttributes;
                    if(aCharAttrib.strokeColor.typename == "NoColor"){
                            var noColor = new NoColor();
                            selection[index].textRange.characterAttributes.strokeColor = noColor;
                    }else{
                        selection[index].textRange.characterAttributes.strokeColor = aCharAttrib.strokeColor;
                    }
                }
                 if(aCharAttrib.strokeColor.typename != "NoColor"){
                    for(var index=1; index < selection.length; index++){
                        selection[index].textRange.characterAttributes.strokeWeight = aCharAttrib.strokeWeight;
                    }
                }
                
            }
        }else{
            alert("No textbox is selected!");
        }
    }catch(error){
       alert(error.message); 
    }
}

// This function will make the fill color of the text consistent for the selected text object.
function makeFillConsistent(){
    try{
        if(selection.length > 1){
            if(selection[0].typename == "TextFrame"){
                
                for(var index=1; index < selection.length; index++){
                    var aCharAttrib = selection[0].textRange.characterAttributes;
                    if(aCharAttrib.fillColor.typename == "NoColor"){
                            var noColor = new NoColor();
                            selection[index].textRange.characterAttributes.fillColor = noColor;
                    }else{
                        selection[index].textRange.characterAttributes.fillColor = aCharAttrib.fillColor;
                    }
                }
                
            }
        }else{
            alert("No textbox is selected!");
        }
    }catch(error){
       alert(error.message); 
    }
}

// This function will export the active art board as a RGB TIFF file
function exportTIFFRGB(){
    try{
        var des = activeDocument.path+"/exportedFileRGB.tiff";
        var docExTIFF = new ExportOptionsTIFF();
        docExTIFF.saveMultipleArtboards = true;
        docExTIFF.artboardRange = "1";
        docExTIFF.antiAliasing = AntiAliasingMethod.ARTOPTIMIZED;
        docExTIFF.byteOrder = TIFFByteOrder.IBMPC;
        docExTIFF.imageColorSpace = ImageColorSpace.RGB;
        docExTIFF.IZWCompression = false;
        docExTIFF.resolution = 300;
        
        var type = ExportType.TIFF;
        var fileSpec = new File(des);
        
        activeDocument.exportFile(fileSpec, type, docExTIFF);
        alert("Export artboard as RGB complete!");
    }catch(error){
        alert(error.message);
    }
}

//This function will export the active art board as a CMYK TIFF file
function exportTIFFCMYK(){
    try{
        var des = activeDocument.path+"/exportedFileCMYK.tiff";
        var docExTIFF = new ExportOptionsTIFF();
        docExTIFF.saveMultipleArtboards = true;
        docExTIFF.artboardRange = "1";
        docExTIFF.antiAliasing = AntiAliasingMethod.ARTOPTIMIZED;
        docExTIFF.byteOrder = TIFFByteOrder.IBMPC;
        docExTIFF.imageColorSpace = ImageColorSpace.CMYK;
        docExTIFF.IZWCompression = false;
        docExTIFF.resolution = 300;
        
        var type = ExportType.TIFF;
        var fileSpec = new File(des);
        
        activeDocument.exportFile(fileSpec, type, docExTIFF);
        alert("Export artboard as CMYK complete!");
    }catch(error){
        alert(error.message);
    }
}

// This function will select all text objects that has the same font-family
function selectAllSameFont(){
    try{             
        if(selection.length == 1){
            var font = selection[0].textRange.characterAttributes.textFont.name;
            for(var index=0; index < activeDocument.textFrames.length; index++){
                var curFont = activeDocument.textFrames[index].textRange.characterAttributes.textFont.name;
                if(font == curFont){
                    activeDocument.textFrames[index].selected = true;
                }
            }
        }else{
            alert("Please select 1 textbox!");
        }
    }catch(error){
        alert(error.message);
    }
}

//This function will create a interaction between 2 panel
function bridgeTalkThis(message){
    bridgeTalk.target = "illustrator";
    bridgeTalk.body = message;
    bridgeTalk.onError = function(error){
        alert(error.body);
    }
    bridgeTalk.send();
}

//This will create the UI that that user can select.
function createMainUI(){
    windowPalette = new Window("palette","Proofing Assistant");
        textMessage = windowPalette.add("staticText");
            textMessage.text = "Select a textbox!";        
        btnAllTextPropties = windowPalette.add("button {text:'Show Text Properties'}");
            btnAllTextPropties.onClick = function(){bridgeTalkThis(textListProperties.toString()+"textListProperties();");}
        
        manipulationPanel = windowPalette.add("panel {text:'Manipulate Text'}");
            manipulationPanel.preferredSize.width = 200;
            manipulationPanel.alignChildren = "fill";
            btnSelectSameFont = manipulationPanel.add("button {text:'Select Same Font'}");
                btnSelectSameFont.onClick = function(){bridgeTalkThis(selectAllSameFont.toString()+"selectAllSameFont();");}
            btnCombineText = manipulationPanel.add("button {text:'Combine Text'}");
                btnCombineText.onClick = function(){bridgeTalkThis(combineText.toString()+"combineText();");}
        
        cosistencyPanel = windowPalette.add("panel {text:'Consistent Text'}");
            cosistencyPanel.preferredSize.width = 200;
            cosistencyPanel.alignChildren = "fill";
            btnMakeSizeConsistent = cosistencyPanel.add("button {text:'Consistent Size'}");
                btnMakeSizeConsistent.onClick = function(){bridgeTalkThis(makeSizeConsistent.toString()+"makeSizeConsistent();");}
            btnMakeTrackingConsistent = cosistencyPanel.add("button {text:'Consistent Tracking'}");
                btnMakeTrackingConsistent.onClick = function(){bridgeTalkThis(makeTrackingConsistent.toString()+"makeTrackingConsistent();");}
            btnMakeStrokeConsistent = cosistencyPanel.add("button {text:'Consistent Stroke'}");
                btnMakeStrokeConsistent.onClick = function(){bridgeTalkThis(makeStrokeConsistent.toString()+"makeStrokeConsistent();");}
            btnMakeFillConsistent = cosistencyPanel.add("button {text:'Consistent Fill'}");
                btnMakeFillConsistent.onClick = function(){bridgeTalkThis(makeFillConsistent.toString()+"makeFillConsistent();");}
        
        cftPanel = windowPalette.add("panel {text:'Custom Foil Export'}");
            cftPanel.preferredSize.width = 200;
            cftPanel.alignChildren = "fill";
            btnExportRGBTIFF = cftPanel.add("button {text:'Export RGB'}");
                btnExportRGBTIFF.onClick = function(){bridgeTalkThis(exportTIFFRGB.toString()+"exportTIFFRGB();");}
            btnExportCMYKTIFF = cftPanel.add("button {text:'Export CMYK'}");
                btnExportCMYKTIFF.onClick = function(){bridgeTalkThis(exportTIFFCMYK.toString()+"exportTIFFCMYK();");}

    windowPalette.show();
}

//This will create a table for all the text that is available in the illustrator art board.
function textListProperties(){    
    var sWin =  new Window("palette","All Text Properties");        
        var individualPanel = sWin.add("panel {text:'List of Text Properties'}");
        
        var headerGroup = individualPanel.add("group");
            headerGroup.add("staticText {text:'Font Name',justify:'center'}").preferredSize.width = 200;
            headerGroup.add("staticText {text:'Size',justify:'center'}").preferredSize.width = 50;
            headerGroup.add("staticText {text:'Tracking',justify:'center'}").preferredSize.width = 80;
            headerGroup.add("staticText {text:'S. Weight',justify:'center'}").preferredSize.width = 80;
            headerGroup.add("staticText {text:'Stroke Color',justify:'center'}").preferredSize.width = 80;
            headerGroup.add("staticText {text:'Fill Color',justify:'center'}").preferredSize.width = 80;

    // Populate Property Panel
        var textFrameObjects = activeDocument.textFrames;
        var spots = activeDocument.spots;
        var numOfTextFrame = textFrameObjects.length;        
        
        function setTextSize(size, index){
            if(textFrames[index].textRange.characterAttributes.size != size){
                textFrames[index].textRange.characterAttributes.size = size;
            }
        }
        function setTextTracking(tracking, index){
            if(textFrames[index].textRange.characterAttributes.tracking != tracking){
                textFrames[index].textRange.characterAttributes.tracking = tracking;                
            }
        }
        function setTextStrokeWeight(strokeWeight, index){
            if(textFrames[index].textRange.characterAttributes.strokeWeight != strokeWeight){
                textFrames[index].textRange.characterAttributes.strokeWeight = strokeWeight;
                if(strokeWeight == 0){
                    var noColor = new NoColor();
                    textFrames[index].textRange.characterAttributes.strokeColor = noColor;
                }else{
                    if(textFrames[index].textRange.characterAttributes.fillColor.typename == "NoColor"){
                        var cmyk = new CMYKColor();
                        cmyk.cyan = 0;
                        cmyk.magenta = 0;
                        cmyk.yellow = 0;
                        cmyk.black = 0;
                        textFrames[index].textRange.characterAttributes.strokeColor = cmyk;
                    }else{
                        textFrames[index].textRange.characterAttributes.strokeColor = textFrames[index].textRange.characterAttributes.fillColor;
                    }
                }
            }
        }
        function setTextStrokeColor(color, index){
            if(textFrames[index].textRange.characterAttributes.strokeWeight > 0){
                textFrames[index].textRange.characterAttributes.strokeColor = color;
            }
        }
        function setTextFillColor(color, index){
            switch(color){
                    case "None":
                        if(textFrames[index].textRange.characterAttributes.fillColor.typename != "NoColor"){
                            textFrames[index].textRange.characterAttributes.fillColor = new NoColor();
                        }
                    break;
                    case "FOIL":
                        if(textFrames[index].textRange.characterAttributes.fillColor.typename != "SpotColor"){
                            var spotName = "None";
                            var cnt = 0;
                            while(cnt < doc.spots.length && spotName != "FOIL"){
                                if(doc.spots[cnt].name == "FOIL"){
                                    spotName = doc.spots[cnt].name;
                                }else{
                                    cnt++;
                                }
                            }
                            if(spotName == "FOIL"){
                                var spotColor = new SpotColor();
                                spotColor.spot = doc.spots[cnt];
                                spotColor.tint = 100;
                                textFrames[index].textRange.characterAttributes.fillColor = spotColor;
                                setTextStrokeColor(textFrames[index].textRange.characterAttributes.fillColor, index);
                            }else{
                                alert("No Foil Color Found!");
                            }
                        }
                    break;
                    default:
                        var colors = color.split(",");
                        if(colors.length == 4){
                            colors[0] = parseFloat(colors[0])%101;
                            colors[1] = parseFloat(colors[1])%101;
                            colors[2] = parseFloat(colors[2])%101;
                            colors[3] = parseFloat(colors[3])%101;
                            var cmyk = new CMYKColor();
                            cmyk.cyan = colors[0];
                            cmyk.magenta = colors[1];
                            cmyk.yellow = colors[2];
                            cmyk.black = colors[3];
                            textFrames[index].textRange.characterAttributes.fillColor = cmyk;
                            setTextStrokeColor(textFrames[index].textRange.characterAttributes.fillColor, index);
                        }else{
                            alert("Invalid Value");
                        }
                    break;
            }
        }        
        function bridgeTalk(message){            
            var bt = new BridgeTalk();
            bt.target = "illustrator";
            bt.body = message;
            bt.onError = function(error){
                alert(error.body);
            }
            bt.send();
        }
        
        for(var index=0; index < numOfTextFrame; index++){
            var charAttri = textFrameObjects[index].textRange.characterAttributes;
            var inGroup = individualPanel.add("group");
            
                var inFontName = inGroup.add("staticText");
                    inFontName.preferredSize.width = 200;
                    inFontName.text = charAttri.textFont.name;
                    
                var inTextSize = inGroup.add("editText {name:'"+index+"', enterKeySignalsOnChange: true}");
                    inTextSize.preferredSize.width = 50;
                    inTextSize.text = charAttri.size;
                    inTextSize.onChange = function(){
                        bridgeTalk(
                            "var textFrames = activeDocument.textFrames;" +
                            setTextSize.toString() + "setTextSize("+parseFloat(this.text)+", "+parseInt(this.name)+");"
                        );
                    }
                    
                var inTracking = inGroup.add("editText {name:'"+index+"', enterKeySignalsOnChange: true}");
                    inTracking.preferredSize.width = 80;
                    inTracking.text = charAttri.tracking;
                    inTracking.onChange = function(){
                        bridgeTalk(
                            "var textFrames = activeDocument.textFrames;" +
                            setTextTracking.toString() + "setTextTracking("+parseFloat(this.text)+", "+parseInt(this.name)+");"
                        );
                    }
                    
                var inStrokeWeight = inGroup.add("editText {name:'"+index+"', enterKeySignalsOnChange: true}");
                    inStrokeWeight.preferredSize.width = 80;
                    inStrokeWeight.onChange = function(){
                        bridgeTalk(
                            "var textFrames = activeDocument.textFrames;" +
                            setTextStrokeWeight.toString() + "setTextStrokeWeight("+parseFloat(this.text)+", "+parseInt(this.name)+");"
                        );
                        if(this.text != 0){
                            individualPanel.children[parseInt(this.name)+1].children[4].text = individualPanel.children[parseInt(this.name)+1].children[5].text;
                        }else{
                            individualPanel.children[parseInt(this.name)+1].children[4].text = "None";
                        }
                    }
                    
                var inStrokeColor = inGroup.add("editText");
                    inStrokeColor.preferredSize.width = 80;
                    inStrokeColor.enabled = false;
                    
                var inFillColor = inGroup.add("editText {name:'"+index+"', enterKeySignalsOnChange: true}");
                    inFillColor.preferredSize.width = 80;
                    var hasStroke = true;
                    switch(charAttri.strokeColor.typename){
                            case "NoColor": 
                                inStrokeWeight.text = 0;
                                inStrokeColor.text = "None";
                                hasStroke = false;
                            break;
                            case "SpotColor": 
                                inStrokeColor.text = "FOIL";
                            break;
                            case "CMYKColor": 
                                inStrokeColor.text = charAttri.strokeColor.cyan.toFixed(0)+","+charAttri.strokeColor.magenta.toFixed(0)+","+charAttri.strokeColor.yellow.toFixed(0)+","+charAttri.strokeColor.black.toFixed(0);
                            break;
                            default: alert("Not Supported Color!");
                    }
                    if(hasStroke){                    
                            inStrokeWeight.text = charAttri.strokeWeight.toFixed(3);
                    }
                    switch(charAttri.fillColor.typename){
                            case "NoColor": 
                                inFillColor.text = "None";
                            break;
                            case "SpotColor": 
                                inFillColor.text = "FOIL";
                            break;
                            case "CMYKColor": 
                                inFillColor.text = charAttri.fillColor.cyan.toFixed(0)+","+charAttri.fillColor.magenta.toFixed(0)+","+charAttri.fillColor.yellow.toFixed(0)+","+charAttri.fillColor.black.toFixed(0);
                            break;
                            default: alert("Not Supported Color!");
                    }                    
                    inFillColor.onChange = function(){
                        bridgeTalk(
                            "var textFrames = activeDocument.textFrames; var doc = activeDocument;" +
                            setTextStrokeColor.toString() +
                            setTextFillColor.toString() + "setTextFillColor('"+this.text+"', "+parseInt(this.name)+");"
                        );
                        if(individualPanel.children[parseInt(this.name)+1].children[3].text != 0 && this.text != "None"){
                            individualPanel.children[parseInt(this.name)+1].children[4].text = individualPanel.children[parseInt(this.name)+1].children[5].text;
                        }else{
                            individualPanel.children[parseInt(this.name)+1].children[4].text = "None";
                        }
                    }
        }
    var actionPanel = sWin.add("panel");
        actionPanel.alignment = "fill";
        actionPanel.alignChildren = "right";
        var agroup = actionPanel.add("group");
            var cancelBtn = agroup.add("button {text:'Close'}");
                cancelBtn.onClick = function(){
                    sWin.close();
                }
                
    
    sWin.show();
}

createMainUI();

