describe("When slider is initialized", function() {

	var slider;

	beforeEach(function() {
		if(typeof slider == 'undefined')
			slider = new FadeSlider('list');
	});

	it("should hide other images but the first one", function() {
		var elmts = document.querySelectorAll('#fade-slider-'+slider.id+'.fade-slider .fade-slider-images .fade-slider-image');
		for(var i=0; i<elmts.length; i++){
			elmt = elmts[i];
			if (i == 0)
				expect(elmt.style.display).toEqual('block');
			else
				expect(elmt.style.display).toEqual('none');
		}
	});

	it("should set image to fill available width", function() {
		var elmts = document.querySelectorAll('#fade-slider-'+slider.id+'.fade-slider .fade-slider-images .fade-slider-image img');
		var elmts2 = document.querySelectorAll('#fade-slider-'+slider.id+'.fade-slider .fade-slider-images .fade-slider-image');
		elmts.forEach(function(elmt){
			expect(elmt.style.width).toEqual('100%');
		});
		elmts2.forEach(function(elmt){
			expect(elmt.style.width).toEqual('70%');
		});
	});

	it("should set display of images container to relative", function() {
		var elmts = document.querySelectorAll('#fade-slider-'+slider.id+'.fade-slider .fade-slider-images');
		elmts.forEach(function(elmt){
			expect(elmt.style.position).toEqual('relative');
		});
	});

	it("should set absolute possition of image container to 0, exept the first image", function() {
		var elmts = document.querySelectorAll('#fade-slider-'+slider.id+'.fade-slider .fade-slider-images .fade-slider-image');
		for(var i=0;i<elmts.length;i++){
			elmt = elmts[i];
			if(i==0)
				expect(elmt.style.top).toEqual('');
			else
				expect(elmt.style.top).toEqual('0px');
		};
	});

	it("should load the the images into the slider container", function() {
		var elmts = document.querySelectorAll('#fade-slider-'+slider.id+'.fade-slider .fade-slider-images .fade-slider-image img');
		expect(elmts.length).toEqual(4);
	});

	it("should add slider markup bellow list", function() {
		var elmtMarkup = document.querySelector('#fade-slider-'+slider.id+'.fade-slider');
		expect(elmtMarkup).not.toEqual(null);
	});

	it("should load images in a collection", function() {
		expect(slider.images.length).toEqual(4);
	});
});

describe("image", function() {
	var slider;
	beforeEach(function() {
		if(typeof slider == 'undefined')
			slider = new FadeSlider('list');
	});

	it("should be displayed when clicked", function() {
		slider.showImage(3);
		var elmts = document.querySelectorAll('#fade-slider-'+slider.id+'.fade-slider .fade-slider-images .fade-slider-image img');
		for(var i=0; i<elmts.length; i++){
			elmt = elmts[i];
			if (i == 3)
				expect(elmt.style.display).toEqual('block');
			else
				expect(elmt.style.display).toEqual('none');
		}
	});
});

/*
describe("Player", function() {
  var player;
  var song;

  beforeEach(function() {
    player = new Player();
    song = new Song();
  });

  it("should be able to play a Song", function() {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect(player).toBePlaying(song);
  });

  describe("when song has been paused", function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", function() {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it("should be possible to resume", function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });
});
*/
