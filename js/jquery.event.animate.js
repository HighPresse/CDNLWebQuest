/*	

	jQuery animating event by Alex Carr (alex@alexacarr.com)

	Adds an 'animating' event to jQuery that is triggered during the element's animation.

	MIT License - http://www.opensource.org/licenses/mit-license.php

	*******************************************************************************************

	summary: 
	
		Adds an 'animating' event to jQuery that is triggered during the element's animation.
		Be warned that this plugin overides jQuery's fx.step._default method so we can fire
		the event for every animation step. It calls the original jQuery method but there could
		be issues if the method is every changed in future jQuery releases. Only tested with 
		jQuery 1.4.3.
		
 	example:
	
		$('#myElement').bind('animating', function(event){
		
			Your code here.
		
		});	
*/


(function($){

	var originalStepMethod = $.fx.step._default;

	var elems = $([]);

	$.event.special.animating = {

		setup : function( data, namespaces ) 
		{	
			elems = elems.add( $(this) );
		},

		teardown : function( namespaces ) 
		{	
			elems = elems.not( this );
		},

		add : function( handleObj ) 
		{	
			var element = $(this);

      		var oldHandler = handleObj.handler;

      		handleObj.handler = function(event) {
        		oldHandler.apply( this, arguments );
      		};
		}
	};

	function triggerAnimating( element )
	{
		var l = elems.length + 1;
	    while (l -= 1)
	    {
	        if (elems[l - 1] === element )
	        {
	            $(element).trigger('animating');
	        }
	    }

	};

	$.fx.step._default = function( fx )
 	{
 		triggerAnimating(fx.elem);
		originalStepMethod.apply( this, arguments );
	};

})(jQuery);