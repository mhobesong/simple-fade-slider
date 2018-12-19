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
			var div = document.createElement('div');
			div.setAttribute('class', 'fadeviewer-image');
			div.style.backgroundImage = 'url("'+img.src+'")';
			div.style.backgroundSize = 'contain';
			div.style.backgroundPosition = 'center';
			div.style.backgroundRepeat = 'no-repeat';
			div.style.width = '100%';
			div.style.height = '100%';
			div.style.position = 'absolute';
			div.style.opacity = '1';
			div.style.top = 0;
			div.style.left=0
			container.appendChild(div);
		});
		document.getElementById(id).appendChild(container);
	}

	function stackImages(){
		var images = document.querySelectorAll('#'+id+' .fadeviewer-images img');

		images.forEach(function(image){
			image.style.position = 'absolute';
		});

		var container = document.querySelector('#'+id+' .fadeviewer-images');
		container.style.position = 'fixed';
		container.style.top = '0';
		container.style.left = '0';
		container.style.width = '100vw';
		container.style.height = '100vh';
	}

	function show(index){
		var images = document.querySelectorAll('#'+id+' .fadeviewer-images .fadeviewer-image');

		if (index >= images.length) index = 0;
		if (index < 0) index = images.length - 1;

		for (var i=0; i < images.length; i++){
			if (i == index){
				//images[i].style.opacity = 1;
				fadein(images[i]);
			}
			else{
				fadeout(images[i]);
				//images[i].style.opacity = 0;
			}
		}
	}

	function fadeout(container){
		var timer = setInterval(function(){
			container.style.opacity = parseFloat(container.style.opacity) - 0.1;
			if(parseFloat(container.style.opacity) < 0) {
				clearInterval(timer);
				container.style.opacity = '0'
			}
		},50);
	}

	function fadein(container){
		var timer = setInterval(function(){
			container.style.opacity = parseFloat(container.style.opacity) + 0.1;
			if(parseFloat(container.style.opacity) >= 1){
				clearInterval(timer);
				container.style.opacity = '1'
			}
		},50);
	}

	function next(){
		var images = document.querySelectorAll('#'+id+' .fadeviewer-images .fadeviewer-image');
		
		for (var i=0; i < images.length; i++){
			if(images[i].style.opacity == 1){
				show(i+1);
				break;
			}
		}
	}

	function prev(){
		var images = document.querySelectorAll('#'+id+' .fadeviewer-images .fadeviewer-image');
		
		for (var i=0; i < images.length; i++){
			if(images[i].style.opacity == 1){
				show(i-1);
				break;
			}
		}
	}

	createRootContainer();
	loadImages();
	stackImages();

	return {
		show:show,
		next:next,
		prev:prev
	};
}
