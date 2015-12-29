define([
		'talent',
		'templates/home',
		'jselectdate'
	],
	function(
		Talent,
		jst,
		jSelectDate
	){
		var ComplaintManagementView = Talent.ItemView.extend({
			template: jst['home/tenantcentre/complaint-management-page'],
			ui: {},
			events: function() {
				var events = {};
				return events;
			},
			initialize: function() {},
			onShow: function() {
				$("input.time-before").jSelectDate({
					css:"date",
					yearBeign: 1995,
					disabled : false
				});
				$("input.time-after").jSelectDate({
					css:"date",
					yearBeign: 1995,
					disabled : false
				});
			},
		    Close: function() {}
		});

		return ComplaintManagementView;
	});