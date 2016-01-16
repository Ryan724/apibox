define(['talent',
		'templates/apibox'
	],
	function(Talent,
		jst) {
		return Talent.ItemView.extend({
			template: jst['apibox/content'],
			initialize: function() {
			},
			onShow:function(){}
		});

	});