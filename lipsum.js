//Copyright (C) 2011 Bhavya Kashyap

(function( $ ){
	$.fn.lipsum = function( options ) {
    options = $.extend({
    type: 'paragraphs',
	  number: '5',
	  spaces: 'true'
    }, options);

	var lorem = new Array(5);
	lorem[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed tellus quis arcu porttitor ullamcorper non id justo. Suspendisse dictum sodales est, ut consectetur leo sollicitudin tempus. Nullam tempus ultricies lobortis. Aliquam id bibendum orci. Morbi non quam sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam a metus ipsum, eget laoreet quam. Quisque condimentum pretium elit sed rutrum. Maecenas pretium sem in nisl pharetra in dignissim quam condimentum. Morbi consectetur blandit nibh, id hendrerit turpis ornare in. Suspendisse ac enim ullamcorper lorem scelerisque facilisis. Pellentesque porta, ante nec malesuada aliquam, ipsum ligula sodales tortor, sed eleifend sem nulla posuere arcu. Donec adipiscing, mi vel dapibus pulvinar, eros urna euismod velit, et gravida dolor urna vel magna. Mauris at nisi enim. Suspendisse condimentum magna porttitor nibh rutrum consequat. Etiam facilisis aliquet libero sit amet fermentum. Nullam ligula ipsum, placerat eget elementum quis, gravida a urna. Vestibulum mollis bibendum nunc, sed suscipit eros ultricies quis. Quisque laoreet massa eu diam fringilla consequat. Morbi et sapien est. ";
	lorem[1] = "Ut porttitor, est non ullamcorper semper, magna nunc molestie felis, eget hendrerit lectus justo sed arcu. Mauris massa justo, semper sit amet feugiat rutrum, varius at dui. Etiam vel augue eget sapien elementum scelerisque id vitae diam. Nulla facilisi. Nullam nec ipsum quis augue ullamcorper bibendum facilisis quis massa. Donec ac vehicula purus. Mauris orci odio, aliquam sit amet feugiat faucibus, interdum mattis odio. Donec est nunc, lacinia quis aliquam vel, molestie vel arcu. Duis bibendum, tortor vel porttitor tincidunt, enim orci auctor turpis, non tempor dolor orci in sem. Nam euismod imperdiet velit a posuere. Vivamus condimentum sem vel lectus gravida ut ornare eros dignissim. Maecenas vestibulum leo elementum mauris molestie aliquam cursus nisi consequat. Pellentesque eu risus tellus, non blandit purus. In hac habitasse platea dictumst. Duis id sapien sit amet arcu dignissim commodo vel a ante. In hac habitasse platea dictumst. Aliquam erat volutpat. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam augue enim, pretium vitae malesuada nec, lacinia eu dolor. Integer nec orci ipsum, nec blandit nunc. ";
	lorem[2] = "Duis rutrum est aliquam justo scelerisque feugiat. Mauris tempus molestie tempor. Aliquam nec tortor ante. Nullam hendrerit hendrerit justo a blandit. Donec non risus non sapien bibendum hendrerit. Nam quis varius ipsum. In tincidunt dui volutpat dui eleifend ultrices. Suspendisse eros ligula, viverra non pellentesque at, scelerisque quis eros. Vivamus imperdiet viverra dictum. Sed in arcu quis eros porta pretium ut sed diam. Aliquam justo enim, malesuada sed accumsan ac, sollicitudin quis turpis. Quisque iaculis, risus quis semper dictum, sem erat vehicula elit, ac facilisis nibh justo eu ligula. ";
	lorem[3] = "Aliquam vulputate dolor vel quam accumsan at ultricies ante mattis. Nullam sollicitudin est nec magna feugiat in rutrum libero venenatis. Phasellus ultrices sapien ut tellus scelerisque eget iaculis ipsum auctor. Sed gravida venenatis dui sit amet iaculis. Curabitur aliquet ornare turpis vel luctus. Aliquam posuere dapibus magna, id tempus leo adipiscing non. Nam quis mauris magna. In hac habitasse platea dictumst. Donec nibh augue, adipiscing nec tincidunt vitae, consectetur id urna. Etiam molestie urna a neque vestibulum pulvinar. Quisque ac ornare ipsum. Donec in risus quis magna ullamcorper commodo nec ut orci. Morbi sed purus quis neque tincidunt sagittis dictum eu orci. Quisque pellentesque erat nec nisi blandit nec hendrerit enim fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In imperdiet vestibulum dapibus. Vestibulum vel tortor sed quam aliquet eleifend sed ac eros. Vestibulum nisi metus, imperdiet et ultricies a, scelerisque eu augue. ";
	lorem[4] = "Aenean ut lectus quis eros iaculis dignissim. Donec eget arcu a sapien adipiscing vehicula. Curabitur scelerisque leo nec quam condimentum nec porttitor ipsum aliquet. Vivamus mollis feugiat erat non malesuada. Pellentesque nulla magna, tristique sed tristique sed, gravida a quam. Quisque ornare justo ac lorem sollicitudin mattis. Proin euismod gravida turpis, eget eleifend nulla eleifend quis. Pellentesque auctor, lacus a ultricies vulputate, odio felis adipiscing dui, at feugiat velit urna lacinia purus. Pellentesque lacinia pulvinar enim, sed ornare elit laoreet at. Quisque placerat ligula et justo porta vel interdum nibh commodo. Nulla at mauris quam, at condimentum mi. Nullam ac enim elit. Mauris eget eros nec nibh euismod interdum. Praesent et elit augue. Morbi lobortis viverra aliquet. Morbi facilisis blandit lobortis. In consequat luctus leo id euismod. In vitae posuere nibh. ";
	
	this.each(function() {
	  	$(this).html("");
  		var number = parseInt( options.number );
  		if( options.type == 'paragraphs' ){
  			for(var i = 0; i < number; i++){
  				$(this).append('<p>'+lorem[i%5]+'</p>');
  			}
  		} else if ( options.type == 'words' ){
  		  var totalWords;
  			for(var i = 0; i < lorem.length; i++){
  			  totalWords = lorem[i]; 
  			}
  			var words = totalWords.split(/\s+/);
  			var wordCount = words.length;
  			var display = "";
			
  			for(var j = 0; j < number; j++){
  				if( options.spaces == 'true' ){
  					display = display + " " + words[j%wordCount];
  				} else {
  					display = display + words[j%wordCount];
  				}
  			}
  			$(this).append(display);	
  			words = null;	
  		}
  		
  		lorem = null;	
    });
  };   
})( jQuery );