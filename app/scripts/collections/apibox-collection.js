define(['talent'], function(Talent) {
	return Talent.Collection.extend({
		getClassData: function() {
			var deferred = new Talent.$.Deferred;
			this.fetch({
				"url": "api/wahahah"
			}).done(function(resp) {
				deferred.resolve(resp);
			});
			return deferred;
		}
	});
});