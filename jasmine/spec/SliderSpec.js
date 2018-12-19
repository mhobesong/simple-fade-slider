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
		var images = document.querySelectorAll('.fadeviewer .fadeviewer-images img');
		expect(images.length).toEqual(4);
	});
});
