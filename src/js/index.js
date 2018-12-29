//模块化依赖
require.config({
	shim: {
		"js/base.js": {
			deps: ["lib/jquery-3.3.1.js"]
		}
	}
})

require(["lib/jquery-3.3.1.js", "js/common.js", "js/base.js"], function() {
	jQuery(function($) {
		//轮播图
		var $obj = {
			$banner: $(".banner"),
			$oul: $(".carousel"),
			init: function() {
				//在最后加第一张图片
				$('<li><img src="images/cf5094e10b8e12c5edd8b8cab4820789.jpg"/></li>').appendTo(this.$oul);
			},
			show: function() {
				this.init();
				var $oli = $(".carousel li");
				var $oimg = $(".carousel li img");
				var $len = $oli.length;
				var $idx = 0;
				var $timer;
				this.$oul.css("width", "" + 1200 * $len + "px");
				new Carousel($len, $idx, this.$oul, $timer);
			}
		}

		function Carousel($len, $idx, $oul, $timer) {
			this.$len = $len;
			this.$idx = $idx;
			this.$oul = $oul;
			this.$timer = $timer;
			// 新建小圆点
			$("<div/>").appendTo($obj.$banner).addClass("page");
			for(var i = 0; i < this.$len - 1; i++) {
				$("<span/>").appendTo($(".page")).html(i + 1);
			}
			$(".page").children().eq(0).toggleClass("active");
			//点击小圆点切换图片
			$(".page").on("click", (e) => {
				if(e.target.tagName == "SPAN") {
					this.$idx = $(e.target).html() - 1;
					this.showPic();
				}
			}).on("mousemove", () => {
				clearInterval(this.$timer);
			}).on("mouseout", () => {
				this.$timer = setInterval(() => {
					this.$idx++;
					this.showPic();
				}, 2500);
			})
			//开启定时器播放轮播
			this.$timer = setInterval(() => {
				this.$idx++;
				this.showPic();
			}, 2500);
		}
		// 呈现图片、圆点变色
		Carousel.prototype.showPic = function() {
			if(this.$idx == this.$len) {
				this.$oul.css("left", "0");
				this.$idx = 1;
			}
			if(this.$idx == -1) {
				this.$oul.css("left", "" + -1200 * (this.$len - 1) + "px");
				this.$idx = this.$len - 2;
			}
			this.$oul.stop().animate({
				left: -1200 * this.$idx
			}, 500);
			$(".page").children().removeClass("active");
			if(this.$idx == this.$len - 1) {
				$(".page").children().eq(0).addClass("active");
			} else {
				$(".page").children().eq(this.$idx).addClass("active");
			}
		}
		$obj.show();

		setNameIndex();
		//进入页面渲染侧边购物车
		//获取账户名
		var name = Cookie.getCookie("username") || [];
		if(typeof name == "string") {
			name = JSON.parse(name);
		}
		if(name != ""){
			$.ajax({
				type: 'GET',
				url: "api/car.php",
				data: {
					name: name
				},
				success: (res) => {
					var res = JSON.parse(res);
					//获取商品总数
					var $allnum = 0;
					res.map(function(item) {
						$allnum += parseInt(item.num);
					})
					//渲染侧边购物车
					$(".carAllNum").html($allnum);
				}
			})
		}else{
			//获取商品cookie
			var goodsCarList = Cookie.getCookie("goodsCarList") || [];
			if(typeof goodsCarList == "string") {
				goodsCarList = JSON.parse(goodsCarList);
			}
			//获取商品总数
			var $allnum = 0;
			goodsCarList.map(function(item) {
				$allnum += item.num;
			})
			//渲染侧边购物车
			$(".carAllNum").html($allnum);			
		}
		//猜你喜欢
		$.ajax({
			type: 'GET',
			url: "api/list.php",
			data: {
				qty: 5,
				currentPage: 1,
				xiaoliang: true
			},
			success: (res) => {
				var res = JSON.parse(res);
				var $html = res.data.map(function(item){
					return `<div class="llc_item">
						<div class="llc_item_logo">
							<a><img src="${item.imgurl.slice(3)}"/></a>
						</div>
						<div class="llc_item_name">
							<p><a href="html/goods.html?id=${item.id}">${item.goodsname}</a></p>
							<p>¥ ${item.oPrice}</p>
						</div>
						<div class="llc_item_button">
							<a href="html/goods.html?id=${item.id}">我要购买</a>
						</div>
					</div>`
				}).join("");
				$(".like_list_content").html($html);
			}
		})
		
	})
})