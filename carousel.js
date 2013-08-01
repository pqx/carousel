;(function($) {
  var pluginName = 'carousel';

  var defaults = {};

  function Carousel(element, options) {
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.element = element;
    this.$element = $(element);

    this.$container = this.$element;
    this.$panes = this.$container.find(".carousel-item");

    this.pane_width = 0;
    this.pane_count = this.$panes.length;

    this.current_pane = 0;
    this.init();

    this.$element.hammer({ drag_lock_to_axis: true })
      .on("release dragleft dragright swipeleft swiperight", $.proxy(this.handleHammer, this));


    // hammerjs tap with jquery mobile tap
    // control btn mainly for mouse usage
    // $('.carousel-control').hammer().on('tap', function(e) {
    var self = this;
    $('.carousel-control').on('click', function(e) {

      var $this = $(this);
      var control = $this.attr('data-carousel');

      if(control === 'prev') {
        self.prev();
      } else if(control === 'next') {
        self.next();
      }
      return false;
    });
  }


  Carousel.prototype.init = function() {
    var self = this;
    this.$panes.first().addClass('carousel-active');
    this.setPaneDimensions();
    this.updateControl();

    $(window).on("load resize orientationchange", function() {
      self.setPaneDimensions();
      //updateOffset();
    });
  };


  Carousel.prototype.setPaneDimensions = function() {
    this.pane_width = this.$element.width();
    this.$panes.each(function() {
      $(this).width(self.pane_width);
    });
    this.$container.width(this.pane_width*this.pane_count);
  };

  Carousel.prototype.updateControl = function() {
    var $left = $('.left.carousel-control').show();
    var $right = $('.right.carousel-control').show();
    if(this.current_pane ===  0) {
      $left.hide();
    }
    if(this.current_pane === this.pane_count - 1) {
      $right.hide();
    }
  };


  Carousel.prototype.showPane = function(index) {
    // between the bounds
    index = Math.max(0, Math.min(index, self.pane_count-1));
    this.current_pane = index;

    var offset = -((100/self.pane_count)*self.current_pane);
    this.setContainerOffset(offset, true);
    this.updateControl();

    this.$container.find('.carousel-active').removeClass('carousel-active');
    $(this.$panes.get(index)).addClass('carousel-active');
  };


  Carousel.prototype.setContainerOffset = function(percent, animate) {
    this.$container.removeClass("animate");

    if(animate) {
     this.$container.addClass("animate");
    }

    if(Modernizr.csstransforms3d) {
      this.$container.css("transform", "translate3d("+ percent +"%,0,0) scale3d(1,1,1)");
    } else if(Modernizr.csstransforms) {
      this.$container.css("transform", "translate("+ percent +"%,0)");
    } else {
      var px = ((this.pane_width*this.pane_count) / 100) * percent;
      this.$container.css("left", px+"px");
    }
  };

  Carousel.prototype.next = function() {
    return this.showPane(this.current_pane+1, true);
  };

  Carousel.prototype.prev = function() {
    return this.showPane(this.current_pane-1, true);
  };


  Carousel.prototype.handleHammer = function(ev) {
    var self = this;
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

        self.setContainerOffset(drag_offset + pane_offset);
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
  };

  $.fn[pluginName] = function(options) {
    return this.each(function () {
      var $this = $(this);

      var data = $this.data('plugin_' + pluginName);
      if(!data) {
        $this.data("plugin_" + pluginName, (data = new Carousel(this, options)));
      }

      var action = typeof options === 'string' ? options : null;
      if(action) {
        data[action]();
      }
    });
  };

  $.fn.carousel.Constructor = Carousel;

})($);