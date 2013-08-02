carousel
========

carousel plugin with jquery and hammer.js

[bootstrap-carousel.js](https://github.com/twbs/bootstrap/blob/master/js/bootstrap-carousel.js)

[Hammer.js carousel example](http://eightmedia.github.io/hammer.js/examples/carousel.html)

### HTML markup
``` html
<div class="carousel-wrap" id="js-carousel">
  <div class="carousel-inner">
    <div class="carousel-item carousel-active">
      <img src="/images/1.jpg">
    </div>

    <div class="carousel-item">
      <img src="/images/2.jpg">
    </div>

    <div class="carousel-item">
      <img src="/images/3.jpg">
    </div>

    <div class="carousel-item">
      <img src="/images/4.jpg">
    </div>

  </div>

  <a class="left carousel-control" href="#" data-carousel="prev">
    <span>prev</span>
  </a>
  <a class="right carousel-control" href="#" data-carousel="next">
    <span>next</span>
  </a>
</div>
```
### Usage
``` javascript
$('#js-carousel').carousel(); // initialization
$('#js-carousel').carousel('prev'); // action prev item
$('#js-carousel').carousel('next'); // action next item
```


### TODO
+ Content loading dynamically
+ Carousel-item with full html page
+ Animation after 'release' with css transitions

