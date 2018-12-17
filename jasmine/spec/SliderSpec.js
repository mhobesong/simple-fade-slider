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
});
