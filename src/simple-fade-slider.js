function FadeSlider(){
	this.id = (new Date()).getTime();
	this.listElementId = arguments[0];

	if (arguments.length > 1){
		if(typeof arguments[1] != 'undefined')
			this.delay = arguments[1];
	}

	this.listElement = document.getElementById(this.listElementId);
	this.images = this.listElement.querySelectorAll('li img');
	this.createSlider();
};

FadeSlider.prototype.delay = 2000;

FadeSlider.prototype.id;

FadeSlider.prototype.activeImage;

FadeSlider.prototype.listElementId;

FadeSlider.prototype.listElement;

FadeSlider.prototype.images = [];

FadeSlider.prototype.timer = null;

FadeSlider.prototype.createSlider = function(){
	var instance = this;
	var slider = document.createElement('div');
	slider.setAttribute('class','fade-slider');
	slider.setAttribute('id','fade-slider-'+this.id);
	slider.style.position = 'absolute';
	slider.style.display = 'table';
	slider.style.left = '-'+(3*window.outerWidth)+'px';
	this.listElement.parentNode.insertBefore(slider, this.listElement.nextSibling);	

	sliderImages = document.createElement('div');
	sliderImages.setAttribute('class','fade-slider-images');
	sliderImages.style.position = 'relative';
	sliderImages.style.display = 'table-cell';
	sliderImages.style.verticalAlign = 'middle';
	slider.appendChild(sliderImages);

	for(var i=0; i<this.images.length; i++){
		var image = this.images[i];
		var img = new Image();
		img.src = image.src;
		img.style.width = '100%';
		this.images[i].setAttribute('fade-slider-index', i);
		sliderImageDiv = document.createElement('div');
		sliderImageDiv.setAttribute('class','fade-slider-image');
		sliderImageDiv.style.marginLeft = 'auto';
		sliderImageDiv.style.marginRight = 'auto';

		if (i==0){
			sliderImageDiv.style.display = 'block';
			sliderImageDiv.style.position = 'static';
			sliderImageDiv.style.top = '';
			sliderImageDiv.style.backgroundImage = `url(${this.images[this.images.length-1].src})`;
			sliderImageDiv.style.backgroundSize = 'cover';
		}else{
			sliderImageDiv.style.display = 'none';
			sliderImageDiv.style.position = 'absolute';
			sliderImageDiv.style.top = '0px';
			sliderImageDiv.style.backgroundImage = `url(${this.images[i-1].src})`;
			sliderImageDiv.style.backgroundSize = 'cover';
		}

		sliderImageDiv.style.width = '80%';
		sliderImageDiv.appendChild(img);
		sliderImages.appendChild(sliderImageDiv);

		this.images[i].addEventListener('click', function(){
			instance.fullScreen(this.getAttribute('fade-slider-index'));
		});
	}

	nextButton = document.createElement('span');
	nextButton.setAttribute('class','fade-slider-next');
	nextButton.setAttribute('style','padding:5px;color: #fff;position: absolute;margin-right: 10px;right: 1%;bottom: 12px;border: solid 1px;cursor:pointer;border-radius: 0px 30px 30px 0px;background-color:#000;opacity:0.5;font-size:12px;font-family:sans-serif');
	nextButton.addEventListener('click',function(){instance.nextImage();});
	var label = document.createTextNode('Next');
	nextButton.appendChild(label);
	document.getElementById('fade-slider-'+this.id).appendChild(nextButton);

	prevButton = document.createElement('span');
	prevButton.setAttribute('class','fade-slider-prev');
	prevButton.setAttribute('style','padding:5px;color: #fff;position: absolute;margin-left: 10px;left: 1%;bottom: 12px;border: solid 1px;cursor:pointer;border-radius: 30px 0px 0px 30px;background-color:#000;opacity:0.5;font-size:12px;font-family:sans-serif;filter:alpha(opacity=50)');
	prevButton.addEventListener('click',function(){instance.prevImage()});
	label = document.createTextNode('Prev');
	prevButton.appendChild(label);
	document.getElementById('fade-slider-'+this.id).appendChild(prevButton);

	slideshowButton = document.createElement('span');
	slideshowButton.setAttribute('class','fade-slider-slideshow');
	slideshowButton.setAttribute('style','color: #fff;position: absolute;left:47%;bottom:10px;padding: 5px;border: solid 1px; cursor:pointer;background-color:#000;opacity:0.5;font-size:12px;filter:alpha(opacity=50);font-family:sans-serif');
	buttonText = document.createTextNode('Play');
	buttonText.fontSize = 'bolder';
	slideshowButton.appendChild(buttonText);
	slideshowButton.addEventListener('click',function(){instance.startSlideShow()});
	document.getElementById('fade-slider-'+this.id).appendChild(slideshowButton);

	ratioDisplay = document.createElement('span');
	ratioDisplay.setAttribute('class','fade-slider-ratiodisplay');
	ratioDisplay.setAttribute('style','color: #fff;position: absolute;left:60%;bottom:10px;padding: 5px;cursor:pointer;background-color:#000;opacity:0.5;font-size:12px;filter:alpha(opacity=50);font-family:sans-serif');
	ratioDisplay.addEventListener('click',function(){instance.startSlideShow()});
	document.getElementById('fade-slider-'+this.id).appendChild(ratioDisplay);
};

FadeSlider.prototype.showImage = function(imageIndex) {

	var images = document.querySelectorAll('#fade-slider-'+this.id+'.fade-slider .fade-slider-images .fade-slider-image img');

	var imageContainers = document.querySelectorAll('#fade-slider-'+this.id+'.fade-slider .fade-slider-images .fade-slider-image');

	for(var i=0; i<images.length; i++){
		if (i == imageIndex){
			images[i].style.display = 'block';
			this.fadein(images[i],imageContainers[i]);
			imageContainers[i].style.position = 'static';
			imageContainers[i].style.top = '';
		}
		else{
			images[i].style.display = 'none';
			this.fadeout(images[i],imageContainers[i]);
			imageContainers[i].style.position = 'absolute';
			imageContainers[i].style.top = '0px';
		}
	}
	this.activeImage = imageIndex;

	document.querySelector('#fade-slider-'+this.id+' .fade-slider-ratiodisplay').innerHTML = ++imageIndex+'/'+this.images.length;
}

FadeSlider.prototype.fadeout = function(img,container){
	if(container.style.display != 'none'){
		var opacity = 1;
		var interval = setInterval(function(){
			if(opacity <= 0) {
				clearInterval(interval);	
				container.style.display = 'none';
				img.style.opacity = 1;
			}else{
				opacity -= 0.1;
				img.style.opacity = opacity;
			}
		},50);	
	}
};


FadeSlider.prototype.fadein = function(img,container){
	if(container.style.display == 'none'){
		var opacity = 0;
		img.style.opacity = opacity;
		container.style.display = 'block';
		var interval = setInterval(function(){
			if(opacity >= 1) {
				clearInterval(interval);	
				container.style.display = 'block';
				img.style.opacity = 1;
			}else{
				opacity += 0.1;
				img.style.opacity = opacity;
			}
		},50);	
	}
};

FadeSlider.prototype.fullScreen = function(imageIndex) {
	this.showImage(imageIndex);
	var elem = document.getElementById('fade-slider-'+this.id);
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.mozRequestFullScreen) { /* Firefox */
		elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { /* IE/Edge */
		elem.msRequestFullscreen();
	}

	this.stopSlideShow();
};

FadeSlider.prototype.startSlideShow = function() {
	var button = document.querySelector('#fade-slider-'+this.id+' .fade-slider-slideshow');
	if (button.innerHTML == 'Play'){
		var _nextImage = this.nextImage.bind(this);
		clearInterval(this.timer);
		this.timer = setInterval(_nextImage,this.delay);
		document.querySelector('#fade-slider-'+this.id+' .fade-slider-slideshow').innerHTML = 'Stop';
	}else{
		this.stopSlideShow();
	}
}

FadeSlider.prototype.stopSlideShow = function() {
	clearInterval(this.timer);
	document.querySelector('#fade-slider-'+this.id+' .fade-slider-slideshow').innerHTML = 'Play';
}

FadeSlider.prototype.nextImage = function() {
	var imageCount = document.querySelectorAll('#fade-slider-'+this.id+'.fade-slider .fade-slider-images .fade-slider-image').length;
	var currentImage = this.activeImage;
	var index = (++currentImage >= imageCount)?0:currentImage;
	this.showImage(index);
};

FadeSlider.prototype.prevImage = function() {
	var imageCount = document.querySelectorAll('#fade-slider-'+this.id+'.fade-slider .fade-slider-images .fade-slider-image').length;
	var currentImage = this.activeImage;
	var index = (--currentImage < 0)?(--imageCount):currentImage;
	this.showImage(index);
};
