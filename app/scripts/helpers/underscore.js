/**
 * Add new methods to underscore
 * @author kongchangzhu
 * @namespace _
 */
define(['$', '_', 'helpers/context'],
	function($, _, Context) {
		var timeStorage = {};

		// 记录首屏时间
		$(document).on('splash', function(event, page) {
			if (!page) {
				page = location.hash.slice(1);
			}
			var start = BSGlobal.start;
			if (BSGlobal.splashStart) {
				start = BSGlobal.splashStart;
			}
			var diff = new Date() - start;
			_.up('[splash] ' + page, diff);
		});

		_.splash = function(page) {
			$(document).trigger('splash', page);
		}


		_.alert = function(message) {
			alert(message);
		}
		_.error = function(message) {
			throw new Error(message);
		}
		_.dd = function(message) {
			if (window.console && console.log) {
				console.log(message);
			}
		}
		_.time = function(name) {
			timeStorage[name] = new Date;
		}
		_.timeEnd = function(name) {
			var time = new Date() - (timeStorage[name] || 0);
			delete timeStorage[name];
			_.up(name, time);
		}
		_.up = function(label, time, step) {
				// stop calling api in elink page
				if (location.href.indexOf('/Elink/') > -1) return;

				var uid = Context.getGlobal("generalData").UserId || Context.getUserInfo().id;
				var tid = Context.getGlobal("generalData").TenantId || Context.getTenantInfo().id;
				var appName = "recruit.tms.beisen.com";
				var sid = 0;

				if (step === undefined) {
					type = 1;
					step = 0;
					sid = uid + "-" + Math.round(Math.random() * 1000);
				} else {
					type = 2;
				}
				var url = "http://opsapi.tita.com/opsapi/AddLog";
				var params = "?appName=" + appName + "&label=" + encodeURIComponent(label) + "&uid=" + uid + "&tid=" + tid + "&time=" + time + "&type=" + type + "&sid=" + sid + "&step=" + step;
				var img = new Image;
				img.src = url + params;

				// user analysis in nginx
				var img2 = new Image;
				// img2.src = "http://ua.beisen.co/_.gif" + params;
			}
			/**
			 * Log executation path
			 * @methodOf _
			 * @param  {String} message
			 * @param  {String} functionName
			 */
		_.log = function(message, functionName) {
			clearTimeout(_.log.timer);

			var lastDate = _.log.lastDate || new Date();
			var date = new Date();
			if (window.console) {
				functionName = functionName || "null";
				var dateString = date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();
				var diff = ((date - lastDate) / 10000).toString().slice(2) || '0000';
				console.log('[%s] %s:%s', diff, functionName, message);
			}
			_.log.lastDate = date;

			// start new session if no activity in 3s
			_.log.timer = setTimeout(function() {
				delete _.log.lastDate;
			}, 3000);
		}

		//把字符串作为 URI 进行编码
		//@param String str 要转换的字符串
		//@return String 转换后字符
		_.encodeURI = function(str) {
			return encodeURI(str);
		}

		/**
		 * Format Date
		 * exp. _.formatDate('/Date(1362366169963+0800)/')
		 * @methodOf _
		 * @param  {String} data
		 * @return {String} functionName
		 */
		_.formatDate = function(data, format) {
				data = data || "";
				if (typeof data != 'string' || data.constructor != String) return;
				// 只格式化这种形式： "/Date(-2209017600000+0800)/"
				if (data.indexOf('/Date') != 0) return data;
				format = format || "YYYY-MM-DD";
				return moment(data.replace("/\\/ig", "")).format(format);
			}
			/*
			 *Format JSON
			 */
		_.formatJson = function(json, options) {
			var reg = null,
				formatted = '',
				pad = 0,
				PADDING = '    '; // one can also use '\t' or a different number of spaces

			// optional settings
			options = options || {};
			// remove newline where '{' or '[' follows ':'
			options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
			// use a space after a colon
			options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;

			// begin formatting...
			if (typeof json !== 'string') {
				// make sure we start with the JSON as a string
				json = JSON.stringify(json);
			} else {
				// is already a string, so parse and re-stringify in order to remove extra whitespace
				json = JSON.parse(json);
				json = JSON.stringify(json);
			}

			// add newline before and after curly braces
			reg = /([\{\}])/g;
			json = json.replace(reg, '\r\n$1\r\n');

			// add newline before and after square brackets
			reg = /([\[\]])/g;
			json = json.replace(reg, '\r\n$1\r\n');

			// add newline after comma
			reg = /(\,)/g;
			json = json.replace(reg, '$1\r\n');

			// remove multiple newlines
			reg = /(\r\n\r\n)/g;
			json = json.replace(reg, '\r\n');

			// remove newlines before commas
			reg = /\r\n\,/g;
			json = json.replace(reg, ',');

			// optional formatting...
			if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
				reg = /\:\r\n\{/g;
				json = json.replace(reg, ':{');
				reg = /\:\r\n\[/g;
				json = json.replace(reg, ':[');
			}
			if (options.spaceAfterColon) {
				reg = /\:/g;
				json = json.replace(reg, ': ');
			}

			$.each(json.split('\r\n'), function(index, node) {
				var i = 0,
					indent = 0,
					padding = '';

				if (node.match(/\{$/) || node.match(/\[$/)) {
					indent = 1;
				} else if (node.match(/\}/) || node.match(/\]/)) {
					if (pad !== 0) {
						pad -= 1;
					}
				} else {
					indent = 0;
				}

				for (i = 0; i < pad; i++) {
					padding += PADDING;
				}

				formatted += padding + node + '\r\n';
				pad += indent;
			});

			return formatted;
		};
		//截取字符串方法
		//@param String str 要截取的字符串
		//@param Int length 截取长度
		//@return String 截取以后补充的字符
		_.substring = function(str, len, hasDot) {
			var newLength = 0;
			var newStr = "";
			var chineseRegex = /[^\x00-\xff]/g;
			var singleChar = "";
			var strLength = str.replace(chineseRegex, "**").length;
			for (var i = 0; i < strLength; i++) {
				singleChar = str.charAt(i).toString();
				if (singleChar.match(chineseRegex) != null) {
					newLength += 2;
				} else {
					newLength++;
				}
				if (newLength > len) {
					break;
				}
				newStr += singleChar;
			}

			if (hasDot && strLength > len) {
				newStr += "...";
			}
			return newStr;
		};


		/*
		 //验证多个邮件地址字符串中的地址是否都正确
		 @str 邮件地址的字符串
		 @sep 分隔字符
		 @nullable 是否可以存在空地址
		 */
		_.validSepMail = function(str, sep, nullable) {
				var v = true;
				var emArray = _.getSepMail(str, sep);
				if (emArray.length == 0 && nullable) return v;

				_.each(emArray, function(em) {
					if (!_.validMail(em)) {
						v = false;
					}
				});
				return v;
			}
			/*
			 //验证单个邮件地址的格式是否正确;
			 @str 邮件地址字符串
			 */
		_.validMail = function(str) {
			var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
			return reg.test(str);
		}

		/*
		 //根据传入的邮件地址的字符串返回单邮件地址的数组
		 @str 邮件地址的字符串
		 @sep 字符串中使用的分隔符
		 */
		_.getSepMail = function(str, sep) {
				var emailStr = $.trim(str);
				if (emailStr == "") return [];
				var tmpArray = str.split(sep);
				var rArray = [];
				_.each(tmpArray, function(em) {
					var tmp = $.trim(em);
					if (tmp != "") rArray.push(tmp);
				});
				return rArray;
			}
			//因为这个数据有可能会在多个页面之间使用, 所以放在这里当成全局的配置
		_.getPagingResumeLsId = function() {
			return "view_paging_resume_ls"
		}
		_.getLSPids = function(tmpId) {
			var tmpData = _.getStoreWithExp(_.getPagingResumeLsId());
			var idx = Talent._.indexOf(tmpData.tmpIds, parseInt(tmpId));
			return tmpData.applyIds[idx];
		}

		//not ready for use
		_.showCompatibleIframe = function(el, ctt) {
				var ifr = document.createElement("iframe");
				el.appendChild(ifr);
				// debugger;
				try {
					ifr.contentWindow.document;
				} catch (e) {
					ifr.src = "javascript:void((function(){document.open();document.domain='" + document.domain + "';document.close();})())";
				}
				window.setTimeout(function() {
					ifr.contentWindow.document.body.innerHTML = ctt;
				}, 10);
			}
			//$.when
		_.getDataSync = function(model, url, datas, type) {
				var m = model || new Talent.Model();
				var d = $.Deferred();
				m.url = url;
				m[type](datas).done(d.resolve);
				return d.promise();
			}
			//获取本地数据
			//@name 名称
		_.getStore = function(name) {
			return Store.get(name);
		}

		//获取本地数据
		//@name 名称
		_.getStoreWithExp = function(name) {
				return Store.withExp.get(name);
			}
			//遍历本地所有数据
		_.getStoreForEach = function(callback) {
			Store.forEach(function(key, val) {
				callback(key, val);
			})
		}

		_.getStoreAll = function() {
				var store = Store.getAll();
				return store;
			}
			//设置一个带有效期本地数据
			//@name 名称
			//@data 数据
			//@exp 有效期，单位：毫秒
		_.setStoreWithExp = function(name, data, exp) {
				return Store.withExp.set(name, data, exp);
			}
			//设置一个本地数据
		_.setStore = function(key, value) {
			Store.set(key, value);
		}

		//是否支持本地存储
		_.checkStore = function() {
				return Store.enabled;
			}
			//设置上下文数据到本地存储
		_.setContextData = function(name) {
				Store.set(name, Context.getGlobal(name));
			}
			//删除本地存储数据
		_.removeStore = function(name) {
				Store.remove(name);
			}
			//清除本地存储所有数据
		_.clearStore = function() {
				Store.clear();
			}
			//获取上下文数据到本地存储
		_.getContextData = _.getStoreData = function(key) {
			return Store.get(key);
		}

		_.preventMouseWheel = function(node) {
			node = $(node);
			var height = node.height(),
				scrollHeight = node.get(0).scrollHeight;
			node.off('mousewheel.preventMouseWheel');
			node.on('mousewheel.preventMouseWheel', function(e, d) {
				var distance = scrollHeight - height;
				if (node.css('overflow-x') === 'scroll') {
					distance += 17;
				}
				if (distance - this.scrollTop <= 28 && d < 0) {
					this.scrollTop = distance;
					if (this.scrollTop < distance) {
						distance = this.scrollTop;
					}
				}
				if (this.scrollTop <= 28 && d > 0) {
					this.scrollTop = 0;
				}
				if (((distance - this.scrollTop) === 0 && d < 0) || (this.scrollTop === 0 && d > 0)) {
					e.preventDefault();
				}
			});
		}
		_.accsub = function(arg1, arg2) {
				var r1, r2, m, n;
				try {
					r1 = arg1.toString().split(".")[1].length;
				} catch (e) {
					r1 = 0;
				}
				try {
					r2 = arg2.toString().split(".")[1].length;
				} catch (e) {
					r2 = 0;
				}
				m = Math.pow(10, Math.max(r1, r2)); //动态控制精度长度
				n = (r1 >= r2) ? r1 : r2;
				return ((arg1 * m - arg2 * m) / m).toFixed(n);
			}
			/**
			 * 将所有基本类型转换成“__string__”这种形式，返回对象
			 * @param  {[type]} obj [description]
			 * @return {[type]}     [description]
			 */
		_.val2TypeOnObject = function(obj) {
			//获取传入对象基本类型
			var basket = {};
			var baseType = _.isArray(obj) ? 2 : _.isObject(obj) ? 1 : _.isString(obj) ? 0 : _.isBoolean(obj) ? 4 : _.isNumber(obj) ? 3 : 5;
			var baseObj = baseType == 2 ? [] : baseType == 1 ? {} : obj;
			var baseId = (new Date()).valueOf() + Math.round(Math.random() * 1000);
			var typeArr = ["String", "Object", "Array", "Number", "Boolean", "Date"];
			var eachProp = function(obj, pid, ptype) {
				_.forIn(obj, function(value, key) {
					var id = (new Date()).valueOf() + Math.round(Math.random() * 1000);
					var type = _.isArray(value) ? 2 : _.isObject(value) ? 1 : _.isString(value) ? 0 : _.isBoolean(value) ? 4 :_.isNumber(value) ? 3 : 5
					basket[id] = _.isArray(value) ? [] : _.isObject(value) ? {} : "__" + typeArr[type] + "__";
					if (ptype != 2) {
						if (!key) return;
						basket[pid][key] = basket[id];
					} else {
						basket[pid].push(basket[id])
					}
					if (type == 1 || type == 2) eachProp(value, id, type);
				});
			};
			if (baseType != 1 && baseType != 2) return obj;
			basket[baseId] = baseObj;
			eachProp(obj, baseId, baseType);
			return baseObj;
		};
		_.simplePlainObject=function(plainObject){
			var eachProp = function(obj) {
				obj = _.isArray(obj)? uniqColl(obj):obj;
				if(_.isArray(obj)){
					_.forIn(obj, function(value, key) {
						value = _.isArray(value)? uniqColl(value):value;
						if(_.isObject(value)||_.isArray(value)) eachProp(value);
					});	
				}
				
			};
			var uniqColl = function(coll){
				var arr = [];
				_.each(coll,function(item){
					arr.push(JSON.stringify(item));
				});
				arr = _.uniq(arr);
				return [JSON.parse(arr[0])];
			};
			eachProp(plainObject);
			console.log(plainObject)
		};
		return _;

	});