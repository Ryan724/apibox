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
		},
		getProjects:function(){
			var deferred = new Talent.$.Deferred;
			this.fetch({
				"url": "api/project/queryall"
			}).done(function(resp) {
				deferred.resolve(resp);
			});
			return deferred;
		},
		addProject:function(options){
			var deferred = new Talent.$.Deferred();
            var model = new Talent.Model();
            model.url = "/api/project/add";
            model.save(options).done(function(resp) {
                deferred.resolve(resp);
            });
            return deferred.promise();
		},
		addApi:function(options){
			var deferred = new Talent.$.Deferred();
            var model = new Talent.Model();
            model.url = "/api/interface/add";
            model.save(options).done(function(resp) {
                deferred.resolve(resp);
            });
            return deferred.promise();
		},
		getApi:function(options){
			var deferred = new Talent.$.Deferred();
            var model = new Talent.Model();
            model.url = "/api/interface/get";
            model.fetch(options).done(function(resp) {
                deferred.resolve(resp);
            });
            return deferred.promise();
		},
		getAllData:function(options){
			var deferred = new Talent.$.Deferred();
            var model = new Talent.Model();
            model.url = "/api/project/queryalldata";
            model.fetch(options).done(function(resp) {
                deferred.resolve(resp);
            });
            return deferred.promise();
		}
	});
});