require(["../lib/jquery-3.3.1.js","../js/common.js"],function(){
	jQuery(function($){
		//随机验证码
		function getMa(){
			var randomMa = "";
	        var str = "0123456789qazxswedcvfrtgbnhyujmkloipQAZXSWEDCVFRTGBNHYUJMKIOLP";
	        for(var i = 0;i < 4;i++){
	        	var ranMa = parseInt(Math.random()*62);
	        	randomMa += str[ranMa];
	        }
	        return randomMa;
	   }

		function register(){
			$("#number").on("blur",function(){
				if($("#number").val().trim().length == 0 && !/^\d{11}$/.test($("#number").val())){
					$(".tag1").css("opacity",1)
				}else(
					$(".tag1").html('<img src="../images/right_tag (1).png"/>').css("opacity",1)
				)
			})
		}
		$(".hqyzm").on("click",function(){
			$(this).val(getMa())
		})
		
		register();
	})
})