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
			template: jst['home/seachhouse/detail-page'],
			ui: {},
			events: function() {
				var events = {};
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
			pageChange:function(index,type){
				this.trigger("detail:page",index,type);
			},
			onClose: function() {}
		});

		return MenuView;
	});