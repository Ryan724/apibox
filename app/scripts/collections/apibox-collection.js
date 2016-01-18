define(['talent'], function(Talent) {
	return Talent.Collection.extend({
		getProjects: function() {
			var deferred = new Talent.$.Deferred;
			this.fetch({
				"url": "api/project/queryall"
			}).done(function(resp) {
				deferred.resolve(resp);
			});
			return deferred;
		},
		addProject: function(options) {
			var deferred = new Talent.$.Deferred();
			var model = new Talent.Model();
			model.url = "/api/project/add";
			model.save(options).done(function(resp) {
				deferred.resolve(resp);
			});
			return deferred.promise();
		},
		addApi: function(options) {
			var deferred = new Talent.$.Deferred();
			var model = new Talent.Model();
			model.url = "/api/interface/add";
			model.save(options).done(function(resp) {
				deferred.resolve(resp);
			});
			return deferred.promise();
		},
		getApi: function(options) {
			var deferred = new Talent.$.Deferred();
			var model = new Talent.Model();
			model.url = "/api/interface/query";
			model.save(options).done(function(resp) {
				deferred.resolve(resp);
			});
			return deferred.promise();
		},
		getRealServerData: function(options) {
			var deferred = new Talent.$.Deferred();
			var model = new Talent.Model(options);
			model.url = "/api/mock/getserverdate";
			model.save().done(function(resp) {
				deferred.resolve(resp);
			});
			return deferred.promise();
		},
		getAllData: function(options) {
			var deferred = new Talent.$.Deferred();
			var model = new Talent.Model();
			model.url = "/api/project/queryalldata";
			model.fetch(options).done(function(resp) {
				deferred.resolve(resp);
			});
			return deferred.promise();
		}
		,updateData:function(options){
			var deferred = new Talent.$.Deferred();
            var model = new Talent.Model();
            model.url = "/api/interface/update";
            model.save(options).done(function(resp) {
                deferred.resolve(resp);
            });
            return deferred.promise();
		}
		,getMockUrl:function(options){
			var deferred = new Talent.$.Deferred();
            var model = new Talent.Model();
            model.url = "/api/interface/getmockurl";
            model.save(options).done(function(resp) {
                deferred.resolve(resp);
            });
            return deferred.promise();
		}
	});
});