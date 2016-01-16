define(['talent',
		'templates/apibox'
	],
	function(Talent,
		jst) {
		return Talent.ItemView.extend({
			template: jst['apibox/content'],
			initialize: function() {
				var self = this;
				this.count = 0;
				this.listenTo(this.model,"change:count",function(){
					this.render();
				});
			},
			
			onShow:function(){}
		});

	});