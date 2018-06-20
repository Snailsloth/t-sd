$( ".flip-switcher" ).click(function() {
	$( ".toggle" ).toggle();
});


var canvasFront =  new fabric.StaticCanvas('front', {
	width:480,
	height:510,
});
var canvasBack =  new fabric.StaticCanvas('back', {
	width:480,
	height:510,
});



var canvasBG_color_url = 'assets/img/white';
// var canvasBG_side_url = '/_front.png';
var canvasBG_front_url = canvasBG_color_url + '/_front.png';
var canvasBG_back_url = canvasBG_color_url + '/_back.png';



function colorChange(color){
	canvasBG_color_url = 'assets/img/' + color;
	changeCanvasBgUrl()
	return canvasBG_color_url,canvasBG_front_url,canvasBG_back_url;
};
function changeCanvasBgUrl(){
	canvasBG_front_url = canvasBG_color_url + '/_front.png';
	canvasBG_back_url = canvasBG_color_url + '/_back.png';
	return canvasBG_front_url,canvasBG_back_url;
};



fabric.Image.fromURL(canvasBG_front_url , function(img){
	canvasFront.add(img);
	img.center();
});

fabric.Image.fromURL(canvasBG_back_url , function(img){
	canvasBack.add(img);
	img.center();
});

