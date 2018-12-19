var fadeViewer = null;
describe("FadeViewer", function() {
	beforeEach(function() {
		fadeViewer = FadeViewer('list');
	});

	afterEach(function() {
		if (document.querySelector('.fadeviewer'))
			document.querySelector('.fadeviewer').remove();
	});

	it("should create fadeviewer container", function() {
		var viewer = document.querySelector('.fadeviewer');
		expect(viewer).not.toEqual(null);
	});

	it("should load images into a view container", function() {
		var images = document.querySelectorAll('.fadeviewer .fadeviewer-images .fadeviewer-image');
		expect(images.length).toEqual(4);
	});

	it("should show selected image", function(done) {
		fadeViewer.show(2);
		var images = document.querySelectorAll('.fadeviewer .fadeviewer-images .fadeviewer-image');
		setTimeout(function(){
			for (var i=0; i < images.length; i++){
				if (i == 2)
					expect(parseFloat(images[i].style.opacity) > 0).toEqual(true);
				else
					expect(images[i].style.opacity < 1).toEqual(true);
			};
			done();
		},100);
	});

	it("should Loop to first image if selected image out of bound", function(done) {
		fadeViewer.show(4);
		var images = document.querySelectorAll('.fadeviewer .fadeviewer-images .fadeviewer-image');

		setTimeout(function(){
			for (var i=0; i < images.length; i++){
				if (i == 0)
					expect(parseFloat(images[i].style.opacity) > 0).toEqual(true);
				else
					expect(images[i].style.opacity < 1).toEqual(true);
			};
		},100);

		fadeViewer.show(-1);
		images = document.querySelectorAll('.fadeviewer .fadeviewer-images .fadeviewer-image');

		setTimeout(function(){
			for (var i=0; i < images.length; i++){
				if (i == 3)
					expect(parseFloat(images[i].style.opacity) > 0).toEqual(true);
				else
					expect(images[i].style.opacity < 1).toEqual(true);
			};
			done();
		},200);
	});

	it("should show next image", function(done) {
		fadeViewer.show(1);

		setTimeout(function(){
			fadeViewer.next();

			var images = document.querySelectorAll('.fadeviewer .fadeviewer-images .fadeviewer-image');

			setTimeout(function(){
				for (var i=0; i < images.length; i++){
					if (i == 2)
						expect(parseFloat(images[i].style.opacity) > 0).toEqual(true);
					else
						expect(parseFloat(images[i].style.opacity) < 1).toEqual(true);
					done();
				};
			},100);
		},300);
	});

	it("should show previous image", function(done) {
		fadeViewer.show(3);

		setTimeout(function(){
			fadeViewer.prev();

			var images = document.querySelectorAll('.fadeviewer .fadeviewer-images .fadeviewer-image');

			setTimeout(function(){
				for (var i=0; i < images.length; i++){
					if (i == 2)
						expect(parseFloat(images[i].style.opacity) > 0).toEqual(true);
					else
						expect(parseFloat(images[i].style.opacity) < 1).toEqual(true);
					done();
				};
			},100);
		},300);
	});
});
