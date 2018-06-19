var canvas = this.__canvas = new fabric.StaticCanvas('c');
var canvasBG_color_url = 'assets/img/black';
var canvasBG_side_url = '/_front.png';
var canvasBG_url = canvasBG_color_url + canvasBG_side_url;


function changeCanvasBgUrl(){
	return canvasBG_url = canvasBG_color_url + canvasBG_side_url;
};

function flipToFront() {
	canvasBG_side_url = '/_front.png';
	changeCanvasBgUrl();
	sdsd();
};
function flipToBack() {
	canvasBG_side_url = '/_back.png';
	changeCanvasBgUrl();
	sdsd();
	
};

function sdsd() {

	fabric.Image.fromURL(canvasBG_url, function(img) {
		canvas.add(img.set({ left: 0, top: 0, angle: 0, selectable:false }).scale(1));
	});

};
