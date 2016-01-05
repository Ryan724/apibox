define(['talent'], function(Talent) {
	return Talent.Collection.extend({
		getClassData: function() {
			var deferred = new Talent.$.Deferred;
			var urlList = Talent.Context.getGlobal('generalData').Url;
			this.fetch({
				"url": urlList.list
			}).done(function(resp) {
				deferred.resolve(resp);
			});

			return deferred;
		}
	});
});