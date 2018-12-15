var slider;
describe("When slider is initialized", function() {
	beforeEach(function() {
		if(typeof slider == 'undefined')
			slider = new FadeSlider('list');
	});
	

	it("should be out of user's view port", function() {
		var elmt = document.querySelector('#fade-slider-'+slider.id);
		expect(elmt.style.position).toEqual('absolute');
		expect(elmt.style.left).toEqual('-'+(3*window.outerWidth)+'px');
	});

	it("should hide other images but the first one", function() {
		var elmts = document.querySelectorAll('#fade-slider-'+slider.id+'.fade-slider .fade-slider-images .fade-slider-image');
		for(var i=0; i<elmts.length; i++){
			elmt = elmts[i];
			if (i == 0)
				expect(elmt.style.display).toEqual('block');
			else
				expect(elmt.style.display).toEqual('none');
		}
	});

	it("should set image to fill available width", function() {
		var elmts = document.querySelectorAll('#fade-slider-'+slider.id+'.fade-slider .fade-slider-images .fade-slider-image img');
		var elmts2 = document.querySelectorAll('#fade-slider-'+slider.id+'.fade-slider .fade-slider-images .fade-slider-image');
		elmts.forEach(function(elmt){
			expect(elmt.style.width).toEqual('100%');
		});
		elmts2.forEach(function(elmt){
			expect(elmt.style.width).toEqual('80%');
		});
	});

	it("should set display of images container to relative", function() {
		var elmts = document.querySelectorAll('#fade-slider-'+slider.id+'.fade-slider .fade-slider-images');
		elmts.forEach(function(elmt){
			expect(elmt.style.position).toEqual('relative');
		});
	});

	it("should set absolute possition of image container to 0, exept the first image", function() {
		var elmts = document.querySelectorAll('#fade-slider-'+slider.id+'.fade-slider .fade-slider-images .fade-slider-image');
		for(var i=0;i<elmts.length;i++){
			elmt = elmts[i];
			if(i==0)
				expect(elmt.style.top).toEqual('');
			else
				expect(elmt.style.top).toEqual('0px');
		};
	});

	it("should load the the images into the slider container", function() {
		var elmts = document.querySelectorAll('#fade-slider-'+slider.id+'.fade-slider .fade-slider-images .fade-slider-image img');
		expect(elmts.length).toEqual(4);
	});

	it("should add slider markup bellow list", function() {
		var elmtMarkup = document.querySelector('#fade-slider-'+slider.id+'.fade-slider');
		expect(elmtMarkup).not.toEqual(null);
	});

	it("should load images in a collection", function() {
		expect(slider.images.length).toEqual(4);
	});
});

describe("image", function() {
	beforeEach(function() {
		if(typeof slider == 'undefined')
			slider = new FadeSlider('list');
	});

	it("should be displayed when clicked", function() {
		slider.showImage(3);
		var elmts = document.querySelectorAll('#fade-slider-'+slider.id+'.fade-slider .fade-slider-images .fade-slider-image img');
		for(var i=0; i<elmts.length; i++){
			elmt = elmts[i];
			if (i == 3)
				expect(elmt.style.display).toEqual('block');
			else
				expect(elmt.style.display).toEqual('none');
		}
	});

	it("should be vertically centered", function() {
		slider.showImage(3);
		var sliderElm = document.querySelector('#fade-slider-'+slider.id+'.fade-slider');
		var elmts = document.querySelectorAll('#fade-slider-'+slider.id+'.fade-slider .fade-slider-images .fade-slider-images');
		expect(sliderElm.style.display).toEqual('table');
		for(var i=0; i<elmts.length; i++){
			expect(elmts[i].style.display).toEqual('table-cell');
			expect(elmts[i].style.verticalAlign).toEqual('middle');
		}
	});

	it("should be horizontally centered", function() {
		slider.showImage(3);
		var elmts = document.querySelectorAll('#fade-slider-'+slider.id+'.fade-slider .fade-slider-images .fade-slider-image');
		for(var i=0; i<elmts.length; i++){
			expect(elmts[i].style.marginLeft).toEqual('auto');
			expect(elmts[i].style.marginRight).toEqual('auto');
		}
	});
});
