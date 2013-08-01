function Carousel(element) {
  var self = this;
  var $element = $(element);

  if(!$element.length) {
    return;
  }

  if($element.hasClass('carousel-init')) {
    return;
  }

  console.log('%c carousel-init', 'color: red');


  $element.addClass('carousel-init');

  var $container = $element.find(".carousel-inner");
  var $panes = $container.find(".carousel-item");

  self.pane_width = 0;
  self.pane_count = $panes.length;

  self.current_pane = 0;

  this.init = function() {
    $panes.first().addClass('carousel-active');
    setPaneDimensions();
    updateControl();


    $(window).on("load resize orientationchange", function() {
      setPaneDimensions();
      //updateOffset();
    });
  };


  function setPaneDimensions() {
    self.pane_width = $element.width();
    $panes.each(function() {
      $(this).width(self.pane_width);
    });
    $container.width(self.pane_width*self.pane_count);
  }

  function updateControl() {
    var $left = $('.left.carousel-control').show();
    var $right = $('.right.carousel-control').show();
    if(self.current_pane ===  0) {
      $left.hide();
    }
    if(self.current_pane === self.pane_count - 1) {
      $right.hide();
    }
  }


  this.showPane = function( index ) {
    // between the bounds
    index = Math.max(0, Math.min(index, self.pane_count-1));
    self.current_pane = index;

    var offset = -((100/self.pane_count)*self.current_pane);
    setContainerOffset(offset, true);
    updateControl();

    $container.find('.carousel-active').removeClass('carousel-active');

    console.log('%c show pane ' + index, 'color: green');
    $($panes.get(index)).addClass('carousel-active');
  };


  function setContainerOffset(percent, animate) {
    $container.removeClass("animate");

    if(animate) {
     $container.addClass("animate");
    }

    if(Modernizr.csstransforms3d) {
      $container.css("transform", "translate3d("+ percent +"%,0,0) scale3d(1,1,1)");
    } else if(Modernizr.csstransforms) {
      $container.css("transform", "translate("+ percent +"%,0)");
    } else {
      var px = ((self.pane_width*self.pane_count) / 100) * percent;
      $container.css("left", px+"px");
    }
  }

  this.next = function() {
    console.log('next');
    return this.showPane(self.current_pane+1, true);
  };
  this.prev = function() {
    console.log('prev');
    return this.showPane(self.current_pane-1, true);
  };


  function handleHammer(ev) {
    // disable browser scrolling
    ev.gesture.preventDefault();

    switch(ev.type) {
      case 'dragright':
      case 'dragleft':
        // stick to the finger
        var pane_offset = -(100/self.pane_count)*self.current_pane;
        var drag_offset = ((100/self.pane_width)*ev.gesture.deltaX) / self.pane_count;

        // slow down at the first and last pane
        if((self.current_pane === 0 && ev.gesture.direction == Hammer.DIRECTION_RIGHT) ||
          (self.current_pane == self.pane_count-1 && ev.gesture.direction == Hammer.DIRECTION_LEFT)) {
          drag_offset *= 0.4;
        }

        setContainerOffset(drag_offset + pane_offset);
        break;

      case 'swipeleft':
        self.next();
        ev.gesture.stopDetect();
        break;

      case 'swiperight':
        self.prev();
        ev.gesture.stopDetect();
        break;

      case 'release':
        // more then 50% moved, navigate
        if(Math.abs(ev.gesture.deltaX) > self.pane_width/2) {
          if(ev.gesture.direction == 'right') {
            self.prev();
          } else {
            self.next();
          }
        } else {
          self.showPane(self.current_pane, true);
        }
        break;
    }
  }

  $element.hammer({ drag_lock_to_axis: true })
    .on("release dragleft dragright swipeleft swiperight", handleHammer);

  self.init();

  // hammerjs tap with jquery mobile tap
  // control btn mainly for mouse usage
  // $('.carousel-control').hammer().on('tap', function(e) {
  $('.carousel-control').on('click', function(e) {

    var $this = $(this);
    var control = $this.attr('data-carousel');

    console.log($this);
    console.log(control);

    if(control === 'prev') {
      self.prev();
    } else if(control === 'next') {
      self.next();
    }
    return false;
  });

}
