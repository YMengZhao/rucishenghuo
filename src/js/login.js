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
						if(res == "账号错误") {
							$(".tips").html("账号或密码错误！")
						} else if(res == "正确") {
							//把账号名存进cookie							
							if($(":checkbox").prop("checked") == false) {
								Cookie.setCookie("username", JSON.stringify($(".number").val()), "", "/");
								alert("登录成功")
								location.href = `../index.html`
							} else {
								var d = new Date();
                				d.setDate(d.getDate()+30);
								Cookie.setCookie("username", JSON.stringify($(".number").val()),d,"/");
								alert("登录成功")
								location.href = `../index.html`
							}
						}
					}
				})
			}
		}

		$(".dlbtn").on("click", function() {
			login();
		})

		//当进入页面，判断cookie存在用户名，直接跳转
		var cookie = document.cookie.split("; ");
		cookie.forEach(function(item){
            var arr = item.split("=");
            if(arr[0] == "username"){
                location.href = `../index.html`
            }
        })
	})
})