define([
		'talent',
		'templates/home',
		'paginator'
	],
	function(
		Talent,
		jst
	) {
		var MenuView = Talent.ItemView.extend({
			template: jst['home/seachhouse/hot-page'],
			ui: {},
			events: function() {
				var events = {};
				events["click .h-s"] =this.showDetailView;
				return events;
			},
			initialize: function() {},
			onShow: function() {
				var self = this;
				$.jqPaginator('#pagination', {
					totalPages: self.model.get("totalPages"),
					visiblePages: 10,
					currentPage: 1,
					onPageChange: function(index, type) {self.pageChange(index,type) }
				});
			},
			showDetailView:function(e){
				var node = $(e.currentTarget);
				this.trigger("show:houseListDetail");
			},
			pageChange:function(index,type){
				this.trigger("hot:page",index,type);
			},
			onClose: function() {}
		});

		return MenuView;
	});