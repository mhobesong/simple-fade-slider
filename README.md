# simple-fade-slider
JavaScript image viewer with image fade-in/fade-out transition effect.

![demo gif](https://github.com/mhobesong/simple-fade-slider/blob/master/src/images/demo.gif?raw=true)

## Install
Load the script source into your project.
```
<script language="javascript" src="simple-fade-slider.js"></script>
```
## API
```
new FadeSlider(domElemID,[options]);
```
`domElemID` *(String)* ID of list tag

`delay ` *(Number)*  Delay in miliseconds befor next image transition

### Usage example 1

#### HTML
```
<ul id="mySlider">
  <li><img src="image1" /></li>
  <li><img src="image2" /></li>
  <li><img src="image3" /></li>
  <li><img src="image4" /></li>
</ul>
```
#### JavaScript
```
new FadeSlider('mySlider');
```
### Usage example 2
#### HTML
```
<ul id="mySlider">
  <li><img src="image1" /></li>
  <li><img src="image2" /></li>
  <li><img src="image3" /></li>
  <li><img src="image4" /></li>
</ul>
```
#### JavaScript
```
new FadeSlider('mySlider',2000);
```
