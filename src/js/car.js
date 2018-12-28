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
		//显示账号名
		setName();

		//获取账户名
		var name = Cookie.getCookie("username") || [];
		if(typeof name == "string") {
			name = JSON.parse(name);
		}
		//获取商品cookie
		var goodsCarList = Cookie.getCookie("goodsCarList") || [];
		if(typeof goodsCarList == "string") {
			goodsCarList = JSON.parse(goodsCarList);
		}
		//判断是否登录
		if(name != "") {
			$.ajax({
				type: 'GET',
				url: "../api/car.php",
				data: {
					name: name
				},
				success: (res) => {
					if(res != "无") {
						var res = JSON.parse(res);
					} else {
						res = [];
					}
					render1(res);
					//商品加减数量事件
					$(".car_detailsUl").on("click", ":button", function() {
						var i;
						var $num = $(this).parent("li").find(".textnum").val();
						var $textnum = $(this).parent("li").find(".textnum");
						var $liid = $(this).parents("li").eq(1).data("id");
						if($(this).val() == "-") {
							res.some(function(item, idx) {
								i = idx;
								return item.goodsid == $liid;
							})
							if($num > 1) {
								res[i].num--;
							} else if($num <= 1) {
								$textnum.val(1);
							}
							$textnum.val(res[i].num);
							res[i].alloprice = $textnum.val() * res[i].oPrice;

						} else if($(this).val() == "+") {
							res.some(function(item, idx) {
								i = idx;
								return item.goodsid == $liid;
							})
							res[i].num++;
							$textnum.val(res[i].num);
							res[i].alloprice = $textnum.val() * res[i].oPrice;
						}
						$.ajax({
							type: 'GET',
							url: "../api/car.php",
							data: {
								name: name,
								num: res[i].num,
								alloprice: res[i].alloprice,
								goodsid: res[i].goodsid,
								register: true
							},
							success: (res) => {
								var res = JSON.parse(res);
								render1(res);
							}
						})
					})
					$(".car_detailsUl").on("click", "i", function() {
						var i;
						var $liid = $(this).parents("li").eq(1).data("id");
						res.some(function(item, idx) {
							i = idx;
							return item.goodsid == $liid;
						})
						$.ajax({
							type: 'GET',
							url: "../api/car.php",
							data: {
								name: name,
								goodsid: res[i].goodsid,
								register: false
							},
							success: (res) => {
								if(res != "无") {
									var res = JSON.parse(res);
								} else {
									res = [];
								}
								render1(res);
							}
						})
					})

					function render1(res) {
						var $html = res.map(function(item) {
							return `<li data-id="${item.goodsid}">
							<div class="car_details_title">
								<input type="checkbox" checked/>
								<span>红人衣柜</span>
							</div>
							<div class="car_details_main">
								<ul class="clearfix">
									<li>
										<input type="checkbox" checked/>
										<img src="${item.imgurl}" alt="" />
									</li>
									<li>
										<a href="../html/goods.html?id=${item.id}">${item.goodsname}</a>
									</li>
									<li>粉，XL</li>
									<li>￥<span>${item.oPrice}</span></li>
									<li><img src="../images/xingbi.png"/><span>0</span></li>
									<li class="getnumber">
										<input type="button" value="-" />
										<input type="text" value="${item.num}" class="textnum"/>
										<input type="button" value="+" />
									</li>
									<li>
										<img src="../images/xingbi.png"/>
										<span>0</span>
										<span>+</span>
										<span>￥</span>
										<span>${item.alloprice}</span>
									</li>
									<li>
										<i class="fa fa-trash-o"></i>
									</li>
								</ul>
							</div>
						</li>`;
						}).join("");
						$(".car_detailsUl").html($html);

						//获取所有商品总数
						var $allnum = 0;
						res.map(function(item) {
							$allnum += parseInt(item.num);
						})
						//获取所有商品总价格
						var $allprice = 0;
						res.map(function(item) {
							$allprice += parseInt(item.alloprice);
						})
						//渲染总数、总价格
						$(".allnum").html(`${$allnum}`);
						$(".allprice").html(`${$allprice}`);
					}

				}
			})
		} else {
			render();
			//商品加减数量事件
			$(".car_detailsUl").on("click", ":button", function() {
				//获取商品cookie
				var goodsCarList = Cookie.getCookie("goodsCarList") || [];
				if(typeof goodsCarList == "string") {
					goodsCarList = JSON.parse(goodsCarList);
				}
				var i;
				var $num = $(this).parent("li").find(".textnum").val();
				var $textnum = $(this).parent("li").find(".textnum");
				var $liid = $(this).parents("li").eq(1).data("id");
				if($(this).val() == "-") {
					goodsCarList.some(function(item, idx) {
						i = idx;
						return item.id == $liid;
					})
					if($num > 1) {
						goodsCarList[i].num--;
					} else if($num <= 1) {
						$textnum.val(1);
					}
					$textnum.val(goodsCarList[i].num);
					goodsCarList[i].alloprice = $textnum.val() * goodsCarList[i].oPrice;
					Cookie.setCookie("goodsCarList", JSON.stringify(goodsCarList), "", "/");
				} else if($(this).val() == "+") {
					goodsCarList.some(function(item, idx) {
						i = idx;
						return item.id == $liid;
					})
					goodsCarList[i].num++;
					$textnum.val(goodsCarList[i].num);
					goodsCarList[i].alloprice = $textnum.val() * goodsCarList[i].oPrice;
					Cookie.setCookie("goodsCarList", JSON.stringify(goodsCarList), "", "/");
				}

				//渲染商品
				var $html = goodsCarList.map(function(item) {
					return `<li data-id="${item.id}">
							<div class="car_details_title">
								<input type="checkbox" checked/>
								<span>红人衣柜</span>
							</div>
							<div class="car_details_main">
								<ul class="clearfix">
									<li>
										<input type="checkbox" checked/>
										<img src="${item.imgurl}" alt="" />
									</li>
									<li>
										<a href="../html/goods.html?id=${item.id}">${item.goodsname}</a>
									</li>
									<li>粉，XL</li>
									<li>￥<span>${item.oPrice}</span></li>
									<li><img src="../images/xingbi.png"/><span>0</span></li>
									<li class="getnumber">
										<input type="button" value="-" />
										<input type="text" value="${item.num}" class="textnum"/>
										<input type="button" value="+" />
									</li>
									<li>
										<img src="../images/xingbi.png"/>
										<span>0</span>
										<span>+</span>
										<span>￥</span>
										<span>${item.alloprice}</span>
									</li>
									<li>
										<i class="fa fa-trash-o"></i>
									</li>
								</ul>
							</div>
						</li>`;
				}).join("");
				$(".car_detailsUl").html($html);

				//获取所有商品总数
				var $allnum = 0;
				goodsCarList.map(function(item) {
					$allnum += item.num;
				})
				//获取所有商品总价格
				var $allprice = 0;
				goodsCarList.map(function(item) {
					$allprice += item.alloprice;
				})
				//渲染总数、总价格
				$(".allnum").html(`${$allnum}`);
				$(".allprice").html(`${$allprice}`);
			})
			//商品移除事件
			$(".car_detailsUl").on("click", "i", function() {
				//获取商品cookie
				var goodsCarList = Cookie.getCookie("goodsCarList") || [];
				if(typeof goodsCarList == "string") {
					goodsCarList = JSON.parse(goodsCarList);
				}
				var i;
				var $liid = $(this).parents("li").eq(1).data("id");
				goodsCarList.some(function(item, idx) {
					i = idx;
					return item.id == $liid;
				})
				goodsCarList.splice(i, 1);
				Cookie.setCookie("goodsCarList", JSON.stringify(goodsCarList), "", "/");
				//渲染商品
				var $html = goodsCarList.map(function(item) {
					return `<li data-id="${item.id}">
							<div class="car_details_title">
								<input type="checkbox" checked/>
								<span>红人衣柜</span>
							</div>
							<div class="car_details_main">
								<ul class="clearfix">
									<li>
										<input type="checkbox" checked/>
										<img src="${item.imgurl}" alt="" />
									</li>
									<li>
										<a href="../html/goods.html?id=${item.id}">${item.goodsname}</a>
									</li>
									<li>粉，XL</li>
									<li>￥<span>${item.oPrice}</span></li>
									<li><img src="../images/xingbi.png"/><span>0</span></li>
									<li class="getnumber">
										<input type="button" value="-" />
										<input type="text" value="${item.num}" class="textnum"/>
										<input type="button" value="+" />
									</li>
									<li>
										<img src="../images/xingbi.png"/>
										<span>0</span>
										<span>+</span>
										<span>￥</span>
										<span>${item.alloprice}</span>
									</li>
									<li>
										<i class="fa fa-trash-o"></i>
									</li>
								</ul>
							</div>
						</li>`;
				}).join("");
				$(".car_detailsUl").html($html);
				//获取所有商品总数
				var $allnum = 0;
				goodsCarList.map(function(item) {
					$allnum += item.num;
				})
				//获取所有商品总价格
				var $allprice = 0;
				goodsCarList.map(function(item) {
					$allprice += item.alloprice;
				})
				//渲染总数、总价格
				$(".allnum").html(`${$allnum}`);
				$(".allprice").html(`${$allprice}`);
			})
			//渲染
			function render() {
				var $html = goodsCarList.map(function(item) {
					return `<li data-id="${item.id}" class="car_detailsLi">
							<div class="car_details_title">
								<input type="checkbox" checked/>
								<span>红人衣柜</span>
							</div>
							<div class="car_details_main">
								<ul class="clearfix">
									<li>
										<input type="checkbox" checked/>
										<img src="${item.imgurl}" alt="" />
									</li>
									<li>
										<a href="../html/goods.html?id=${item.id}">${item.goodsname}</a>
									</li>
									<li>粉，XL</li>
									<li>￥<span>${item.oPrice}</span></li>
									<li><img src="../images/xingbi.png"/><span>0</span></li>
									<li class="getnumber">
										<input type="button" value="-" />
										<input type="text" value="${item.num}" class="textnum"/>
										<input type="button" value="+" />
									</li>
									<li>
										<img src="../images/xingbi.png"/>
										<span>0</span>
										<span>+</span>
										<span>￥</span>
										<span>${item.alloprice}</span>
									</li>
									<li>
										<i class="fa fa-trash-o"></i>
									</li>
								</ul>
							</div>
						</li>`;
				}).join("");
				$(".car_detailsUl").html($html);
				//获取所有商品总数
				var $allnum = 0;
				goodsCarList.map(function(item) {
					$allnum += item.num;
				})
				//获取所有商品总价格
				var $allprice = 0;
				goodsCarList.map(function(item) {
					$allprice += item.alloprice;
				})
				//渲染总数、总价格
				$(".allnum").html(`${$allnum}`);
				$(".allprice").html(`${$allprice}`);
			}
		}
		//全选

		$(".checktop").on("click", function() {
			$(":checkbox").prop("checked", this.checked);
		})
		$(".checkbottom").on("click", function() {
			$(":checkbox").prop("checked", this.checked);
		})
		$(".car_detailsUl").on("click", ":checkbox", function() {
			$(this).parents(".car_detailsLi").find(":checkbox").not($(this)).prop("checked", this.checked);
		})

	})
})