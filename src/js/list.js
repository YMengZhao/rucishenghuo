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
		var $qty = 20;
		var $currentPage = 1;
//		var $arrow = true;
		var $jiage = null;
		var $xiaoliang = null;
		$(".list_head").on("click", "ul li", function() {
			$(this).parent("ul").find("li").css("background", "#FFFFFF");
			$(this).css("background", "#E8E8E8");
		})
		//生成商品
		function render(res) {
			var $html = res.data.map(function(item) {
				return `<li>
							<div class="conlist_all_logo">
								<img src="${item.imgurl}"/>
							</div>
							<div class="conlist_all_img">
								<img src="${item.imgurl}"/>
							</div>
							<p class="list_name1">${item.goodsname}</p>
							<p class="list_name2"><a href="#">${item.goodsname}</a></p>
							<div class="list_price">
						        <label>¥</label>
						        <span>${item.oPrice}</span>
						    	<del>${item.deloprice}</del>
						    </div>
						    <p class="list_p">红人衣柜</p>
						    <div class="list_button">
						        <a href="#">加入购物车</a>
						        <a href="#">关注商品</a>
						    </div>
						</li>`;
			}).join("");
			$(".goodsListUl").html($html);
		}
		//调用数据生成商品和页码
		$.ajax({
			type: 'GET',
			url: "../api/list.php",
			data: {
				qty: $qty,
				currentPage: $currentPage,
			},
			success: (res) => {			
				var res = JSON.parse(res);
				render(res);
				page();
				//价格排序
				
				$(".jiage").on("click", function(){
					$(this).parent("ul").find("li").find("span").prop("class","fa fa-arrow-down");
					if($jiage){
						$jiage = false;
						$(this).find("a").find("span").prop("class","fa fa-arrow-up");
					}else{						
						$jiage = true;
						$(this).find("a").find("span").prop("class","fa fa-arrow-down");
					}
					$.ajax({
						type: 'GET',
						url: "../api/list.php",
						data: {
							qty: $qty,
							currentPage: $currentPage,
							jiage: $jiage
						},
						success: (res) => {
							var res = JSON.parse(res);
							render(res);
							pageTurning();
						}
					})
				})
				//销量排序
				$(".xiaoliang").on("click", function(){
					$(this).parent("ul").find("li").find("span").prop("class","fa fa-arrow-down");
					if($xiaoliang){
						$xiaoliang = false;
						$(this).find("a").find("span").prop("class","fa fa-arrow-up");
					}else{
						$xiaoliang = true;
						$(this).find("a").find("span").prop("class","fa fa-arrow-down");
					}
					$.ajax({
						type: 'GET',
						url: "../api/list.php",
						data: {
							qty: $qty,
							currentPage: $currentPage,
							xiaoliang: $xiaoliang
						},
						success: (res) => {
							var res = JSON.parse(res);
							render(res);
							pageTurning();
						}
					})
				})
				//生成页码
				function page() {
					var totalPage = Math.ceil(res.len / res.qty);
					$(".pageUl").html("");
					var $pagehtml = "";
					for(var i = 1; i <= totalPage; i++) {
						$pagehtml += `<li><a>${i}</a></li>`;
					}
					$(".pageUl").html($pagehtml);
				}
			}
		})
		//点击页码翻页
		function pageTurning(){
			$(".pageUl").on("click", "li a", function() {
				$currentPage = $(this).html();
				$(this).parent("li").parent("ul").find("li").css("background", "#FFFFFF");
				$(this).parent("li").css("background", "orange");
				$.ajax({
					type: 'GET',
					url: "../api/list.php",
					data: {
						qty: $qty,
						currentPage: $currentPage,
						jiage: $jiage,
						xiaoliang: $xiaoliang
					},
					success: (res) => {
						var res = JSON.parse(res);
						//生成商品
						render(res);
					}
				})
			})
		}
		
		//热销推荐生成
		$.ajax({
			type: 'GET',
			url: "../api/list.php",
			data: {
				qty: 5,
				currentPage: $currentPage,
				jiage: $jiage
			},
			success: (res) => {
				var res = JSON.parse(res);
				render();
				//生成商品
				function render() {
					var $html = res.data.map(function(item) {
						return `<li>
									<div class="conlist_all_logo">
										<img src="${item.imgurl}"/>
									</div>
									<div class="conlist_all_img">
										<img src="${item.imgurl}"/>
									</div>
									<p class="list_name1">${item.goodsname}</p>
									<p class="list_name2"><a href="#">${item.goodsname}</a></p>
									<div class="list_price">
					                    <label>¥</label>
					                    <span>${item.oPrice}</span>
					                    <del>${item.deloprice}</del>
					                </div>
					                <p class="list_p">红人衣柜</p>
					                <div class="list_button">
					                	<a>加入购物车</a>
					                	<a>关注商品</a>
					                </div>
								</li>`;
					}).join("");
					$(".hotListUl").html($html);
				}
			}
		})
	})
})