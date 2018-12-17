var fadeViewer = null;
describe("FadeViewer", function() {
	beforeEach(function() {
		fadeViewer = FadeViewer('list');
	});

	afterEach(function() {
		document.querySelector('.fadeviewer').remove();
	});

	it("should create fadeviewer container", function() {
		var viewer = document.querySelector('.fadeviewer');
		expect(viewer).not.toEqual(null);
	});

	it("should load images into a view container", function() {
		var container = document.querySelectorAll('.fadeviewer .fadeviewer-images img');
		expect(container.length).toEqual(4);
	});
});
