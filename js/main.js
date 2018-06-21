var canvasBG_color_url = 'assets/img/white';
// var canvasBG_side_url = '/_front.png';
var canvasBG_front_url = canvasBG_color_url + '/_front.png';
var canvasBG_back_url = canvasBG_color_url + '/_back.png';
var activeCanvas = $('.activeCanvas').attr('id');;

//toggle front-back shirt image
$( ".flip-switcher" ).click(function() {
	$( ".toggle" ).toggle("teetttett");
	$(".toggle").toggleClass("displayCanvas activeCanvas");
	activeCanvas = $('.activeCanvas').attr('id');
	
});

//tshirt front
var canvasFront =  new fabric.Canvas('canvasFront', {
	// width:480,
	// height:510,
});
//tshirt back
var canvasBack =  new fabric.Canvas('canvasBack', {
	// width:480,
	// height:510,
});





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
	canvasBack.setBackgroundImage(canvasBG_back_url, canvasBack.renderAll.bind(canvasBack));
};



//-------------------------------adding objects-------------------------------//
// canvasFront.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
// canvasFront.hoverCursor = 'pointer';
// this.__canvases.push(canvasFront);



function addArt(src){
	if (activeCanvas == 'canvasFront'){

		fabric.Image.fromURL(src, function(img) {
			img.scale(0.2).set({
				left: 100,
				top: 100,
			});
			canvasFront.add(img).setActiveObject(img);
		});



	} else {


		fabric.Image.fromURL(src, function(img) {
			img.scale(0.2).set({
				left: 100,
				top: 100,
			});
			canvasBack.add(img).setActiveObject(img);
		});


	}
	
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