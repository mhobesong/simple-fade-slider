function FadeSlider(){
	this.id = (new Date()).getTime();
	this.listElementId = arguments[0];
	this.listElement = document.getElementById(this.listElementId);
	this.images = this.listElement.querySelectorAll('li img');
	this.createSlider();
};

FadeSlider.prototype.id;

FadeSlider.prototype.listElementId;

FadeSlider.prototype.listElement;

FadeSlider.prototype.images = [];

FadeSlider.prototype.createSlider = function(){
	var slider = document.createElement('div');
	slider.setAttribute('class','fade-slider');
	slider.setAttribute('id','fade-slider-'+this.id);
	this.listElement.parentNode.insertBefore(slider, this.listElement.nextSibling);	

	sliderImages = document.createElement('div');
	sliderImages.setAttribute('class','fade-slider-images');
	sliderImages.style.position = 'relative';
	slider.appendChild(sliderImages);

	for(var i=0; i<this.images.length; i++){
		var image = this.images[i];
		var img = new Image();
		img.src = image.src;
		img.style.width = '100%';
		this.images[i].setAttribute('fade-slider-index', i);
		sliderImageDiv = document.createElement('div');
		sliderImageDiv.setAttribute('class','fade-slider-image');
		sliderImageDiv.style.display = 'none';
		sliderImageDiv.style.position = 'absolute';
		sliderImageDiv.style.top = '0px';

		if (i==0){
			sliderImageDiv.style.display = 'block';
			sliderImageDiv.style.position = 'static';
			sliderImageDiv.style.top = '';
		}
		sliderImageDiv.style.width = '70%';
		sliderImageDiv.appendChild(img);
		sliderImages.appendChild(sliderImageDiv);
		var instance = this;

		this.images[i].addEventListener('click', function(){
			instance.fullScreen(this.getAttribute('fade-slider-index'));
		});
	}
};

FadeSlider.prototype.showImage = function(imageIndex) {
	var images = document.querySelectorAll('#fade-slider-'+this.id+'.fade-slider .fade-slider-images .fade-slider-image img');
	var imageContainers = document.querySelectorAll('#fade-slider-'+this.id+'.fade-slider .fade-slider-images .fade-slider-image');
	for(var i=0; i<images.length; i++){
		if (i == imageIndex){
			images[i].style.display = 'block';
			imageContainers[i].style.display = 'block';
			imageContainers[i].style.position = 'static';
			imageContainers[i].style.top = '';
		}
		else{
			images[i].style.display = 'none';
			imageContainers[i].style.display = 'none';
			imageContainers[i].style.position = 'absolute';
			imageContainers[i].style.top = '0px';
		}
	}
}

FadeSlider.prototype.fullScreen = function(imageIndex) {
	this.showImage(imageIndex);
	var elem = document.getElementById('fade-slider-'+this.id);
	console.log(imageIndex);
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.mozRequestFullScreen) { /* Firefox */
		elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { /* IE/Edge */
		elem.msRequestFullscreen();
	}
};
