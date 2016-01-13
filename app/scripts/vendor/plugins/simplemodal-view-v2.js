define(['talent', '_', '$', 'Backbone'], function(Talent, _, $, Backbone) {
	var doc = $(document),
		ua = navigator.userAgent.toLowerCase(),
		wndw = $(window);

	var browser = {
		ieQuirks: null,
		msie: /msie/.test(ua) && !/opera/.test(ua),
		opera: /opera/.test(ua)
	};
	browser.ie6 = browser.msie && /msie 6./.test(ua) && typeof window['XMLHttpRequest'] !== 'object';
	browser.ie7 = browser.msie && /msie 7.0/.test(ua);

	browser.boxModel = (document.compatMode === "CSS1Compat");


	/*
	 * SimpleModal default options
	 *
	 * appendTo:		(String:'body') The jQuery selector to append the elements to. For .NET, use 'form'.
	 * focus:			(Boolean:true) Focus in the first visible, enabled element?
	 * opacity:			(Number:50) The opacity value for the overlay div, from 0 - 100
	 * overlayId:		(String:'simplemodal-overlay') The DOM element id for the overlay div
	 * overlayCss:		(Object:{}) The CSS styling for the overlay div
	 * containerId:		(String:'simplemodal-container') The DOM element id for the container div
	 * containerCss:	(Object:{}) The CSS styling for the container div
	 * dataId:			(String:'simplemodal-data') The DOM element id for the data div
	 * dataCss:			(Object:{}) The CSS styling for the data div
	 * minHeight:		(Number:null) The minimum height for the container
	 * minWidth:		(Number:null) The minimum width for the container
	 * maxHeight:		(Number:null) The maximum height for the container. If not specified, the window height is used.
	 * maxWidth:		(Number:null) The maximum width for the container. If not specified, the window width is used.
	 * autoResize:		(Boolean:false) Automatically resize the container if it exceeds the browser window dimensions?
	 * autoPosition:	(Boolean:true) Automatically position the container upon creation and on window resize?
	 * zIndex:			(Number: 1000) Starting z-index value
	 * close:			(Boolean:true) If true, closeHTML, escClose and overClose will be used if set.
	 							If false, none of them will be used.
	 * closeHTML:		(String:'<a class="modalCloseImg" title="Close"></a>') The HTML for the default close link.
								SimpleModal will automatically add the closeClass to this element.
	 * closeClass:		(String:'simplemodal-close') The CSS class used to bind to the close event
	 * escClose:		(Boolean:true) Allow Esc keypress to close the dialog?
	 * overlayClose:	(Boolean:false) Allow click on overlay to close the dialog?
	 * fixed:			(Boolean:true) If true, the container will use a fixed position. If false, it will use a
								absolute position (the dialog will scroll with the page)
	 * position:		(Array:null) Position of container [top, left]. Can be number of pixels or percentage
	 * persist:			(Boolean:false) Persist the data across modal calls? Only used for existing
								DOM elements. If true, the data will be maintained across modal calls, if false,
								the data will be reverted to its original state.
	 * modal:			(Boolean:true) User will be unable to interact with the page below the modal or tab away from the dialog.
								If false, the overlay, iframe, and certain events will be disabled allowing the user to interact
								with the page below the dialog.
	 * onOpen:			(Function:null) The callback function used in place of SimpleModal's open
	 * onShow:			(Function:null) The callback function used after the modal dialog has opened
	 * onClose:			(Function:null) The callback function used in place of SimpleModal's close
	 */
	var defaults = {
		focus: false,
		opacity: 50,
		overlayId: 'simplemodal-overlay',
		overlayCss: {
			"backgroundColor": "black"
		},
		containerId: 'simplemodal-container',
		containerCss: {},
		dataId: 'simplemodal-data',
		dataCss: {},
		minHeight: null,
		minWidth: null,
		maxHeight: null,
		maxWidth: null,
		autoResize: false,
		autoPosition: true,
		zIndex: 1000,
		close: true,
		closeHTML: '<a class="modalCloseImg" title="Close"></a>',
		closeClass: 'simplemodal-close',
		escClose: false,
		overlayClose: false,
		fixed: true,
		position: null,
		persist: false,
		modal: true,
		onOpen: null,
		onShow: null,
		onClose: null
	};

	var totalInstance = 0;

	return Backbone.View.extend({
		template: "<div></div>",
		ui: {
			// "uiItem":".uiItem li"
		},
		events: function() {
			var events = {};
			// events["click " + this.ui.uiItem]="clickNavItem";
			return events;
		},
		initialize: function(options) {
			this.options = options;
			this.d = [];

			// set in getDimensions
			this.dTemp = [];
			this.wTemp = [];

			// $.support.boxModel is undefined if checked earlier
			browser.ieQuirks = browser.msie && !browser.boxModel;

			// merge defaults and user options
			var localDefaults = $.extend({}, defaults);

			// avoid default id conflict
			var total = totalInstance++;
			localDefaults['overlayId'] = defaults['overlayId'] + "-" + total;
			localDefaults['containerId'] = defaults['containerId'] + "-" + total;
			localDefaults['dataId'] = defaults['dataId'] + "-" + total;

			this.o = $.extend(localDefaults, this.options);

			// keep track of z-index
			this.zIndex = this.o.zIndex;

			// set the onClose callback flag
			this.occb = false;
		},
		render: function(data) {
			if (data) {
				this.o.data = data;
			} else {
				data = this.options.data;
			}
			// determine how to handle the data based on its type
			if (typeof data === 'object') {
				// convert DOM object to a jQuery object
				data = data instanceof $ ? data : $(data);
				this.d.placeholder = false;

				// if the object came from the DOM, keep track of its parent
				if (data.parent().parent().size() > 0) {
					data.before($('<span></span>')
						.attr('id', 'simplemodal-placeholder')
						.css({
							display: 'none'
						}));

					this.d.placeholder = true;
					this.display = data.css('display');

					// persist changes? if not, make a clone of the element
					if (!this.o.persist) {
						this.d.orig = data.clone(true);
					}
				}
			} else if (typeof data === 'string' || typeof data === 'number') {
				// just insert the data as innerHTML
				data = $('<div></div>').html(data);
			} else {
				// unsupported data type!
				alert('SimpleModal Error: Unsupported data type: ' + typeof data);
			}
			// create the modal overlay, container and, if necessary, iframe
			this.create(data);
			// data = null;

			// display the modal dialog
			this.open();

			// useful for adding events/manipulating data in the modal dialog
			if ($.isFunction(this.o.onShow)) {
				this.o.onShow.apply(this, [this.d]);
			}

			return this.$el;
		},

		//this will show a Talent.View, if not goto the origin process
		show: function(data) {
			if (data) {
				this.o.data = data;
			} else {
				data = this.options.data;
			}
			// determine how to handle the data based on its type
			if (typeof data === 'object') {
				// convert DOM object to a jQuery object
				// data = data instanceof Talent.View ? data : $(data);
				if (!(data instanceof Talent.View)) return this.render(data);
				// create the modal overlay, container and, if necessary, iframe
				this.create(data, true);
				// data = null;

				// display the modal dialog
				this.open();

				// useful for adding events/manipulating data in the modal dialog
				if ($.isFunction(this.o.onShow)) {
					this.o.onShow.apply(this, [this.d]);
				}
			} else return this.render(data);

			return this.$el;
		},

		wrapDataInRegion: function(data) {
			this.tmpr = new Talent.Region({
				el: $("<div></div>")
			});
			this.tmpr.show(data);
			return this.tmpr.$el;
		},
		/*
		 * Create and add the modal overlay and container to the page
		 */
		create: function(data, v) {
			// get the window properties
			if (v) data = this.wrapDataInRegion(data);

			this.getDimensions();

			var s = this,
				d = this.dTemp,
				w = this.wTemp;

			// add an iframe to prevent select options from bleeding through
			if (s.o.modal && browser.ie6) {
				s.d.iframe = $('<iframe src="javascript:false;"></iframe>')
					.css($.extend(s.o.iframeCss, {
						display: 'none',
						opacity: 0,
						position: 'fixed',
						height: w[0],
						width: w[1],
						zIndex: s.o.zIndex,
						top: 0,
						left: 0
					}))
					.appendTo(s.$el);
			}

			// create the overlay
			s.d.overlay = $('<div></div>')
				.attr('id', s.o.overlayId)
				.addClass('simplemodal-overlay')
				.css($.extend(s.o.overlayCss, {
					display: 'none',
					opacity: s.o.opacity / 100,
					filter: "alpha(opacity=" + s.o.opacity + ")",
					height: "100%", //s.o.modal ? d[0] : 0,
					width: s.o.modal ? d[1] : 0,
					position: 'fixed',
					left: 0,
					top: 0,
					zIndex: s.o.zIndex + 1
				}))
				.appendTo(s.$el);

			// create the container
			s.d.container = $('<div></div>')
				.attr('id', s.o.containerId)
				.addClass('simplemodal-container')
				.css($.extend({
						position: s.o.fixed ? 'fixed' : 'absolute'
					},
					s.o.containerCss, {
						display: 'none',
						zIndex: s.o.zIndex + 2
					}
				))
				.append(s.o.close && s.o.closeHTML ? $(s.o.closeHTML).addClass(s.o.closeClass) : '')
				.appendTo(s.$el);

			s.d.wrap = $('<div></div>')
				.attr('tabIndex', -1)
				.addClass('simplemodal-wrap')
				.css({
					height: '100%',
					outline: 0,
					width: '100%'
				})
				.appendTo(s.d.container);

			// add styling and attributes to the data
			// append to body to get correct dimensions, then move to wrap
			s.d.data = data
				.attr('id', data.attr('id') || s.o.dataId)
				.addClass('simplemodal-data')
				.css($.extend(s.o.dataCss, {
					display: 'none'
				}))
				.appendTo('body');
			data = null;

			s.setContainerDimensions();
			s.d.data.appendTo(s.d.wrap);

			// fix issues with IE
			if (browser.ie6 || browser.ieQuirks) {
				s.fixIE();
			}
		},
		/*
		 * Bind events
		 */
		bindEvents: function() {
			var s = this,
				d = this.dTemp,
				w = this.wTemp;

			// bind the close event to any element with the closeClass class
			s.$el.find('.' + s.o.closeClass).bind('click.simplemodal', function(e) {
				e.preventDefault();
				setTimeout(function() {
					s.close();
				}, 10)
			});

			// bind the overlay click to the close function, if enabled
			if (s.o.modal && s.o.close && s.o.overlayClose) {
				s.d.overlay.bind('click.simplemodal', function(e) {
					e.preventDefault();
					s.close();
				});
			}

			// bind keydown events
			doc.bind('keydown.simplemodal', function(e) {
				if (s.o.modal && e.keyCode === 9) { // TAB
					s.watchTab(e);
				} else if ((s.o.close && s.o.escClose) && e.keyCode === 27) { // ESC
					e.preventDefault();
					s.close();
				}
			});

			// update window size
			wndw.bind('resize.simplemodal orientationchange.simplemodal', function() {
				// redetermine the window width/height
				s.getDimensions();

				// reposition the dialog
				s.o.autoResize ? s.setContainerDimensions() : s.o.autoPosition && s.setPosition();

				if (browser.ie6 || browser.ieQuirks) {
					s.fixIE();
				} else if (s.o.modal) {
					// update the iframe & overlay
					s.d.iframe && s.d.iframe.css({
						height: w[0],
						width: w[1]
					});
					s.d.overlay.css({
						height: d[0],
						width: d[1]
					});
				}
			});
		},
		/*
		 * Unbind events
		 */
		unbindEvents: function() {
			$('.' + this.o.closeClass).unbind('click.simplemodal');
			doc.unbind('keydown.simplemodal');
			wndw.unbind('.simplemodal');
			this.d.overlay.unbind('click.simplemodal');
		},
		/*
		 * Fix issues in IE6 and IE7 in quirks mode
		 */
		fixIE: function() {
			var s = this,
				p = s.o.position,
				d = this.dTemp,
				w = this.wTemp;

			// simulate fixed position - adapted from BlockUI
			$.each([s.d.iframe || null, !s.o.modal ? null : s.d.overlay, s.d.container.css('position') === 'fixed' ? s.d.container : null], function(i, el) {
				if (el) {
					var bch = 'document.body.clientHeight',
						bcw = 'document.body.clientWidth',
						bsh = 'document.body.scrollHeight',
						bsl = 'document.body.scrollLeft',
						bst = 'document.body.scrollTop',
						bsw = 'document.body.scrollWidth',
						ch = 'document.documentElement.clientHeight',
						cw = 'document.documentElement.clientWidth',
						sl = 'document.documentElement.scrollLeft',
						st = 'document.documentElement.scrollTop',
						s = el[0].style;

					s.position = 'absolute';
					if (i < 2) {
						s.removeExpression('height');
						s.removeExpression('width');
						s.setExpression('height', '' + bsh + ' > ' + bch + ' ? ' + bsh + ' : ' + bch + ' + "px"');
						s.setExpression('width', '' + bsw + ' > ' + bcw + ' ? ' + bsw + ' : ' + bcw + ' + "px"');
					} else {
						var te, le;
						if (p && p.constructor === Array) {
							var top = p[0] ? typeof p[0] === 'number' ? p[0].toString() : p[0].replace(/px/, '') : el.css('top').replace(/px/, '');
							te = top.indexOf('%') === -1 ? top + ' + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"' : parseInt(top.replace(/%/, '')) + ' * ((' + ch + ' || ' + bch + ') / 100) + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"';

							if (p[1]) {
								var left = typeof p[1] === 'number' ? p[1].toString() : p[1].replace(/px/, '');
								le = left.indexOf('%') === -1 ? left + ' + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"' : parseInt(left.replace(/%/, '')) + ' * ((' + cw + ' || ' + bcw + ') / 100) + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"';
							}
						} else {
							te = '(' + ch + ' || ' + bch + ') / 2 - (this.offsetHeight / 2) + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"';
							le = '(' + cw + ' || ' + bcw + ') / 2 - (this.offsetWidth / 2) + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"';
						}
						s.removeExpression('top');
						s.removeExpression('left');
						s.setExpression('top', te);
						s.setExpression('left', le);
					}
				}
			});
		},
		/*
		 * Place focus on the first or last visible input
		 */
		focus: function(pos) {
			var s = this,
				p = pos && $.inArray(pos, ['first', 'last']) !== -1 ? pos : 'first';

			// focus on dialog or the first visible/enabled input element
			var input = $(':input:enabled:visible:' + p, s.d.wrap);
			setTimeout(function() {
				input.length > 0 ? input.focus() : s.d.wrap.focus();
			}, 10);
		},
		getDimensions: function() {
			// fix a jQuery bug with determining the window height - use innerHeight if available
			var s = this,
				h = typeof window.innerHeight === 'undefined' ? wndw.height() : window.innerHeight;

			this.dTemp = [doc.height(), doc.width()];
			this.wTemp = [h, wndw.width()];
		},
		getVal: function(v, d) {
			var w = this.wTemp;
			return v ? (typeof v === 'number' ? v : v === 'auto' ? 0 : v.indexOf('%') > 0 ? ((parseInt(v.replace(/%/, '')) / 100) * (d === 'h' ? w[0] : w[1])) : parseInt(v.replace(/px/, ''))) : null;
		},
		/*
		 * Update the container. Set new dimensions, if provided.
		 * Focus, if enabled. Re-bind events.
		 */
		update: function(height, width) {
			var s = this;

			// prevent update if dialog does not exist
			if (!s.d.data) {
				return false;
			}

			// reset orig values
			s.d.origHeight = s.getVal(height, 'h');
			s.d.origWidth = s.getVal(width, 'w');

			// hide data to prevent screen flicker
			s.d.data.hide();
			height && s.d.container.css('height', height);
			width && s.d.container.css('width', width);
			s.setContainerDimensions();
			s.d.data.show();
			s.o.focus && s.focus();

			// rebind events
			s.unbindEvents();
			s.bindEvents();
		},
		setContainerDimensions: function() {
			var s = this,
				badIE = browser.ie6 || browser.ie7,
				p = s.o.position,
				d = this.dTemp,
				w = this.wTemp;

			// get the dimensions for the container and data
			var ch = s.d.origHeight ? s.d.origHeight : browser.opera ? s.d.container.height() : s.getVal(badIE ? s.d.container[0].currentStyle['height'] : s.d.container.css('height'), 'h'),
				//cw = s.d.origWidth ? s.d.origWidth : browser.opera ? s.d.container.width() : s.getVal(badIE ? s.d.container[0].currentStyle['width'] : s.d.container.css('width'), 'w'),				
				cw = s.d.origWidth ? s.d.origWidth : browser.opera ? s.d.container.width() : s.getVal(badIE ? s.d.container[0].currentStyle['width'] : s.d.container.css('width'), 'w'),
				dh = s.d.data.outerHeight(true),
				dw = s.d.data.outerWidth(true);

			s.d.origHeight = s.d.origHeight || ch;
			s.d.origWidth = s.d.origWidth || cw;

			// mxoh = max option height, mxow = max option width
			var mxoh = s.o.maxHeight ? s.getVal(s.o.maxHeight, 'h') : null,
				mxow = s.o.maxWidth ? s.getVal(s.o.maxWidth, 'w') : null,
				mh = mxoh && mxoh < w[0] ? mxoh : w[0],
				mw = mxow && mxow < w[1] ? mxow : w[1];

			// moh = min option height
			var moh = s.o.minHeight ? s.getVal(s.o.minHeight, 'h') : 'auto';
			if (!ch) {
				if (!dh) {
					ch = moh;
				} else {
					if (dh > mh) {
						ch = mh;
					} else if (s.o.minHeight && moh !== 'auto' && dh < moh) {
						ch = moh;
					} else {
						ch = dh;
					}
				}
			} else {
				ch = s.o.autoResize && ch > mh ? mh : ch < moh ? moh : ch;
			}

			// mow = min option width
			var mow = s.o.minWidth ? s.getVal(s.o.minWidth, 'w') : 'auto';
			if (!cw) {
				if (!dw) {
					cw = mow;
				} else {
					if (dw > mw) {
						cw = mw;
					} else if (s.o.minWidth && mow !== 'auto' && dw < mow) {
						cw = mow;
					} else {
						cw = dw;
					}
				}
			} else {
				cw = s.o.autoResize && cw > mw ? mw : cw < mow ? mow : cw;
			}
			s.d.container.css({
				height: ch,
				width: cw
			});
			s.d.wrap.css({
				overflow: (dh > ch || dw > cw) ? 'auto' : 'visible'
			});
			s.o.autoPosition && s.setPosition();
		},
		setPosition: function() {
			var d = this.dTemp,
				w = this.wTemp;
			var s = this,
				top, left,
				hc = (w[0] / 2) - (s.d.container.outerHeight(true) / 2),
				vc = (w[1] / 2) - (s.d.container.outerWidth(true) / 2),
				st = s.d.container.css('position') !== 'fixed' ? wndw.scrollTop() : 0;

			if (s.o.position && Object.prototype.toString.call(s.o.position) === '[object Array]') {
				top = st + (s.o.position[0] || hc);
				left = s.o.position[1] || vc;
			} else {
				top = st + hc;
				left = vc;
			}
			s.d.container.css({
				left: left,
				top: top
			});
		},
		watchTab: function(e) {
			var s = this;

			if ($(e.target).parents('.simplemodal-container').length > 0) {
				// save the list of inputs
				s.inputs = $(':input:enabled:visible:first, :input:enabled:visible:last', s.d.data[0]);

				// if it's the first or last tabbable element, refocus
				if ((!e.shiftKey && e.target === s.inputs[s.inputs.length - 1]) ||
					(e.shiftKey && e.target === s.inputs[0]) ||
					s.inputs.length === 0) {
					e.preventDefault();
					var pos = e.shiftKey ? 'last' : 'first';
					s.focus(pos);
				}
			} else {
				// might be necessary when custom onShow callback is used
				e.preventDefault();
				s.focus();
			}
		},
		/*
		 * Open the modal dialog elements
		 * - Note: If you use the onOpen callback, you must "show" the
		 *         overlay and container elements manually
		 *         (the iframe will be handled by SimpleModal)
		 */
		open: function() {
			var s = this;
			// display the iframe
			s.d.iframe && s.d.iframe.show();

			if ($.isFunction(s.o.onOpen)) {
				// execute the onOpen callback
				s.o.onOpen.apply(s, [s.d]);
			} else {
				// display the remaining elements
				s.d.overlay.show();
				s.d.container.show();
				s.d.data.show();
			}

			s.o.focus && s.focus();

			// bind default events
			s.bindEvents();
		},
		/*
		 * Close the modal dialog
		 * - Note: If you use an onClose callback, you must remove the
		 *         overlay, container and iframe elements manually
		 *
		 * @param {boolean} external Indicates whether the call to this
		 *     function was internal or external. If it was external, the
		 *     onClose callback will be ignored
		 */
		close: function() {
			var s = this;

			// prevent close when dialog does not exist
			if (!s.d.data) {
				return false;
			}

			// remove the default events
			s.unbindEvents();

			if ($.isFunction(s.o.onClose) && !s.occb) {
				// set the onClose callback flag
				s.occb = true;

				// execute the onClose callback
				s.o.onClose.apply(s, [s.d]);
			} else {
				// IE8 bugfix: dom operation error
				setTimeout(function() {
					// if the data came from the DOM, put it back
					if (s.d.placeholder) {
						var ph = $('#simplemodal-placeholder');
						// save changes to the data?
						if (s.o.persist) {
							// insert the (possibly) modified data back into the DOM
							ph.replaceWith(s.d.data.removeClass('simplemodal-data').css('display', s.display));
						} else {
							// remove the current and insert the original,
							// unmodified data back into the DOM
							s.d.data.hide().remove();
							ph.replaceWith(s.d.orig);
						}
					} else {
						// otherwise, remove it
						s.d.data.hide().remove();
					}

					// remove the remaining elements
					this.tmpr && this.tmpr.close();
					s.d.container.hide().remove();
					s.d.overlay.hide();
					s.d.iframe && s.d.iframe.hide().remove();
					s.d.overlay.remove();

					// reset the dialog object
					s.d = {};
					s.$el.remove();
				}, 0);
			}
		}
	});
});