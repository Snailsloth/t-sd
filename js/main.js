(function() {
var canvas = this.__canvas = new fabric.StaticCanvas('c');

fabric.Image.fromURL('assets/img/black_front.png', function(img) {
	canvas.add(img.set({ left: 0, top: 0, angle: 0 }).scale(1));
});


})();
