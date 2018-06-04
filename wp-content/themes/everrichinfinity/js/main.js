zjs.onready('parallax, ui.freezepanel, image.slider.theme.linear, bin.scrollto, ui.tabpanel', function(){
	
	var menu_services = ['Tư vấn và tổ chức tang lễ', 'Hoả táng và lưu giữ tro cốt', 'Dịch vụ chăm sóc phần mộ', 'Tổ chức nghi lễ, sự kiện tâm linh'];
	var galleryService = new Swiper('#Services .gallery-services', {
	  spaceBetween: 10,
	  effect: 'fade',
	  autoplay: {
		delay: 5000,
	  },
	  pagination: {
		  el: '.swiper-pagination-services',
			clickable: true,
			renderBullet: function (index, className) {
			  return '<span class="' + className + '">' + (menu_services[index]) + '</span>';
			},
		},
	});
	
	var menu_products = ['Mộ đơn', 'Mộ đôi', 'Mộ gia tộc']
	var galleryProducts = new Swiper('#Products .gallery-products', {
	  spaceBetween: 10,
	  autoplay: {
		delay: 5000,
	  },
	  effect: 'fade',
	  pagination: {
		  el: '.swiper-pagination-products',
			clickable: true,
			renderBullet: function (index, className) {
			  return '<span class="' + className + '">' + (menu_products[index]) + '</span>';
			},
		},
	});
	
	var galleryFeatured = new Swiper('#Featured .gallery-featured', {
		spaceBetween: 10,
		autoplay: {
			delay: 5000,
		  },
		//effect: 'fade',
		pagination: {
		  el: '.swiper-pagination-featured',
			clickable: true,
		},
	});
	
	var galleryProducts_modon = new Swiper('#Products .gallery-products-modon', {
		spaceBetween: 10,
		autoplay: {
			delay: 5000,
		  },
		effect: 'fade',
		pagination: {
		  el: '.swiper-pagination-modon',
			clickable: true,
		},
	});
	
	var galleryProducts_modoi = new Swiper('#Products .gallery-products-modoi', {
		spaceBetween: 10,
		autoplay: {
			delay: 5000,
		  },
		effect: 'fade',
		pagination: {
		  el: '.swiper-pagination-modoi',
			clickable: true,
		},
	});
	
	var galleryProducts_mogiatoc = new Swiper('#Products .gallery-products-mogiatoc', {
		spaceBetween: 10,
		autoplay: {
			delay: 5000,
		  },
		effect: 'fade',
		pagination: {
		  el: '.swiper-pagination-mogiatoc',
			clickable: true,
		},
	});
	
	// MENU ANIMATION
	zjs(window).on("scroll",function() {
	var sTop = zjs(window).scrollTop();
		//console.log(sTop);	
		if(sTop > 200) {
			zjs('body').addClass("scrolling");
		} else {
			zjs('body').removeClass("scrolling");
		}
	});
	
	zjs('.moveout').click(function(){
		zjs('#Location .places').toggleClass('hidding');
	});
	
	/* var galleryServiceThumbs = new Swiper('#Services .text-thumbs', {
	  spaceBetween: 10,
	  direction: 'vertical',
	  centeredSlides: true,
	  slidesPerView: 'auto',
	  touchRatio: 0.2,
	  slideToClickedSlide: true,
	});
	galleryService.controller.control = galleryServiceThumbs;
	galleryServiceThumbs.controller.control = galleryService; */
	

	/* JQUERY */
	/*
  $(document).ready(function(){
		 $(".Menu a").click(function (){
		 	var rel = $(this).attr('rel');
		 	console.log(rel);
	        $('html, body').animate({
	            scrollTop: $(rel).offset().top
	        }, 1000);
	    });

	});
  */
  jQuery(document).ready(function($) {
    
	$('.fancybox-thumbs').fancybox({
				prevEffect : 'none',
				nextEffect : 'none',

				closeBtn  : true,
				arrows    : true,
				nextClick : true,

				helpers : {
					thumbs : {
						width  : 156,
						height : 100,
						prevEffect : 'none',
						nextEffect : 'none'
					}
				}
			});

	$('.counter').counterUp({
        delay: 10,
        time: 1000
    });
	
	 $('.mobile-menu').click(function(){
      if ($(this).hasClass('active')) {
        $(this).removeClass('active')
        $('.Menu ul').removeClass('active')
      }else {
        $(this).addClass('active')
        $('.Menu ul').addClass('active')
      }
    });
	
	$('.Menu .menu-item').click(function(){
        $('.Menu ul').removeClass('active');
        $('.mobile-menu').removeClass('active');
    });
	
	$( "body" ).scroll(function() {
	  $( "body" ).addClass("scrolling");
	});
    $('#apartments .more, #gallery .more').click(function(e){
      e.preventDefault();

      var post_id = $(this).attr('data-postid');

      $.ajax({
        url: main_ajax.ajaxurl,
        data: ({post_id:post_id, action:'load_post_content'}),
        type: 'json',
        type: 'POST',
        beforeSend: function(){
          $('body').prepend('<div class="preload" style="background:#bf954f; font-size:20px; color:#fff; padding:10px; position:fixed; top:50%; left:50%; z-index:9999;">Loading...</div>');
        },
        success: function(data){
          console.log(data);
          $('.preload').remove();
          if(data.success){
            $('.popup-content').bPopup({
             closeClass:'close',
             onOpen: function() {
                $('.popup-content .container .row').html(data.data.html);
                var option = zjs('.zslider').getAttr('data-option');
                zjs('.zslider').makeSlider({option});
              },
              onClose: function() {
                $('.popup-content .container .row').html('');
              }
          });
          }
        }
      });
    });

  });

});

// WOW JS
(function() {
  var Util,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Util = (function() {
    function Util() {}

    Util.prototype.extend = function(custom, defaults) {
      var key, value;
      for (key in custom) {
        value = custom[key];
        if (value != null) {
          defaults[key] = value;
        }
      }
      return defaults;
    };

    Util.prototype.isMobile = function(agent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
    };

    return Util;

  })();

  this.WOW = (function() {
    WOW.prototype.defaults = {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true
    };

    function WOW(options) {
      if (options == null) {
        options = {};
      }
      this.scrollCallback = __bind(this.scrollCallback, this);
      this.scrollHandler = __bind(this.scrollHandler, this);
      this.start = __bind(this.start, this);
      this.scrolled = true;
      this.config = this.util().extend(options, this.defaults);
    }

    WOW.prototype.init = function() {
      var _ref;
      this.element = window.document.documentElement;
      if ((_ref = document.readyState) === "interactive" || _ref === "complete") {
        return this.start();
      } else {
        return document.addEventListener('DOMContentLoaded', this.start);
      }
    };

    WOW.prototype.start = function() {
      var box, _i, _len, _ref;
      this.boxes = this.element.getElementsByClassName(this.config.boxClass);
      if (this.boxes.length) {
        if (this.disabled()) {
          return this.resetStyle();
        } else {
          _ref = this.boxes;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            box = _ref[_i];
            this.applyStyle(box, true);
          }
          window.addEventListener('scroll', this.scrollHandler, false);
          window.addEventListener('resize', this.scrollHandler, false);
          return this.interval = setInterval(this.scrollCallback, 50);
        }
      }
    };

    WOW.prototype.stop = function() {
      window.removeEventListener('scroll', this.scrollHandler, false);
      window.removeEventListener('resize', this.scrollHandler, false);
      if (this.interval != null) {
        return clearInterval(this.interval);
      }
    };

    WOW.prototype.show = function(box) {
      this.applyStyle(box);
      return box.className = "" + box.className + " " + this.config.animateClass;
    };

    WOW.prototype.applyStyle = function(box, hidden) {
      var delay, duration, iteration;
      duration = box.getAttribute('data-wow-duration');
      delay = box.getAttribute('data-wow-delay');
      iteration = box.getAttribute('data-wow-iteration');
      return box.setAttribute('style', this.customStyle(hidden, duration, delay, iteration));
    };

    WOW.prototype.resetStyle = function() {
      var box, _i, _len, _ref, _results;
      _ref = this.boxes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        box = _ref[_i];
        _results.push(box.setAttribute('style', 'visibility: visible;'));
      }
      return _results;
    };

    WOW.prototype.customStyle = function(hidden, duration, delay, iteration) {
      var style;
      style = hidden ? "visibility: hidden; -webkit-animation-name: none; -moz-animation-name: none; animation-name: none;" : "visibility: visible;";
      if (duration) {
        style += "-webkit-animation-duration: " + duration + "; -moz-animation-duration: " + duration + "; animation-duration: " + duration + ";";
      }
      if (delay) {
        style += "-webkit-animation-delay: " + delay + "; -moz-animation-delay: " + delay + "; animation-delay: " + delay + ";";
      }
      if (iteration) {
        style += "-webkit-animation-iteration-count: " + iteration + "; -moz-animation-iteration-count: " + iteration + "; animation-iteration-count: " + iteration + ";";
      }
      return style;
    };

    WOW.prototype.scrollHandler = function() {
      return this.scrolled = true;
    };

    WOW.prototype.scrollCallback = function() {
      var box;
      if (this.scrolled) {
        this.scrolled = false;
        this.boxes = (function() {
          var _i, _len, _ref, _results;
          _ref = this.boxes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            box = _ref[_i];
            if (!(box)) {
              continue;
            }
            if (this.isVisible(box)) {
              this.show(box);
              continue;
            }
            _results.push(box);
          }
          return _results;
        }).call(this);
        if (!this.boxes.length) {
          return this.stop();
        }
      }
    };

    WOW.prototype.offsetTop = function(element) {
      var top;
      top = element.offsetTop;
      while (element = element.offsetParent) {
        top += element.offsetTop;
      }
      return top;
    };

    WOW.prototype.isVisible = function(box) {
      var bottom, offset, top, viewBottom, viewTop;
      offset = box.getAttribute('data-wow-offset') || this.config.offset;
      viewTop = window.pageYOffset;
      viewBottom = viewTop + this.element.clientHeight - offset;
      top = this.offsetTop(box);
      bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
    };

    WOW.prototype.util = function() {
      return this._util || (this._util = new Util());
    };

    WOW.prototype.disabled = function() {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    };

    return WOW;

  })();

}).call(this);


wow = new WOW(
  {
    animateClass: 'animated',
    offset: 10
  }
);
wow.init();
$(".gallery").colorbox({rel:'hình ảnh', transition:"elastic"});
