//模块化依赖
require.config({
	shim: {
		"../js/base.js": {
			deps: ["../lib/jquery-3.3.1.js"]
		}
	}
})

require(["../lib/jquery-3.3.1.js", "../js/common.js", "../js/base.js"], function() {
	jQuery(function($) {

		//获取id值
		var id = getUrlParam('id');
		$.ajax({
			type: 'GET',
			url: "../api/goods.php",
			data: {
				id: id
			},
			success: (res) => {
				var res = JSON.parse(res)[0];
				goodRendering(res);
				var $num;
				getNumber();
				addToCart(res);
				fandajing(res);
			}
		})
		//页面渲染
		function goodRendering(res) {
			$(".details_left_tu").find("img").attr("src", `${res.imgurl}`);
			$(".bannerul_img").find("img").attr("src", `${res.imgurl}`);
			$(".details_center").find("h4").html(`${res.goodsname}`);
			$(".price").children("span").eq(1).html(`${res.oPrice}.00`);
			$(".price").find("del").html(`¥${res.deloprice}.00`);
			$(".details_center_bottom").find("img").attr("src", `${res.imgurl}`);
		}
		//商品数量加减
		function getNumber() {
			$num = $("#getnumber").find("input").val();
			$("#getnumber").on("click", "span", function() {
				if($(this).html() == "-") {
					if($num > 1) {
						$num--;
						$("#getnumber").find("input").val($num);
					} else if($num <= 1) {
						$("#getnumber").find("input").val(1);
					}

				} else if($(this).html() == "+") {
					$num++;
					$("#getnumber").find("input").val($num);
				}
			})
		}
		//获取商品cookie
		var goodsCarList = Cookie.getCookie("goodsCarList") || [];
		if(typeof goodsCarList == "string") {
			goodsCarList = JSON.parse(goodsCarList);
		}
		//加入购物车存入cookies
		function addToCart(res) {
			
			$(".addCart").on("click", function() {
				//得到数量
				$num = parseInt($num);
				//判断是否存在该商品，存在则加数量，不存在则加商品
				var i;
				var goodsres = goodsCarList.some(function(item, idx) {
					i = idx;
					return item.id == res.id;
				});
				if(goodsres) {
					goodsCarList[i].num += $num;
				} else {
					res.num = $num;
					goodsCarList.push(res);
				}
				//把商品存入cookies
				Cookie.setCookie("goodsCarList", JSON.stringify(goodsCarList), "", "/");
				//获取商品总数
				var $allnum = 0;
				goodsCarList.map(function(item){
					$allnum += item.num;
				})
				//渲染侧边购物车
				$(".carAllNum").html($allnum);
				//飞入购物车
				//加入购物车按钮距离页面头部和右边的距离
				var top = $(".addCart").offset().top - $(window).scrollTop();
				var right = $(window).width() - $(".addCart").offset().left - $(window).scrollLeft() - 40;
				$("<img/>").appendTo($(".details_center_bottom_button")).addClass("cloneImg").css("top",top).css("right",right).prop("src",`${res.imgurl}`).animate({top:20,right:300},500,function(){
					$(this).animate({top:100,right:0,width:40,height:40},500,function(){
						$(this).remove();
					})
				})
			})
		}
		//获取账号名
		setName();
		
		//放大镜
		function fandajing(res){
			var $ampBox = $(".details_left_tu");
			var $img = $(".details_left_tu").find("img");
			var $touch = $(".touch");
			$ampBox.on("mouseover",function(){
				$(".bigimg").css("display","block");
				$touch.css("display","block");
			}).on("mouseout",function(){
	            $(".bigimg").css("display","none");
				$touch.css("display","none");
	       }).on("mousemove",function(e){
	        	var scale=3;
		        $touch.css({width:$ampBox.outerWidth()/scale,height:$ampBox.outerHeight()/scale});
		        $(".bigimg").find("img").prop("src",res.imgurl).css({width:$ampBox.outerWidth()*scale});
		        var $ox=e.pageX-$img.offset().left-$touch.outerWidth()/2;
                var $oy=e.pageY-$img.offset().top-$touch.outerHeight()/2;
                if($ox<=0){
                    $ox=0
                }else if($ox>=$ampBox.outerWidth()-$touch.outerWidth()){
                    $ox=$ampBox.outerWidth()-$touch.outerWidth();
                }
                if($oy<=0){
                    $oy=0
                }else if($oy>=$ampBox.outerHeight()-$touch.outerHeight()){
                    $oy=$ampBox.outerHeight()-$touch.outerHeight();
                }
                $touch.css({left:$ox,top:$oy});
                $(".bigimg").find("img").css({marginTop:-$oy*scale,marginLeft:-$ox*scale});
	        })
		}
		
	})
})