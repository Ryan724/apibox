/**
 * Context Object, pass global variable to all classes
 */
define(['talent'], function(Talent) {

	// all ajax apis have same domain except jsonp call
	var apiServer = BSGlobal.apiPath;

	var localContext = {
		/**
		 * 获取租户信息
		 * @return
		 * {"Id":200605,"Name":"wg","Domain":"abc.com","Abbreviation":"wg"}
		 */
		getTenantInfo: function() {
			return BSGlobal.tenantInfo;
		},
		/**
		 * 获取当前登录用户信息
		 * @return
		 * {"Email":"wg1@abc.com","Avatar":"http://st.tita.com/titacn/tita/common/images/default_man_small.jpg","Id":100217545,"Name":"wg","IsRoot":false,"Role":3}
		 */
		getUserInfo: function() {
			return BSGlobal.loginUserInfo;
		},
		/**
		 * 获取图片的完整路径
		 * @return
		 * http://static.beisen.co/recruit/release/app/images/bg.png
		 */
		getStaticUrl: function(url) {
			var staticServer = BSGlobal.staticPath;
			return staticServer + "/" + url;
		},
		/**
		 * 获取后台接口的完整路径
		 * @return
		 * http://recruit.tms.beisen.com/Rercruting/Jobs
		 */
		getApiUrl: function(url){
			var uid = this.getUserInfo().Id;
			var tid = this.getTenantInfo().Id;
			return apiServer + "/api/v1/"+tid+"/"+uid+"/" + url;
		},
		/**
		 * 获取后台接口的域名部分
		 * @return
		 * http://webapi.tita.com
		 */
		getApiHost: function(){
			return apiServer;
		},
		/**
		 * 获取后台JSONP接口的完整路径
		 * @return
		 * http://recruit.tms.beisen.com/Rercruting/Jobs
		 */
		getWebUrl: function(url){
			var http = "http://www.";
			if(BSGlobal.env == 'Testing'){
				http = "http://qa.";
			}
			return http + BSGlobal.webPath+"/" + url;
		},
		/**
		 * 获取登录URL
		 * @return
		 * http://tms.beisen.com/
		 */
		getLoginUrl: function() {
			var url = this.getWebUrl("Account/LogIn");
			return url + "?ReturnUrl=" + encodeURIComponent(location.href);
		}
		,getLoading: function(){
			var url = this.getStaticUrl('images/load_m.gif');
			var html = [
			'<div class="_tt_loading_m">',
			'  加载中...',
			'</div>'].join("");
			return html;
		}
	};

	Talent.Context = Talent._.extend({}, localContext);

	return Talent.Context;
});