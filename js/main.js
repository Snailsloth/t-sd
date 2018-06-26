//reset forms
function resetForms() {
    document.getElementById('customFabric').reset();
}
resetForms();

//------object for data we gonna showin modal and send to server------//
var tshirtVault = {
	"h-fr-the-collar_Front":10,
	"img-h_Front":70,
	"img-w_Front":50,
	"h-fr-the-collar_Back":0,
	"img-h_Back":0,
	"img-w_Back":0,
	"clientName":0,
	"clientMail":0,
	"clientSize":0,
	"clientColor":"navy",
	"clientQuantity":10,
	"clientNotes":"",
	"clientMaterial":"Фланель",
	"canvasFrontPreview": 0,
	"canvasBackPreview": 0,
	"paintMaterial":"Белым мелом"
};

$("#h-fr-the-collar_Front").bind("keyup change", function() {
    tshirtVault["h-fr-the-collar_Front"] = $('#h-fr-the-collar_Front').val();
});
$("#img-h_Front").bind("keyup change", function() {
    tshirtVault["img-h_Front"] = $('#img-h_Front').val();
});
$("#img-w_Front").bind("keyup change", function() {
    tshirtVault["img-w_Front"] = $('#img-w_Front').val();
});

$("#h-fr-the-collar_Back").bind("keyup change", function() {
    tshirtVault["h-fr-the-collar_Back"] = $('#h-fr-the-collar_Back').val();
});
$("#img-h_Back").bind("keyup change", function() {
    tshirtVault["img-h_Back"] = $('#img-h_Back').val();
});
$("#img-w_Back").bind("keyup change", function() {
    tshirtVault["img-w_Back"] = $('#img-w_Back').val();
});


$("#clientName").bind("keyup change", function() {
    tshirtVault["clientName"] = $('#clientName').val();
});
$("#clientMail").bind("keyup change", function() {
    tshirtVault["clientMail"] = $('#clientMail').val();
});
$("#clientSize").bind("keyup change", function() {
    tshirtVault["clientSize"] = $('#clientSize').val();
});
$("#clientColor").bind("keyup change", function() {
    tshirtVault["clientColor"] = $('#clientColor').val();
});
$("#clientQuantity").bind("keyup change", function() {
    tshirtVault["clientQuantity"] = $('#clientQuantity').val();
});
$("#clientNotes").bind("keyup change", function() {
    tshirtVault["clientNotes"] = $('#clientNotes').val();
});
$("#clientMaterial").bind("keyup change click", function() {
    tshirtVault["clientMaterial"] =  $('input[name="clientMaterial"]:checked').val();
});
$("#paintMaterial").bind("keyup change click", function() {
    tshirtVault["paintMaterial"] =  $('input[name="paintMaterial"]:checked').val();
});
//-------------------------------------------------------------------//










//default t-shirt link on page load
var canvasBG_color_url = 'assets/img/navy';
// link building when swapping  whirt colors
var canvasBG_front_url = canvasBG_color_url + '/_front.png';
var canvasBG_back_url = canvasBG_color_url + '/_back.png';
var activeCanvas = $('.activeCanvas').attr('id');

//toggle front-back shirt image
$( ".flip-switcher--front" ).click(function() {

	$(".toggle").toggleClass("activeCanvas");
		//activeCanvas variable, for find canvas we need when adding objects
		activeCanvas = "canvasFront";
		//remove delete object button
		$(".deleteBtn").remove();
	
});

$( ".flip-switcher--back" ).click(function() {

	$(".toggle").toggleClass("activeCanvas");
		//activeCanvas variable, for find canvas we need when adding objects
		activeCanvas = "canvasBack";
		//remove delete object button
		$(".deleteBtn").remove();
	
});


//tshirt front
var canvasFront =  new fabric.Canvas('canvasFront', {
});
//tshirt back
var canvasBack =  new fabric.Canvas('canvasBack', {
});


//-------------------------------color picker-------------------------------//

//-------------------------------t-shirt colors-------------------------------//
//rerender with new links with chosen colors
refreshShirtColor();
//change color links after option input
function colorChange(color){
	canvasBG_color_url = 'assets/img/' + color;
	changeCanvasBgUrl();
	refreshShirtColor();
	return canvasBG_color_url,canvasBG_front_url,canvasBG_back_url;
};
function changeCanvasBgUrl(){
	canvasBG_front_url = canvasBG_color_url + '/_front.png';
	canvasBG_back_url = canvasBG_color_url + '/_back.png';
	return canvasBG_front_url,canvasBG_back_url;
};
function refreshShirtColor(){
	canvasFront.setBackgroundImage(canvasBG_front_url, canvasFront.renderAll.bind(canvasFront));
	

	// canvasBack.Image.fromURL(canvasBG_front_url,canvasFront.renderAll.bind(canvasFront))

	canvasBack.setBackgroundImage(canvasBG_back_url, canvasBack.renderAll.bind(canvasBack));
};


// fabric.Image.fromURL(canvasBG_front_url, function(oImg) {
// 	// scale image down, and flip it, before adding it onto canvas
// 	oImg.scale(0.5).set('flipX', true);
// 	canvasFront.add(oImg);
// });

//-------------------------------adding Objects-------------------------------//
//-----------------Arts-----------------//
var printArtFront = [];
function addArt(src){
	if (activeCanvas == 'canvasFront'){
		$(".deleteBtn").remove();
		canvasFront.remove(canvasFront._objects[0]);
		fabric.Image.fromURL(src, function(printArtFront) {
			printArtFront.scale(1).set({
				left: 100,
				top: 100,
			});
			printArtFront.scaleToWidth(canvasFront.getWidth()/2);
			canvasFront.add(printArtFront).setActiveObject(printArtFront);
		});



	} else {

		$(".deleteBtn").remove();
		canvasBack.remove(canvasFront._objects[0]);
		fabric.Image.fromURL(src, function(img) {
			img.scale(1).set({
				left: 100,
				top: 100,
			});
			img.scaleToWidth(canvasBack.getWidth()/2);
			canvasBack.add(img).setActiveObject(img);
		});


	}
	
};



//-----------------Text-----------------//

//-------------------------------removing Objects-------------------------------//


function addDeleteBtn(x, y, w){
	$(".deleteBtn").remove(); 
	var btnLeft = x;
	var btnTop = y - 25;
	var widthadjust=w/2;
	btnLeft=widthadjust+btnLeft-10;
	var deleteBtn = '<img src="assets/img/remove.png" class="deleteBtn" style="width:30px; position:absolute;top:'+btnTop+'px;left:'+btnLeft+'px;cursor:pointer;"/>';
	$(".canvas-container").append(deleteBtn);
}


//-i'am very ashamed about things down there, mkay
canvasFront.on('object:selected',function(e){
		addDeleteBtn(e.target.oCoords.mt.x, e.target.oCoords.mt.y, e.target.width);
});

canvasFront.on('mouse:down',function(e){
    if(canvasFront.getActiveObject())
    {
		$(".deleteBtn").remove(); 
    }
});

canvasFront.on('object:modified',function(e){
	addDeleteBtn(e.target.oCoords.mt.x, e.target.oCoords.mt.y, e.target.width);
});

canvasFront.on('object:moving',function(e){
	$(".deleteBtn").remove(); 
});

$(document).on('click',".deleteBtn",function(){
	if(canvasFront.getActiveObject())
	{
		canvasFront.remove(canvasFront.getActiveObject());
		$(".deleteBtn").remove();
	}
});

canvasBack.on('object:selected',function(e){
	addDeleteBtn(e.target.oCoords.mt.x, e.target.oCoords.mt.y, e.target.width);
});

canvasBack.on('mouse:down',function(e){
if(!eval(canvasBack).getActiveObject())
{
	$(".deleteBtn").remove(); 
}
});

canvasBack.on('object:modified',function(e){
addDeleteBtn(e.target.oCoords.mt.x, e.target.oCoords.mt.y, e.target.width);
});

canvasBack.on('object:moving',function(e){
$(".deleteBtn").remove(); 
});

$(document).on('click',".deleteBtn",function(){
if(canvasBack.getActiveObject())
{
	canvasBack.remove(canvasBack.getActiveObject());
	$(".deleteBtn").remove();
}
});






//only png
// function checkFileExtension() {
//     var fileName = document.getElementById("imgLoader").value;

//     if(!fileName)
//       return false;

//     var extension = fileName.split(".");
//     if(extension && extension.length > 1){
//         extension = [extension.length-1].toUpperCase();
//         if (["PNG"].indexOf(extension) != -1)
//             return true;
//         else{
//             alert("Browse to upload a valid File with png extension");
//             return false;
//         }
//     }
//     else{
//         alert("Browse to upload a valid File with png extension");
//         return false;
//     }
// };
//image loader by jaibuu https://jsfiddle.net/jaibuu/Vp6wa/
document.getElementById('imgLoader').onchange = function handleImage(e) {
	var reader = new FileReader();
		reader.onload = function (event) { 
			var imgObj = new Image();
			imgObj.src = event.target.result;
			imgObj.onload = function () {
				// start fabricJS stuff
				
				var image = new fabric.Image(imgObj);
				image.set({
					left: 0,
					top: 0,
					angle: 0,
					padding: 10,
					cornersize: 10
				});
				image.scaleToWidth(canvasFront.getWidth()/2);
				//image.scale(getRandomNum(0.1, 0.25)).setCoords();
				if (activeCanvas == 'canvasFront'){
					canvasFront.add(image);
				} else{
					canvasBack.add(image);
				}
				
				
				// end fabricJS stuff
			}
			
		}
		reader.readAsDataURL(e.target.files[0]);
}


//get previews of t-shirts for server
function getPreviews(){

		// canvas.deactivateAll().renderAll();  
		window.open(canvasFront.toDataURL('png')); 
		window.open(canvasBack.toDataURL('png')); 

};


// function showArtPreviews(){
// 	var folder = "assets/img/arts";

// 	$.ajax({
// 		url : folder,
// 		success: function (data) {
// 			$(data).find("a").attr("href", function (i, val) {
// 				if( val.match(/\.(jpe?g|png|gif)$/) ) { 
// 					$("body").append( "<img src='"+ folder + val +"'>" );
// 				} 
// 			});
// 		}
// 	});
// };

// showArtPreviews();




//blink text animation
$(function () {
    $('div.highlightable').click(function () {
        $(this).addClass('highlighted');
        setTimeout(function () {
            $('div.highlightable').removeClass('highlighted');
        }, 2000);
    });
});



//check if name,male and arts was not added
function checkImportantData(){
	if (tshirtVault.clientName == 0){
		alert('Поле "Имя" не заполнено')
		return false;
	} else if(tshirtVault.clientMail == 0){
		alert('Вы почту забыли оставить')
		return false;
	}
	else {
		return true;
	}
}

var finalModal = UIkit.modal('#orderSummation');

function compileModal(){
	$( '#clientNameCompiled' ).text( tshirtVault.clientName );
	$( '#clientMailCompiled' ).text( tshirtVault.clientMail );
	$( '#clientSizeCompiled' ).text( tshirtVault.clientSize );
	$( '#clientColorCompiled' ).text( tshirtVault.clientColor );
	$( '#clientQuantityCompiled' ).text( tshirtVault.clientQuantity);
	$( '#clientNotesCompiled' ).text( tshirtVault.clientNotes );
	$( '#clientMaterialCompiled' ).text( tshirtVault.clientMaterial );
	$( '#paintMaterialCompiled' ).text( tshirtVault.paintMaterialCompiled );
	$( '#h-fr-the-collar_FrontCompiled' ).text( tshirtVault["h-fr-the-collar_Front"] );
	$( '#img-w_FrontCompiled' ).text( tshirtVault["img-w_Front"] );
	$( '#img-h_FrontCompiled' ).text( tshirtVault["img-h_Front"] );
	tshirtVault.canvasFrontPreview = canvasFront.toDataURL('png');
	tshirtVault.canvasBackPreview = canvasBack.toDataURL('png');
	$("#canvasFrontPreviewCompiled").attr("src",tshirtVault.canvasFrontPreview);
	$("#canvasBackPreviewCompiled").attr("src",tshirtVault.canvasBackPreview);
};



function orderSummationStart(){
	if(checkImportantData()){
		alert("Открываем!");
		compileModal();
		UIkit.modal('#orderSummation').show();
	}
}

