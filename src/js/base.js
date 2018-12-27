//全部商品分类显示隐藏
$(".nav_all").on("click", function() {
	$(".nav_all_list").stop().slideToggle(300);
})

//头部导航显示隐藏
$(".header_right").on("click", "ul li", function() {
	$(this).children("ul").stop().slideToggle(300);
})

//回到顶部
$(".sidebar ul li").last().on("click", function() {
	$("html,body").animate({
		scrollTop: 0
	}, "slow");
})

//获取URL里面的参数值
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}

//主页获取账号名
function setNameIndex() {
	//获取账号名
	var name = Cookie.getCookie("username") || [];
	if(typeof name == "string") {
		name = JSON.parse(name);
	}
	//登录时
	if(name != "") {
		$(".header_left").html("");
		var Account = `<label>Hi,${name}</label>
							<a class="quit"> 退出 </a><em>|</em>
							<a title="关注如此生活 官方微信" href=""><img src="images/b_3.png" /></a>
							<a title="关注如此生活 官方微博" href=""><img src="images/b_2.png" /></a>`
		$(".header_left").html(Account);
		$(".si_login").find("span").html(`Hi,${name}`);
		//点击退出，退出登录
		$(".quit").on("click", function() {
			//删除cookie
			Cookie.delCookie("username", "/");
			//刷新页面
			location = location;
		})
	}
}

//获取账号名
function setName() {
	//获取账号名
	var name = Cookie.getCookie("username") || [];
	if(typeof name == "string") {
		name = JSON.parse(name);
	}
	//登录时
	if(name != "") {
		$(".header_left").html("");
		var Account = `<label>Hi,${name}</label>
							<a class="quit"> 退出 </a><em>|</em>
							<a title="关注如此生活 官方微信" href=""><img src="../images/b_3.png" /></a>
							<a title="关注如此生活 官方微博" href=""><img src="../images/b_2.png" /></a>`
		$(".header_left").html(Account);
		$(".si_login").find("span").html(`Hi,${name}`);
		//点击退出，退出登录
		$(".quit").on("click", function() {
			//删除cookie
			Cookie.delCookie("username", "/");
			//刷新页面
			location = location;
		})
	}
}