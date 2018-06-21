//default white t-shirt on page load
var canvasBG_color_url = './assets/img/white';
// link building when swapping  whirt colors
var canvasBG_front_url = canvasBG_color_url + '/_front.png';
var canvasBG_back_url = canvasBG_color_url + '/_back.png';
var activeCanvas = $('.activeCanvas').attr('id');

//toggle front-back shirt image
$( ".flip-switcher" ).click(function() {
	// $( ".toggle" ).toggle("teetttett");
	$(".toggle").toggleClass("displayCanvas activeCanvas");
	//activeCanvas variable, for find canvas we need when adding objects
	activeCanvas = $('.activeCanvas').attr('id');
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
//-get "Добавить текст" button
var addTextButton = $('.addTextButton');
var aTextColor = '#666';

function changeTextButtonColor(){
	$('.addTextButton').css('color', aTextColor);
};

$("#flat").spectrum({
    flat: true,
	showInput: true,
	//- move event, changing textColor var
	move: function(tinycolor) {
		aTextColor = tinycolor.toHexString();
		changeTextButtonColor();
	},
});



//-------------------------------t-shirt colors-------------------------------//
//rerender with new links with chosen colors
refreshShirtColor();
//change color links after option input
function colorChange(color){
	canvasBG_color_url = './assets/img/' + color;
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
	canvasBack.setBackgroundImage(canvasBG_back_url, canvasBack.renderAll.bind(canvasBack));
};



//-------------------------------adding Objects-------------------------------//
//-----------------Arts-----------------//
function addArt(src){
	if (activeCanvas == 'canvasFront'){

		fabric.Image.fromURL(src, function(img) {
			img.scale(1).set({
				left: 100,
				top: 100,
			});
			canvasFront.add(img).setActiveObject(img);
		});



	} else {


		fabric.Image.fromURL(src, function(img) {
			img.scale(1).set({
				left: 100,
				top: 100,
			});
			canvasBack.add(img).setActiveObject(img);
		});


	}
	
};



//-----------------Text-----------------//
function addText(){
	if (activeCanvas == 'canvasFront'){

		canvasFront.add(new fabric.IText('Кликни, измени', { 
			fontFamily: 'Comfortaa',
			left: 100, 
			top: 100 ,
			fontSize: 20,
			fill:aTextColor
		}));
	}	else	{

		canvasBack.add(new fabric.IText('Кликни, измени', { 
			fontFamily: 'Comfortaa',
			left: 100, 
			top: 100 ,
			fontSize: 20,
			fill:aTextColor
		}));
	}

}
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
    if(!eval(canvasFront).getActiveObject())
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
