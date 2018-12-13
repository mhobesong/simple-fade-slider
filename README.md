# simple-fade-slider
JavaScript image slider with image fade-in/fade-out transition effect, next/previous buttons, sliders looping and full screen viewer.

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

`options ` *(Object)* 

### Basic usage example

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
### Advanced usage example
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
new FadeSlider('mySlider'{delay:2000, transitionLength:1000});
```
### Options
`delay` *(Number)* Image display delay in miliseconds

`transitionLength` *(Number0* Transition speed in miliseconds
