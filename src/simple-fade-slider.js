function FadeViewer(){
	if (arguments.length == 0) return null;

	if(document.getElementById(arguments[0]) == null) return null;

	var id = 'fadeviewer-'+(new Date()).getTime();

	var args = arguments;

	function createRootContainer(){
		var container = document.createElement('div');
		container.setAttribute('id', id);
		container.setAttribute('class', 'fadeviewer');
		document.getElementById(args[0]).
			parentNode.insertBefore(container, document.getElementById(args[0]).nextSibling);	

	}

	function loadImages(){
		var container = document.createElement('div');
		container.setAttribute('class', 'fadeviewer-images');
		document.querySelectorAll('#'+args[0]+' li img').forEach(function(img){
			var elem = new Image();
			elem.src = img.src;

			container.appendChild(elem);
		});
		document.getElementById(id).appendChild(container);
	}

	function stackImages(){
		var images = document.querySelectorAll('#'+id+' .fadeviewer-images img');

		images.forEach(function(image){
			image.style.position = 'absolute';
			image.style.width = '100%';
			image.style.height = '100%';
		});

		var container = document.querySelector('#'+id+' .fadeviewer-images');
		container.style.position = 'relative';
		container.style.width = '100vw';
		container.style.height = '100vh';
	}

	createRootContainer();
	loadImages();
	stackImages();

	return {};
}
