//全部商品分类显示隐藏
$(".nav_all").on("click",function(){
	$(".nav_all_list").stop().slideToggle(300);
})

//头部导航显示隐藏
$(".header_right").on("click","ul li",function(){
	$(this).children("ul").stop().slideToggle(300);
})
		
//回到顶部
$(".sidebar ul li").last().on("click",function(){
	$("html,body").animate({scrollTop: 0},"slow");
})
