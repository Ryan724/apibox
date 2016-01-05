var Talent = (function(global, Backbone, _){
	"use strict";
	//version 0.3.2-8
	var Marionette = Backbone.Marionette;

	// Define and export the Talent namespace
	var Talent = {};

	// Get the DOM manipulator for later use
	Talent.$ = Backbone.$;
	Talent._ = _;

	/**
	 * bugfix: IE7- cross domain;
	 * support forceTrigge;
	 * encode fragment after location hash ;
	 */
	Backbone.History.prototype.navigate = function(fragment, options) {
		if(this.iframe && !this.setIframe) {
			this.iframe = window;
			this.setIframe = true;
		}
		if (!Backbone.History.started) return false;
		if (!options || options === true) options = {trigger: options};
		fragment = encodeURIComponent(this.getFragment(fragment || '')); 
		if ((this.fragment === fragment) && !options.forceTrigger) return;
		this.fragment = fragment;
		var url = this.root + fragment;
	
		// If pushState is available, we use it to set the fragment as a real URL.
		if (this._hasPushState) {
			this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
	
			// If hash changes haven't been explicitly disabled, update the hash
			// fragment to store history.
			} else if (this._wantsHashChange) { 
				this._updateHash(this.location, fragment, options.replace);
				if (this.iframe && (fragment !== encodeURIComponent(this.getFragment(this.getHash(this.iframe))))) {
				// Opening and closing the iframe tricks IE7 and earlier to push a
				// history entry on hash-tag change.  When replace is true, we don't
				// want this.
				if(!options.replace) this.iframe.document.open().close();
				this._updateHash(this.iframe.location, fragment, options.replace);
			}
	
		// If you've told us that you explicitly don't want fallback hashchange-
		// based history, then `navigate` becomes a page refresh.
		} else {
			return this.location.assign(url);
		}
		if (options.trigger) this.loadUrl(fragment);
	};
	// bugfix: find missing events by re-delegating
	Marionette.Region.prototype.show = function(view, options){
		this.ensureEl();
		options = options || {};
		if (view !== this.currentView) {
			if(this.currentView) {
				var lastViewEl = $(this.currentView.el).clone();
			}
			this.close();
			
			if(view.isClosed){
				view._initialEvents && view._initialEvents();
			}
			view.render();
			view.undelegateEvents();
			this.open(view, options);
			view.unbindUIElements && view.unbindUIElements();
			view.delegateEvents();
			view.bindUIElements && view.bindUIElements();			
		} else {
			view.render();
		}
		Marionette.triggerMethod.call(view, "show");
		Marionette.triggerMethod.call(this, "show", view);
	
		this.currentView = view;
		if(options.noAnimate) {
			return ;
		}
		// showAnimation.call(this, view, lastViewEl);
		
		function showAnimation( view, lastViewEl) {
			var self = this;
			
			// add animation
			if(lastViewEl && (navigator.userAgent && navigator.userAgent.indexOf('Chrome') != -1)) {		
				this.$el.bind('webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend', function(){
					self.$el.find(lastViewEl).remove();
					self.$el.removeClass('_animate_container _animate_flip_rotate');				
					self.$el.find(view.el).attr('_animate_end', true).removeClass('_animate_rotate_back');
					//.animate({height : self.$el.find(view.el).height()}, 600);	
				});
				$(lastViewEl).removeClass('_animate_rotate_back').addClass('_animate_rotate_front');
				$(view.el).addClass('_animate_rotate_back');
				this.$el.append(lastViewEl).addClass('_animate_container _animate_flip_rotate');
			} else {
				self.$el.find(view.el).attr('_animate_end', true);
			}
		}
	};
	
	/**
	 * Base router
	 * @author kongchangzhu
	 * @extends {Backbone.Router}
	 * @class BaseRouter
	 * @version 0.2 abstract methods:
	 */
	Talent.BaseRouter = Backbone.Router.extend(
		/** @lends BaseRouter.'[prototype]' */
	{
		/**
		 * Load page view class ,initialize and render
		 * @param  {String} pageViewPath page view class file path
		 */
		loadPageView: function() {
			// redirect to page of entryPageId if history fragment is empty
			if(!Backbone.history.getFragment()){
				return Backbone.history.navigate(this.options.entryPageId, true);
			}
			var self = this;
			var fullPageViewPath = this.getPageViewPath();
			var rootPageViewPath = this.getPageViewPath(true);
	
			require([rootPageViewPath], function(RootPageView) {
	
				require([fullPageViewPath], function(PageView) {
					var pageView = new PageView({
							"queryObject": self.getQueryObject(),
							"fragments": self.getFragments()
						});
	
					/**
					 * 如果PageView有相同的Layout，则局部刷新
					 */
	
					pageView.getLayoutView(function(layoutView) {
						if((Talent.app.container.currentView === layoutView) 
							&& layoutView.refresh) {
							
							layoutView.refresh();
						}else{
							Talent.app.container.show(layoutView);
						}
					});
	
				});
			});
		},
		/**
		 * Build page view class file path
		 * @param  {Boolean} isAllInOneFilePath get root page view class path only
		 * @return {String} page view class file path
		 */
		getPageViewPath: function(isAllInOneFilePath) {
			var fragments = this.getFragments();
			var pageViewPath = ['views'];
			if(isAllInOneFilePath){
				pageViewPath = pageViewPath.concat(fragments[0]);
				pageViewPath.push('all-in-one');
			}else{
				pageViewPath = pageViewPath.concat(fragments);
				pageViewPath.push('index-page-view');
			}
			return pageViewPath.join('/');
		},
		/**
		 * Get fragments
		 * This method should be called after history started
		 * @return {Array} fragment array
		 */
		getFragments: function() {
			var fragmentStr = decodeURIComponent(Backbone.history.getFragment() || '');
			var fragments = [];
			var markIndex = fragmentStr.indexOf("?");
	
			// contain query string in fragments
			if(markIndex > -1){
				// remove query string from fragments
				fragmentStr = fragmentStr.slice(0, markIndex);
			}
	
			if(fragmentStr !== ""){
				fragments = fragmentStr.split('/');
			}
	
			return fragments;
		},
		/**
		 * Build query object from fragment
		 * This method should be called after history started
		 * @return {Object} query object
		 */
		getQueryObject: function() {
			// get page location from variable if history fragment is empty
			var fragmentStr = decodeURIComponent(Backbone.history.getFragment() || '');
			var queryObject = {};
			var markIndex = fragmentStr.indexOf("?");
	
			// contain query string in fragments
			if(markIndex > -1){
				// build query object
				var queryString = fragmentStr.slice(markIndex+1);
				var queryArray = queryString.split('&');
				for (var i = 0; i < queryArray.length; i++) {
					var queryPair = queryArray[i].split('=');
					queryObject[queryPair[0]] = decodeURIComponent(queryPair[1]);
				}
			}
	
			return queryObject;
		}
	});
	/**
	 * Root router
	 * @author kongchangzhu
	 * @extends {BaseRouter}
	 * @class RootRouter
	 */
	Talent.IndexRouter = Talent.BaseRouter.extend(
		/** @lends RootRouter.prototype */
	{
		/**
		 * Initialize child routers
		 * @param  {Object} options
		 */
		initialize: function(options) {
			this.options = options || {};
			/**
			 * if the request matches many routers, the last overrides privous ones
			 */
			this.route(/^(.*)$/, "loadPageView");
		}
	});
	
	Talent.BaseMasterLayout = Marionette.Layout.extend({
		template: _.template([
				'<div id="header-region"></div>',
				'<div class="row">',
				'	<div id="sidebar-region"></div>',
				'	<div id="main-region"></div>',
				'</div>',
				'<div id="footer-region"></div>'
			].join('')),
		regions:{
			header: '#header-region',
			footer: '#footer-region',	
			sidebar: '#sidebar-region',
			main: '#main-region'
		},
		refresh: function() {
			var mainView = new this.mainViewClass(this.options);
			this.main.show(mainView);
			if(this.hideSidebar){
				this.SidebarViewClass = null;
				this.sidebar.close();
			}else{
				// IndexPageView can pass new SidebarViewClass to Layout
				var SidebarViewClass = this.sidebarViewClass ?  this.sidebarViewClass : this.regionsClass.sidebar;
				if((this.SidebarViewClass !== SidebarViewClass) || this.refreshSidebar) {
					this.SidebarViewClass = SidebarViewClass;
					this.sidebarView = new this.SidebarViewClass;
					this.sidebar.show(this.sidebarView );
				}
			}
			this.trigger('refresh');
		},
		onShow: function(){
			this.header.show(new this.regionsClass.header);
			this.footer.show(new this.regionsClass.footer);
	
			this.refresh();
		},
		onClose : function() {
			this.sidebarViewClass = null;
			this.SidebarViewClass = null;
		}
	});
	Talent.BaseEmptyLayout = Marionette.Layout.extend({
		template: _.template('<div id="main-region"></div>'),
		regions:{
			main: '#main-region'
		},
		refresh: function() {
			this.main.show(new this.mainViewClass(this.options));
			this.trigger('refresh');
		},
		onShow: function() {
			this.refresh();
		}
	});
	Talent.BasePageView = Marionette.Layout.extend({
		layout: 'master-layout'
		,onLayoutRender: function() {
			
		}
		,getLayoutView: function(callback) {
			if(this.layoutView){
				callback(this.layoutView);
				return;			
			}
	
			var self = this;
			var layoutPath = 'views/common/layouts/' + this.layout;
			
			require([layoutPath], function(layoutView) {
				document.title = self.pageTitle || document.title;
				self.layoutView = layoutView;
				self.layoutView.options = _.extend({
					queryObject:self.options.queryObject
					,fragments:self.options.fragments
				}, self.layoutViewOptions);
				self.listenTo(self.layoutView, 'refresh', self.onLayoutRender, self);
	
				layoutView.mainViewClass = self.mainViewClass;
				layoutView.hideSidebar = self.hideSidebar;
				layoutView.refreshSidebar = self.refreshSidebar;
				layoutView.sidebarViewClass = self.sidebarViewClass;
	
				callback(layoutView);
			})
		}
	});
	// 
	Talent.app =  new Backbone.Marionette.Application();
	// Regular expression used to split event strings.
	var eventSplitter = /\s+/;
	var multiEventSplitter = /\.+/;
	var array = [];
	var slice = array.slice;
	
	// Implement fancy features of the Events API such as multiple event
	// names `"change blur"` and jQuery-style event maps `{change: action}`
	// in terms of the existing API.
	var eventsApi = function(obj, action, name, rest) {
		var flag = true;
		if (!name) return true;
	
		// Handle event maps.
		if (typeof name === 'object') {
		  for (var key in name) {
		    obj[action].apply(obj, [key, name[key]].concat(rest));
		  }
		  return false;
		}
	
		// Handle space separated event names.
		if (eventSplitter.test(name)) {
		  var names = name.split(eventSplitter);
		  for (var i = 0, l = names.length; i < l; i++) {
		    obj[action].apply(obj, [names[i]].concat(rest));
		  }
		  return false;
		}
	
		return true;
	};
	var mutiEventsApi = function(obj,action, name, rest) {
		if (!name) return true;
		if(multiEventSplitter.test(name)) {
			var names = name.split(multiEventSplitter);
			var prefix = names[0];
			var suffix = _.rest(names).join(".");
			obj[action].apply(obj, [prefix].concat(rest).concat([{_suffix : suffix, _mutiEvents : true}]));
			return false;
		}
		return true;
	}
	
	var triggerEvents = function(events, args) {
		var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
		switch (args.length) {
			case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
			case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
			case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
			case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
			default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
		}
	};
	var talentEvents = {
		on: function(name, callback, context, options) {
			if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
			if (!mutiEventsApi(this, 'on', name, [callback, context])) return this;
			this._events || (this._events = {});
			var events = this._events[name] || (this._events[name] = []);
			events.push({callback: callback, context: context, ctx: context || this, options : options});
			return this;
	    },
	    off: function(name, callback, context, options) {
			var retain, ev, events, names, i, l, j, k;
			if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
			if (!mutiEventsApi(this, 'off', name, [callback, context])) return this;
			if (!name && !callback && !context) {
				this._events = {};
				return this;
			}
			names = name ? [name] : _.keys(this._events);
			for (i = 0, l = names.length; i < l; i++) {
				name = names[i];
				if (events = this._events[name]) {
					this._events[name] = retain = [];
					if (callback || context || (options && options._mutiEvents)) {
						for (j = 0, k = events.length; j < k; j++) {
							ev = events[j];
							if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
								(context && context !== ev.context)) {
								retain.push(ev);
							}
							if(!ev.options || (options._mutiEvents && options._suffix != ev.options['_suffix'])) {
								retain.push(ev);
							}
						}
					}
					if (!retain.length) delete this._events[name];
				}
			}
	
			return this;
	    },
	    trigger: function(name) {
	    	var array = [];
			if (!this._events) return this;
			var args = array.slice.call(arguments, 1);
			var last =  _.last(args);
			args = last && last._mutiEvents ? array.slice.call(args, 0, args.length - 1) : args;
			if (!eventsApi(this, 'trigger', name, args)) return this;
			if (!mutiEventsApi(this, 'trigger', name, args)) return this;
			var events = this._events[name];
			if(last && last._mutiEvents) {
				_.each(events, function(item){
					if(item.options && item.options._suffix == last._suffix) {
						array.push(item);
					}
				})
				events = array;
				name = name + '.' + last._suffix;
			}
			var allEvents = this._events.all;
			if (events) triggerEvents(events, args);
			if (allEvents) triggerEvents(allEvents, [name].concat(args));
			return this;
	    }
	}
	Talent.app.vent = Talent._.extend(Talent.app.vent, talentEvents);
	
	Talent.app.reqres.request = function() {
	
		if(arguments[0] === undefined) {
			throw new Error("No request name!")
		}
	
		var config = this._wreqrHandlers[arguments[0]];
		var name = arguments[0].indexOf(":") !== -1 ? arguments[0].split(":") : arguments[0];
		var args = Array.prototype.slice.call(arguments, 1);
		if(args && args.length == 0) {
			Array.prototype.push.call(args, {});
		}
		if( name[1] ) {
			Array.prototype.push.call(args, name[1]);
		}
	
		if(config === undefined) { 
			config = this._wreqrHandlers[name[0] || name];
			if (config === undefined) {
				config = this._wreqrHandlers["*"];
			}
		}		
		return config.callback.apply(config.context, args);
	};
	
	
	
	Talent.app.commands.setHandler('history:navigate', function( href, triggerFlag ){
		Backbone.history.navigate(href, triggerFlag);
	});
	
	Talent.app.commands.setHandler('document:changePageTitle', function(title){
		document.title = title || document.title;
	})
	
	Talent.app.on("initialize:before", function(options){
		var indexRouter = new Talent.IndexRouter(options);
	
		indexRouter.on('route', function(router, route, params){
			Talent.app.vent.trigger('route', indexRouter.getFragments(), params);
		});
	
		Talent.app.reqres.setHandler('history:getQueryObject', function( options ){
			if(options && options.sync) {
				return indexRouter.getQueryObject();
			}
			var def = new $.Deferred;
			def.resolve(indexRouter.getQueryObject());
			return def;
		});
	
		Talent.app.reqres.setHandler('history:getFragments', function( options ){
			if(options && options.sync) {
				return indexRouter.getFragments();
			}
			var def = new $.Deferred;
			def.resolve(indexRouter.getFragments());
			return def;
		});
	
		Talent.app.reqres.setHandler('*', function( options, operation ){
			alert('Default Collection is unavailable now!');		
			// var collection = new AllCollection();			
			// return collection[operation]( options );
		});
	
		Talent.app.addRegions({
			container: options.container
		});
	});
	
	Talent.app.on("initialize:after", function(options){
		if (Backbone.history){
			Backbone.history.start(options);
			delegateLinkClick();
		}
	
		/**
		 * All navigation that is relative should be passed through the navigate
		 * method, to be processed by the router. If the link has a `data-bypass`
		 * attribute, bypass the delegation completely.
		 * @name module:main~delegateLinkClick
		 */
		function delegateLinkClick(){
			// prevent clicking in very short time repeatedly
			var delayClick = _.debounce(function(href, options){
				/**
				 * `Backbone.history.navigate` is sufficient for all Routers and will
				 * trigger the correct events. The Router's internal `navigate` method
				 * calls this anyways.  The fragment is sliced from the root.
				 */
				Backbone.history.navigate(href, options);
			}, 300, true);
			$(document).on('click', 'a:not([data-bypass])', function(e){
					/**
				 * Get the absolute anchor href.
				 */
				var href = $(e.currentTarget).attr('href');
				/**
				 * If the href exists and is a hash route, run it through Backbone.
				 */
				if (href && href.indexOf('#') === 0) {
					/**
					 * Stop the default event to ensure the link will not cause a page refresh.
					 */
					e.preventDefault();
					var isForceChange = true;
					var triggerFlag = true;
					if($(e.currentTarget).attr('data-trigger') === "false"){
						triggerFlag = false;
					}
					delayClick(href, {
						trigger: triggerFlag,
						forceTrigger:true
					});
				}
			});
		}
	});

	Talent.Layout = Marionette.Layout.extend({
		constructor : function() {
			this.model || (this.model = new Backbone.Model);
			Marionette.Layout.prototype.constructor.apply(this,arguments);
		}
	});
	Talent.CompositeView = Marionette.CompositeView.extend({
		constructor : function() {
			this.collection || (this.collection = new Backbone.Collection);
			this.model || (this.model = new Backbone.Model);
			Marionette.CompositeView.prototype.constructor.apply(this,arguments);
		}
	});
	Talent.CollectionView = Marionette.CollectionView.extend({
		constructor : function() {
			this.collection || (this.collection = new Backbone.Collection);
			Marionette.CollectionView.prototype.constructor.apply(this,arguments);
		}
	});
	Talent.ItemView = Marionette.ItemView.extend({
		constructor : function() {
			this.model || (this.model = new Backbone.Model);			
			Marionette.ItemView.prototype.constructor.apply(this,arguments);
		}
	});
	
	Talent.Model = Backbone.Model;
	Talent.Collection = Backbone.Collection;
	Talent.View = Marionette.View;

	Talent.Router = Backbone.Router;
	Talent.Region = Marionette.Region;
	

  return Talent;
})(this, Backbone, _);