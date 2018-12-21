function FadeViewer(){
	var delay = 3000;

	if (arguments.length == 0) return null;

	if(document.getElementById(arguments[0]) == null) return null;

	if (arguments.length>1 && (parseInt(arguments[1]) > 0))
		delay = parseInt(arguments[1]);

	var id = 'fadeviewer-'+(new Date()).getTime();

	var timer;

	var args = arguments;

	function createRootContainer(){
		var container = document.createElement('div');
		container.setAttribute('id', id);
		container.setAttribute('class', 'fadeviewer');
		container.style.position = 'absolute';
		container.style.top = '1000000px';
		container.style.left = '1000000px';
		document.getElementById(args[0]).
			parentNode.insertBefore(container, document.getElementById(args[0]).nextSibling);	

	}

	function loadImages(){
		var container = document.createElement('div');
		container.setAttribute('class', 'fadeviewer-images');
		var index = 0;
		document.querySelectorAll('#'+args[0]+' li img').forEach(function(img){
			img.addEventListener('click', openFullScreen);
			img.setAttribute('fadeviewer-image-index', index++);
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

	function loadNavigaion(){
		var container = document.querySelector('#'+id+' .fadeviewer-images');
		var navigator = document.createElement('div');
		navigator.setAttribute('class', 'fadeviewer-navigator');
		navigator.style.position = 'absolute';
		navigator.style.left = '0px';
		navigator.style.bottom = '5%';
		navigator.style.padding = '5px';
		navigator.style.width = '100%';

		var nextBtn = document.createElement('div');
		nextBtn.setAttribute('class','fadeviewer-next');
		nextBtn.style.position = 'absolute';
		nextBtn.style.right = '5%';
		nextBtn.style.backgroundColor = 'black';
		nextBtn.style.color = 'white';
		nextBtn.style.border = 'solid 1px white';
		nextBtn.style.opacity = '0.5';
		nextBtn.style.padding = '0.5em';
		nextBtn.style.borderRadius = '0px 20px 20px 0px';
		nextBtn.style.cursor = 'pointer';
		nextBtn.addEventListener('click',next);
		var label = document.createTextNode('Next');
		nextBtn.appendChild(label);
		navigator.appendChild(nextBtn);

		var playBtn = document.createElement('div');
		playBtn.setAttribute('class','fadeviewer-play');
		playBtn.style.position = 'absolute';
		playBtn.style.left = '40%';
		playBtn.style.backgroundColor = 'black';
		playBtn.style.color = 'white';
		playBtn.style.border = 'solid 1px white';
		playBtn.style.opacity = '0.5';
		playBtn.style.padding = '0.5em';
		playBtn.style.cursor = 'pointer';
		playBtn.addEventListener('click',play);
		var label = document.createTextNode('Play');
		playBtn.appendChild(label);
		navigator.appendChild(playBtn);

		var progress = document.createElement('div');
		progress.setAttribute('class','fadeviewer-progress');
		progress.style.position = 'absolute';
		progress.style.left = '52%';
		progress.style.backgroundColor = 'black';
		progress.style.color = 'white';
		progress.style.border = 'solid 1px white';
		progress.style.opacity = '0.5';
		progress.style.padding = '0.5em';
		navigator.appendChild(progress);

		var prevBtn = document.createElement('div');
		prevBtn.setAttribute('class','fadeviewer-prev');
		prevBtn.style.position = 'absolute';
		prevBtn.style.left = '5%';
		prevBtn.style.backgroundColor = 'black';
		prevBtn.style.color = 'white';
		prevBtn.style.border = 'solid 1px white';
		prevBtn.style.opacity = '0.5';
		prevBtn.style.padding = '0.5em';
		prevBtn.style.borderRadius = '20px 0px 0px 20px';
		prevBtn.style.cursor = 'pointer';
		prevBtn.addEventListener('click',prev);
		var label = document.createTextNode('Prev');
		prevBtn.appendChild(label);
		navigator.appendChild(prevBtn);

		container.appendChild(navigator);
	}

	function stackImages(){
		var images = document.querySelectorAll('#'+id+' .fadeviewer-images img');

		images.forEach(function(image){
			image.style.position = 'absolute';
		});

		var container = document.querySelector('#'+id+' .fadeviewer-images');
		container.style.position = 'absolute';
		container.style.top = '0';
		container.style.left = '0';
		container.style.width = '100vw';
		container.style.height = '100vh';
	}

	function show(index){
		var images = document.querySelectorAll('#'+id+' .fadeviewer-images .fadeviewer-image');
		var progress = document.querySelector('#'+id+' .fadeviewer-progress');

		if (index >= images.length) index = 0;
		if (index < 0) index = images.length - 1;

		progress.innerHTML = (index+1)+'/'+images.length;

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

	function play(){
		var playBtn = document.querySelector('#'+id+' .fadeviewer-play');
		if (timer){
			clearInterval(timer);
			playBtn.innerHTML = 'Play';
			timer = null;
		}
		else{
			timer = setInterval(next,delay);
			playBtn.innerHTML ='Stop';
		}
	}

	function stopPlayer(){
		var playBtn = document.querySelector('#'+id+' .fadeviewer-play');
		if (timer){
			clearInterval(timer);
			playBtn.innerHTML = 'Play';
			timer = null;
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

	function openFullScreen(){
		stopPlayer();
		show(parseInt(this.getAttribute('fadeviewer-image-index')));
		var elem = document.getElementById(id);
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) { /* Firefox */
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) { /* IE/Edge */
			elem.msRequestFullscreen();
		}
	}

	function closeFullScreen() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) { /* Firefox */
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) { /* IE/Edge */
			document.msExitFullscreen();
		}
	}

	createRootContainer();
	loadImages();
	stackImages();
	loadNavigaion();


	return {
		show:show,
		next:next,
		prev:prev,
		openFullScreen:openFullScreen,
		closeFullScreen:closeFullScreen
	};
}
