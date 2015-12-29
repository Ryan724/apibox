/**
 * jQuery.jSelectDate Version 0.1
 * jQuery 下拉列表选择日期插件
 *
 * Wathon Team
 * http://www.wathon.com
 * http://huacn.cnblogs.com
 * http://www.cnblogs.com/huacn/archive/2008/01/16/jquery_plugin_jSelectDate.html
 */

/*
 * *****************   Example   ***********************

 <script type="text/javascript">
 	 $("body").ready(function(){
		 $("input.date").jSelectDate({
			 css:"date",
			 yearBeign: 1995,
			 disabled : true
		 });
	 })
 </script>	 
 
 
 <body>
	 <input type="text" id="txtName" class="date" value="2005-3-22" />
	 <input type="text" id="txtDate2" class="date" value="1995-5-2" />
 </body>
 
 * ****************  End Example  **********************
 */
var jSelectDate = {

    yearClass: "jselectDate_year",
    
    /**
 * 开始年
 */
    yearBegin: 1960,
    
    /**
 * 终止年
 */
    yearEnd: 2005,
    
    /**
 * 初始化对向
 * @param {Object} el 用于存放日期结果的文本框 jQuery DOM
 */
    init: function(els, isDisabled){
    
        els.each(function(){
        
        
            var el = $(this);
            
            //取得旧的日期
            var elValue = el.val();
            elDate = new Date(elValue.split("-").join("/"));
            
            var nYear = elDate.getFullYear();
            var nMonth = jSelectDate.returnMonth(elDate.getMonth());
            var nDay = elDate.getDate();
            
            
            //隐藏给出的对向
            el.hide();
            
            //先算出当前共有多少个jSelectDate
            var currentIdx = $(jSelectDate.yearClass).length + 1;
            
            /**
         * 创建年select
         */
            var selYear = document.createElement("select");
            selYear.id = "selYear" + currentIdx
            selYear.className = jSelectDate.yearClass;
            selYear.disabled = isDisabled;
            
            //加入选项
            for (var i = jSelectDate.yearEnd; i >= jSelectDate.yearBegin; i--) {
            
                var option = document.createElement("option");
                option.value = i;
                option.innerHTML = i;
                
                //判断是否有旧的值，如果有就选中
                if (!isNaN(nYear)) {
                    if (i == nYear) {
                        option.selected = true;
                    }
                }
                
                selYear.appendChild(option);
                option = null;
                
            }
            
            //加入控件到文本框的位置
            el.after(selYear);
            
            /**
         * 创建月
         */
            var selMonth = document.createElement("select");
            selMonth.id = "selMonth" + currentIdx
            selMonth.disabled = isDisabled;
            //加入选项
            for (var i = 1; i <= 12; i++) {
                var option = document.createElement("option");
                option.value = i;
                option.innerHTML = i;
                
                //判断是否有旧的值，如果有就选中
                if (!isNaN(nMonth)) {
                    if (i == nMonth) {
                        option.selected = true;
                    }
                }
                
                selMonth.appendChild(option);
                option = null;
            }
            
            $(selYear).after(selMonth);
            $(selMonth).before(" ");
            
            /**
         * 创建日
         */
            var selDay = document.createElement("select");
            selDay.id = "selDay" + currentIdx
            selDay.disabled = isDisabled;
            //加入选项
            for (var i = 1; i <= 31; i++) {
            
                var option = document.createElement("option");
                option.value = i;
                option.innerHTML = i;
                
                //判断是否有旧的值，如果有就选中
                if (!isNaN(nDay)) {
                    if (i == nDay) {
                        option.selected = true;
                    }
                }
                
                selDay.appendChild(option);
                option = null;
            }
            
            $(selMonth).after(selDay);
            $(selDay).before(" ");
            
            var getDate = function(){
                var year = $(selYear).val();
                var month = $(selMonth).val();
                var day = $(selDay).val();
                el.val(year + "-" + month + "-" + day);
            }
            /**
         * 给几个下拉列表加入更改后的事件
         */
            $(selDay).change(function(){
                return getDate();
            });
            $(selMonth).change(function(){
                return getDate();
            });
            $(selYear).change(function(){
                return getDate();
            });
            
        })
        
        
    },
    
    returnMonth: function(num){
        var arr = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12");
        return arr[num];
    }
    
}

jQuery.fn.jSelectDate = function(s){

    var getNowYear = function(){
        //得到现在的年
        var date = new Date();
        return date.getFullYear();
    }
    
    defaults = {
        css: "",
        disabled: false,
        yearBegin: 1960,
        yearEnd: getNowYear()
    }
    
    
    $.extend(defaults, s);
    
    jSelectDate.yearBegin = defaults.yearBeign;
    jSelectDate.yearEnd = defaults.yearEnd;
    jSelectDate.init($(this), defaults.disabled);
	
	return $(this);
    
}
