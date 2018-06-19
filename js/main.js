var canvas = this.__canvas = new fabric.StaticCanvas('c');
var canvasBG_color_url = 'assets/img/white';
var canvasBG_side_url = '/_front.png';
var canvasBG_url = canvasBG_color_url + canvasBG_side_url;



function colorChange(color){
	canvasBG_color_url = 'assets/img/' + color;
	changeCanvasBgUrl();
	renderTshirt();
};

function flipToFront() {
	canvasBG_side_url = '/_front.png';
	changeCanvasBgUrl();
	renderTshirt();
};
function flipToBack() {
	canvasBG_side_url = '/_back.png';
	changeCanvasBgUrl();
	renderTshirt();
};

function changeCanvasBgUrl(){
	return canvasBG_url = canvasBG_color_url + canvasBG_side_url;
};

function renderTshirt() {
	fabric.Image.fromURL(canvasBG_url, function(img) {
		canvas.add(img.set({ left: 0, top: 0, angle: 0, selectable:false }).scale(1));
	});
};

renderTshirt();