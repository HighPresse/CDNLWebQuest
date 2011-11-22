(function ($) {
	//Shortcut for fancyBox object
	var F = $.fancybox;

	//Add helper object
	F.helpers.buttons = {
		tpl: '<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:$.fancybox.prev();">Previous</a></li><li><a class="btnPlay" title="Slideshow" href="javascript:$.fancybox.play();;">Play</a></li><li><a class="btnNext" title="Next" href="javascript:$.fancybox.next();">Next</a></li><li><a class="btnToggle" title="Toggle size" href="javascript:$.fancybox.toggle();">Toggle</a></li><li><a class="btnClose" title="Close" href="javascript:$.fancybox.close();">Close</a></li></ul></div>',
		list: null,
		buttons: {},

		//Recheck if can toggle size
		update: function () {
			var toggle = this.buttons.toggle.removeClass('btnDisabled btnToggleOn');

			//Size toggle button
			if (F.current.canShrink) {
				toggle.addClass('btnToggleOn');

			} else if (!F.current.canExpand) {
				toggle.addClass('btnDisabled');
			}
		},

		beforeShow: function () {
			//Increase top margin to give space for buttons
			F.current.margin[0] += 30;
		},

		// Update slideshow button
		onPlayStart: function () {
			if (this.list) {
				this.buttons.play.text('Pause').addClass('btnPlayOn');
			}
		},

		onPlayEnd: function () {
			if (this.list) {
				this.buttons.play.text('Play').removeClass('btnPlayOn');
			}
		},

		afterShow: function () {
			// Check if initialised
			if (!this.list) {
				this.list = $(this.tpl).appendTo('body');

				this.buttons = {
					prev : this.list.find('.btnPrev'),
					next : this.list.find('.btnNext'),
					play : this.list.find('.btnPlay'),
					toggle : this.list.find('.btnToggle')
				}
			}

			//Update navigation buttons
			if (F.current.index > 0 || F.current.loop) {
				this.buttons.prev.removeClass('btnDisabled');
			} else {
				this.buttons.prev.addClass('btnDisabled');
			}

			if (F.current.loop || F.current.index < F.group.length - 1) {
				this.buttons.next.removeClass('btnDisabled');
				this.buttons.play.removeClass('btnDisabled');

			} else {
				this.buttons.next.addClass('btnDisabled');
				this.buttons.play.addClass('btnDisabled');
			}

			this.update();
		},

		onUpdate: function () {
			this.update();
		},

		beforeClose: function (opts) {
			if (this.list) {
				this.list.remove();
			}

			this.list = null;
			this.buttons = {};
		}
	};

}(jQuery));