require(["../lib/jquery-3.3.1.js", "../js/common.js"], function() {
	jQuery(function($) {
		function login() {
			if($(".number").val().trim().length == 0) {
				$(".tips").html("请输入账号！")
			} else if($(".pass").val().trim().length == 0) {
				$(".tips").html("请输入密码！")
			} else {
				$.ajax({
					type: 'POST',
					url: "../api/login.php",
					data: {
						name: $(".number").val(),
						pass: $(".pass").val(),
						register: "true"
					},
					success: (res) => {
						if(res == "账号错误"){
							$(".tips").html("账号或密码错误！")
						}else if(res == "正确"){
							//把账号名存进cookie
							Cookie.setCookie("username",JSON.stringify($(".number").val()),"","/");
							alert("登录成功")
							location.href = `../index.html`
						}
					}
				})
			}
		}

		$(".dlbtn").on("click", function() {
			login();
		})
	})
})