var fadeViewer = null;
describe("FadeViewer", function() {
	beforeEach(function() {
		if (document.querySelector('.fadeviewer'))
			document.querySelector('.fadeviewer').remove();

		fadeViewer = FadeViewer('list');
	});

	it("should create fadeviewer container", function() {
		var viewer = document.querySelector('.fadeviewer');
		expect(viewer).not.toEqual(null);
	});

	it("should load images into a view container", function() {
		var images = document.querySelectorAll('.fadeviewer .fadeviewer-images .fadeviewer-image');
		expect(images.length).toEqual(4);
	});

	it("show selected image", function() {
		fadeViewer.show(2);
		var images = document.querySelectorAll('.fadeviewer .fadeviewer-images .fadeviewer-image');
		for (var i=0; i < images.length; i++){
			if (i == 2)
				expect(images[i].style.display).toEqual('block');
			else
				expect(images[i].style.display).toEqual('none');
		};
	});
});
