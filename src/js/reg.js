require(["../lib/jquery-3.3.1.js", "../js/common.js"], function() {
	jQuery(function($) {
		//随机验证码
		function getMa() {
			var randomMa = "";
			var str = "0123456789qazxswedcvfrtgbnhyujmkloipQAZXSWEDCVFRTGBNHYUJMKIOLP";
			for(var i = 0; i < 4; i++) {
				var ranMa = parseInt(Math.random() * 62);
				randomMa += str[ranMa];
			}
			return randomMa;
		}

		//验证码按钮事件
		$(".hqyzm").on("click", function() {
			$(this).val(getMa())
		})

		$(".zcbtn").on("click", function() {
			register();
		})

		function register() {
			if($("#number").val().trim().length == 0) {
				$(".tag1").css("opacity", 1)
				$(".tips").html("请输入正确的格式！")
			} else if(!/^\d{11}$/.test($("#number").val())) {
				$(".tag1").css("opacity", 1)
				$(".tips").html("请输入正确的格式！")
			} else {
				$.ajax({
					type: 'POST',
					url: "../api/reg.php",
					data: {
						name: $("#number").val()
					},
					success: (res) => {
						if(res == "可用") {
							$(".tag1").html('<img src="../images/right_tag (1).png"/>').css("opacity", 1);
							$(".tips").html("")
							//验证密码
							if($("#pass1").val().length == 0) {
								$(".tag4").css("opacity", 1).html('<img src="../images/error_tag.png"/>')
								$(".tips").html("密码不能为空！")
							} else if($("#pass1").val().length < 5) {
								$(".tag4").css("opacity", 1).html('<img src="../images/error_tag.png"/>')
								$(".tips").html("密码不能少于6位！")
							} else if($("#pass2").val().length == 0) {
								$(".tag4").css("opacity", 1).html('<img src="../images/right_tag (1).png"/>')
								$(".tag5").css("opacity", 1).html('<img src="../images/error_tag.png"/>')
								$(".tips").html("再次输入密码不能为空！")
							} else if($("#pass2").val() != $("#pass1").val()) {
								$(".tag5").css("opacity", 1).html('<img src="../images/error_tag.png"/>')
								$(".tips").html("两次密码输入不一致！")
							} else if($(".yzm").val().length == 0) {
								//验证验证码
								$(".tag4").css("opacity", 1).html('<img src="../images/right_tag (1).png"/>')
								$(".tag5").css("opacity", 1).html('<img src="../images/right_tag (1).png"/>')
								$(".tips").html("请输入验证码！")
								$(".hqyzm").val(getMa())
							} else if($(".yzm").val().toLowerCase() != $(".hqyzm").val().toLowerCase()) {
								$(".tips").html("验证码错误！")
								$(".hqyzm").val(getMa())
							} else if(!$(".yhxy").prop("checked")) {
								//勾选协议
								$(".tips").html("请勾选用户协议！")
							} else {
								//满足条件请求数据创建账号	
								$.ajax({
									type: 'POST',
									url: "../api/reg.php",
									data: {
										name: $("#number").val(),
										pass: $("#pass1").val(),
										register: "true"
									},
									success: (res) => {
										$(".tips").html("")
										alert("注册成功，跳转登录页面")
										location.href = "../html/login.html"
									}
								})
							}
						} else {
							$(".tag1").css("opacity", 1).html('<img src="../images/error_tag.png"/>')
							$(".tips").html("该账号已存在！")
						}
					}
				})
			}
		}
		//手机号鼠标移出事件
		$("#number").on("blur", function() {
			if($("#number").val().trim().length == 0) {
				$(".tag1").css("opacity", 1)
				$(".tips").html("请输入正确的格式！")
			} else if(!/^\d{11}$/.test($("#number").val())) {
				$(".tag1").css("opacity", 1)
				$(".tips").html("请输入正确的格式！")
			} else {
				$.ajax({
					type: 'POST',
					url: "../api/reg.php",
					data: {
						name: $("#number").val()
					},
					success: (res) => {
						if(res == "可用") {
							$(".tag1").html('<img src="../images/right_tag (1).png"/>').css("opacity", 1);
							$(".tips").html("")
						} else {
							$(".tag1").css("opacity", 1).html('<img src="../images/error_tag.png"/>')
							$(".tips").html("该账号已存在！")
						}
					}
				})
			}
		})
		//密码鼠标移出事件
		$("#pass1").on("blur", function() {
			if($("#pass1").val().length == 0) {
				$(".tag4").css("opacity", 1).html('<img src="../images/error_tag.png"/>')
				$(".tips").html("密码不能为空！")
			} else if($("#pass1").val().length < 5) {
				$(".tag4").css("opacity", 1).html('<img src="../images/error_tag.png"/>')
				$(".tips").html("密码不能少于6位！")
			} else {
				$(".tips").html("")
				$(".tag4").css("opacity", 1).html('<img src="../images/right_tag (1).png"/>')
			}
		})
		
		//再次输入密码鼠标移出事件
		$("#pass2").on("blur", function() {
			if($("#pass2").val().length == 0) {
				$(".tag5").css("opacity", 1).html('<img src="../images/error_tag.png"/>')
				$(".tips").html("再次输入密码不能为空！")
			} else if($("#pass2").val() != $("#pass1").val()) {
				$(".tag5").css("opacity", 1).html('<img src="../images/error_tag.png"/>')
				$(".tips").html("两次密码输入不一致！")
			}else{
				$(".tips").html("")
				$(".tag5").css("opacity", 1).html('<img src="../images/right_tag (1).png"/>')
			}
		})
	})
})