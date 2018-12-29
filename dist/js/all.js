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

					//删除
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
			$(".settlement").on("click",function(){
				alert("购买成功");
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
			$(".settlement").on("click",function(){
				location.href = "../html/login.html"
			})
		}
		
		//全选、反选

		$(".checktop").on("click", function() {
			$(":checkbox").prop("checked", this.checked);
		})
		$(".checkbottom").on("click", function() {
			$(":checkbox").prop("checked", this.checked);
		})
		$(".car_detailsUl").on("click", ":checkbox", function() {
			$(this).parents(".car_detailsLi").find(":checkbox").not($(this)).prop("checked", this.checked);
			isAll();
		})

		function isAll() {
			var $checkedLen = $(".car_details :checked").length;
			var $checkboxLen = $(".car_details :checkbox").length;
			if($checkedLen == $checkboxLen) {
				$(".checktop").prop("checked", true);
				$(".checkbottom").prop("checked", true);
			} else {
				$(".checktop").prop("checked", false);
				$(".checkbottom").prop("checked", false);
			}
		}
		
		//猜你喜欢
		$.ajax({
			type: 'GET',
			url: "../api/list.php",
			data: {
				qty: 4,
				currentPage: 1,
				xiaoliang: true
			},
			success: (res) => {
				var res = JSON.parse(res);
				var $html = res.data.map(function(item){
					return `<li>
							<div class="bottom_img">
								<img src="${item.imgurl}"/>
							</div>
							<p><a href="../html/goods.html?id=${item.id}">${item.goodsname}</a></p>
							<div class="bottom_sp">
								￥
								<span>${item.oPrice}</span>
							</div>
							<div class="bottom_bt">
								<a href="../html/goods.html?id=${item.id}"><i class="fa fa-shopping-cart"></i>加入购物车</a>
							</div>
						</li>`
				}).join("");
				$(".recommend_bottomUl").html($html);
			}
		})
	})
})
// 封装a-b的随机整数
function getRandomNum(a,b){
    var res = parseInt(Math.random()*(b-a+1)+ a);
    return res;
    // parseInt([0,1)*71+30)======>parseInt([0,71)+30)======>parseInt[30,101) =>30,100
    // 100-30+1
}
// 获取随机色
function getRandomColor(){
    return 'rgb('+getRandomNum(0,255)+','+getRandomNum(0,255)+','+getRandomNum(0,255)+')';
}

// 获取元素节点
var Element = {
    /*
    ** 功能： 过滤数组，只拿到包含元素节点的数组
    ** 形参nodes ：包含文本、元素节点的一个数组
    */
    getElementNodes : function(nodes){
        var elementsNode = [];
        // 过滤只得到元素节点
        for(var i=0;i<nodes.length;i++){
            if(nodes[i].nodeType == 1){
                elementsNode.push(nodes[i]);
            }
        }
        return elementsNode;
    }, 
    /*
    ** 功能： 传入父元素节点，获取到父元素的所有元素子节点
    ** 形参parent ：父元素节点
    */
    getElementsChild: function(parent){
        var erzis = parent.childNodes; //获取到所有的节点
        return Element.getElementNodes(erzis);//直接调用
    },
    getNextElement : function(ele){
        var next = ele.nextSibling;
        if(next.nodeType != 1){
            next = next.nextSibling;
        }
        return next;
    },
    // ....
}

//  获取元素样式
function getStyle(ele,key){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele)[key];
    }else if(ele.currentStyle){
        return ele.currentStyle[key];
    }else{
        return ele.style[key];
    }
}


// 绑定事件的兼容写法：
function bind(ele,type,fn,isCapture){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,isCapture);
    }else if(ele.attachEvent){
        ele.attachEvent("on"+type,fn);
    }else{
        ele["on"+type] = fn;
    }
}


// 封装cookie的设置、获取、删除
var Cookie = {
    // 设置cookie
    //  * name cookie名
    //  * val cookie值
    //  * date 时间对象
    //  * path 路径
    setCookie : function(name,val,date,path){
        var str = name+"="+val;
        if(date){
            str += "; expires="+date.toUTCString();
        }
        if(path){
            str += "; path="+path;
        }
        document.cookie = str;
    },
    // 获取cookie
    getCookie : function(name){
        var cookie = document.cookie;//"left=300; age=17"   
        if(cookie == ""){
            return "";
        }else{
            var cookieArr = cookie.split("; ");
            // var res = "";
            // cookieArr.forEach(function(item){
            //     var arr = item.split("=");
            //     if(arr[0] == name){
            //         res =  arr[1];
            //     }
            // })
            // return res;
            for(var i=0;i<cookieArr.length;i++){
                var arr = cookieArr[i].split("=");
                if(arr[0] == name){
                    return arr[1];
                }
            }
            return "";
        }
    },
    // 删除某条cookie
    delCookie : function(name,path){
        var d = new Date();
        d.setDate(d.getDate()-1);
        Cookie.setCookie(name,"",d,path);
    }
}


// 缓冲动画(透明度)
//1.开启定时器
//(1)获取当前值
//(2)获取当前速度(目标值-当前值).
//     * 当速度大于0时，Math.ceil()
//     * 当速度小于0时，Math.floor()
//(3)改变当前值：当前值+速度
//(3)将改变后的值赋值给元素的样式
//(4)当改变后的值等于目标值，清除定时器
//备注: 事件开启定时器之前，一定要记得先清除已存在的定时器。
// function animation(ele,attr,target,time){
//     target = attr == "opacity"? target*100:target;
//     clearInterval(ele.timer);
//     ele.timer = setInterval(function(){
//         var current = window.getComputedStyle(ele)[attr];//200px   /[a-z]+/
//         var unit = current.match(/[a-z]+$/);//提取单位
//         unit = unit? unit[0] : "";
//         current = parseFloat(current);//只获取数值
//         current = attr == "opacity"? current*100 : current;
//         var speed = (target-current)/10;
//         if(speed > 0){
//             speed = Math.ceil(speed);
//         }else if(speed < 0){
//             speed = Math.floor(speed);
//         }
//         current += speed;
//         ele.style[attr] = attr == "opacity"? current/100 :current + unit;
//         if(current == target){
//             clearInterval(ele.timer);
//         }
//     }, time)
// }

// 缓冲动画（改进）
// 1.定时器名字根据css属性进行命名,从而保证多个定时器赋值给的变量名不同，不会发生覆盖。
// 2.在一个动画函数里面，可以定义多个css属性同时改变
//  * 参数变成对象{attr:target}
//  * for...in遍历对象，拿到每个attr及对应target值
//      * 利用let，将attr、target的值保留在当前的块级作用域
//      * 利用函数的形参，将attr、target的值存在局部作用域。
// 3.需求：所有动画执行完毕后，进行一堆操作。
// （1）在清除定时器后再执行这堆操作，会出现执行多次的问题
//      * 统计出attr的个数，每次清除定时器就对个数进行--，直到为0，代表所有动画执行完毕。
// (2) 封装动画函数结束后，别人要做什么，我不知道。所以只能帮你执行。你需要把你要做的东西封装成函数，传参给我
//      * 别人不一定会传递回调函数，要判断。     

function animation(ele,obj,time,fn){
    var count = 0;
    for(var key in obj){
        count++;
        var attr = key;
        var target = obj[key];
        show(attr,target);
    }
    function show(attr,target){
        target = attr == "opacity"? target*100:target;
        clearInterval(ele[attr+"Timer"]);
        ele[attr+"Timer"] = setInterval(function(){
            var current = window.getComputedStyle(ele)[attr];//200px   /[a-z]+/
            var unit = current.match(/[a-z]+$/);//提取单位
            unit = unit? unit[0] : "";
            current = parseFloat(current);//只获取数值
            current = attr == "opacity"? current*100 : parseInt(current);
            var speed = (target-current)/10;
            if(speed > 0){
                speed = Math.ceil(speed);
            }else if(speed < 0){
                speed = Math.floor(speed);
            }
            current += speed;
            ele.style[attr] = attr == "opacity"? current/100 :current + unit;
            if(current == target){
                clearInterval(ele[attr+"Timer"]);
                count--;
                if(count == 0 && fn && typeof(fn) == "function"){
                    fn();
                }
            }
        }, time)
    }
}
// function animation(ele,obj,time){
//     for(var key in obj){
//         let attr = key;
//         let target = obj[key];
//         target = attr == "opacity"? target*100:target;
//         clearInterval(ele[attr+"Timer"]);
//         ele[attr+"Timer"] = setInterval(function(){
//             var current = window.getComputedStyle(ele)[attr];//200px   /[a-z]+/
//             var unit = current.match(/[a-z]+$/);//提取单位
//             unit = unit? unit[0] : "";
//             current = parseFloat(current);//只获取数值
//             current = attr == "opacity"? current*100 : current;
//             var speed = (target-current)/10;
//             if(speed > 0){
//                 speed = Math.ceil(speed);
//             }else if(speed < 0){
//                 speed = Math.floor(speed);
//             }
//             current += speed;
//             ele.style[attr] = attr == "opacity"? current/100 :current + unit;
//             if(current == target){
//                 clearInterval(ele[attr+"Timer"]);
//             }
//         }, time)
//     }
// }

//备注: 事件开启定时器之前，一定要记得先清除已存在的定时器。
function linearAnimate(speed,ele,attr,target,time){
    clearInterval(ele.timer);
    var speed = speed;
    ele.timer = setInterval(function(){
        var current = window.getComputedStyle(ele)[attr];
        console.log(current);
        var unit = current.match(/[a-z]+$/);//提取单位
        unit = unit? unit[0] : "";
        current = parseFloat(current);//只获取数值
        current += speed;
        console.log(current);

        ele.style[attr] = current + unit;
        if(current >= target){
            current = target;
            clearInterval(ele.timer);
        }
        // if(speed >0 && current >= target || speed<0 && current <= target){
        //     current = target;
        //     clearInterval(ele.timer);
        // }
        // -3  current100 target 10
    }, time)
}


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

		//显示账号名
		setName();

		//加入购物车存入cookies
		function addToCart(res) {
			//获取账户名
			var name = Cookie.getCookie("username") || [];
			if(typeof name == "string") {
				name = JSON.parse(name);
			}
			$(".addCart").on("click", function() {
				//得到数量
				$num = parseInt($num);
				if(name != "") {
					//请求数据库查询是否存在
					$.ajax({
						type: 'GET',
						url: "../api/goodscar.php",
						data: {
							name: name,
							goodsid: res.id
						},
						success: (res3) => {
							$.ajax({
								type: 'GET',
								url: "../api/goodscar.php",
								data: {
									name: name,
									num: $num,
									goodsname: res.goodsname,
									imgurl: res.imgurl,
									oPrice: res.oPrice,
									alloprice: $num * res.oPrice,
									goodsid: res.id,
									register: true
								},
								success: (res3) => {
									var res3 = JSON.parse(res3);
									//获取商品总数
									var $allnum = 0;
									res3.map(function(item) {
										$allnum += parseInt(item.num);
									})
									//渲染侧边购物车
									$(".carAllNum").html($allnum);
								}
							})
						}
					})
				} else {
					//获取商品cookie
					var goodsCarList = Cookie.getCookie("goodsCarList") || [];
					if(typeof goodsCarList == "string") {
						goodsCarList = JSON.parse(goodsCarList);
					}
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
						goodsCarList[i].alloprice += ($num * res.oPrice);
					} else {
						res.num = $num;
						res.alloprice = $num * res.oPrice;
						goodsCarList.push(res);
					}
					//把商品存入cookies
					Cookie.setCookie("goodsCarList", JSON.stringify(goodsCarList), "", "/");
					//获取商品总数
					var $allnum = 0;
					goodsCarList.map(function(item) {
						$allnum += item.num;
					})
					//渲染侧边购物车
					$(".carAllNum").html($allnum);
				}
				//飞入购物车
				//加入购物车按钮距离页面头部和右边的距离
				var top = $(".addCart").offset().top - $(window).scrollTop();
				var right = $(window).width() - $(".addCart").offset().left - $(window).scrollLeft() - 40;
				$("<img/>").appendTo($(".details_center_bottom_button")).addClass("cloneImg").css("top", top).css("right", right).prop("src", `${res.imgurl}`).animate({
					top: 20,
					right: 300,
					opacity: 0.9
				}, 500, function() {
					$(this).animate({
						top: 100,
						right: 0,
						width: 40,
						height: 40,
						opacity: 0.6
					}, 500, function() {
						$(this).remove();
					})
				})
			})
			//进入页面渲染侧边购物车
			//获取账户名
			if(name != "") {
				$.ajax({
					type: 'GET',
					url: "../api/car.php",
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
			} else {
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
		}

		//放大镜
		function fandajing(res) {
			var $ampBox = $(".details_left_tu");
			var $img = $(".details_left_tu").find("img");
			var $touch = $(".touch");
			$ampBox.on("mouseover", function() {
				$(".bigimg").css("display", "block");
				$touch.css("display", "block");
			}).on("mouseout", function() {
				$(".bigimg").css("display", "none");
				$touch.css("display", "none");
			}).on("mousemove", function(e) {
				var scale = 3;
				$touch.css({
					width: $ampBox.outerWidth() / scale,
					height: $ampBox.outerHeight() / scale
				});
				$(".bigimg").find("img").prop("src", $img[0].src).css({
					width: $ampBox.outerWidth() * scale
				});
				var $ox = e.pageX - $img.offset().left - $touch.outerWidth() / 2;
				var $oy = e.pageY - $img.offset().top - $touch.outerHeight() / 2;
				if($ox <= 0) {
					$ox = 0
				} else if($ox >= $ampBox.outerWidth() - $touch.outerWidth()) {
					$ox = $ampBox.outerWidth() - $touch.outerWidth();
				}
				if($oy <= 0) {
					$oy = 0
				} else if($oy >= $ampBox.outerHeight() - $touch.outerHeight()) {
					$oy = $ampBox.outerHeight() - $touch.outerHeight();
				}
				$touch.css({
					left: $ox,
					top: $oy
				});
				$(".bigimg").find("img").css({
					marginTop: -$oy * scale,
					marginLeft: -$ox * scale
				});
			})
		}
		
		//点击边框变色
		$(".goodscolor").on("click",".si",function(){
			$(".goodscolor .si").css("border-color","#E8E8E8")
			$(this).css("border-color","orange")
		})
		$(".goodsSize").on("click",".ss",function(){
			$(".goodsSize .ss").css("border-color","#E8E8E8")
			$(this).css("border-color","orange")
		})
		$(".details_left_banner").on("click","ul li",function(){
			$(".details_left_banner ul li").css("border-color","#ccc")
			$(this).css("border-color","#0068B6")
			var $imgg =  $(this).find("img").prop("src");
			$(".details_left_tu").find("img").prop("src",$imgg);
		})
		
	})
})
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
		var $jiage = null;
		var $xiaoliang = null;
		var $renqi = null;
		var $shijian = null;
		//点击排序标签变背景色
		$(".list_head").on("click", "ul li", function() {
			$(this).parent("ul").find("li").css("background", "#FFFFFF");
			$(this).css("background", "#E8E8E8");
		})
		//生成商品
		function render(res) {
			var $html = res.data.map(function(item) {
				return `<li data-id="${item.id}">
							<div class="conlist_all_logo">
								<img src="${item.imgurl}"/>
							</div>
							<div class="conlist_all_img">
								<img src="${item.imgurl}"/>
							</div>
							<p class="list_name1">${item.goodsname}</p>
							<p class="list_name2"><a href="">${item.goodsname}</a></p>
							<div class="list_price">
						        <label>¥</label>
						        <span>${item.oPrice}</span>
						    	<del>${item.deloprice}</del>
						    </div>
						    <p class="list_p">红人衣柜</p>
						    <div class="list_button">
						        <a href="">加入购物车</a>
						        <a href="">关注商品</a>
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
				pageTurning();
				//默认排序
				$(".moren").on("click", function() {
					$(this).parent("ul").find("li").find("span").prop("class", "fa fa-arrow-down");
					$.ajax({
						type: 'GET',
						url: "../api/list.php",
						data: {
							qty: $qty,
							currentPage: $currentPage
						},
						success: (res) => {
							var res = JSON.parse(res);
							render(res);
							pageTurning();
						}
					})
				})
				//价格排序
				$(".jiage").on("click", function() {
					$(this).parent("ul").find("li").find("span").prop("class", "fa fa-arrow-down");
					if($jiage) {
						$jiage = false;
						$(this).find("a").find("span").prop("class", "fa fa-arrow-up");
					} else {
						$jiage = true;
						$(this).find("a").find("span").prop("class", "fa fa-arrow-down");
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
				$(".xiaoliang").on("click", function() {
					$(this).parent("ul").find("li").find("span").prop("class", "fa fa-arrow-down");
					if($xiaoliang) {
						$xiaoliang = false;
						$(this).find("a").find("span").prop("class", "fa fa-arrow-up");
					} else {
						$xiaoliang = true;
						$(this).find("a").find("span").prop("class", "fa fa-arrow-down");
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
				//人气排序
				$(".renqi").on("click", function() {
					$(this).parent("ul").find("li").find("span").prop("class", "fa fa-arrow-down");
					if($renqi) {
						$renqi = false;
						$(this).find("a").find("span").prop("class", "fa fa-arrow-up");
					} else {
						$renqi = true;
						$(this).find("a").find("span").prop("class", "fa fa-arrow-down");
					}
					$.ajax({
						type: 'GET',
						url: "../api/list.php",
						data: {
							qty: $qty,
							currentPage: $currentPage,
							renqi: $renqi
						},
						success: (res) => {
							var res = JSON.parse(res);
							render(res);
							pageTurning();
						}
					})
				})
				//时间排序
				$(".shijian").on("click", function() {
					$(this).parent("ul").find("li").find("span").prop("class", "fa fa-arrow-down");
					if($shijian) {
						$shijian = false;
						$(this).find("a").find("span").prop("class", "fa fa-arrow-up");
					} else {
						$shijian = true;
						$(this).find("a").find("span").prop("class", "fa fa-arrow-down");
					}
					$.ajax({
						type: 'GET',
						url: "../api/list.php",
						data: {
							qty: $qty,
							currentPage: $currentPage,
							shijian: $shijian
						},
						success: (res) => {
							var res = JSON.parse(res);
							render(res);
							pageTurning();
						}
					})
				})
				//列表页传参
				$(".goodsListUl").on("click", ".conlist_all_logo img", function() {
					var goodsid = $(this).parents("li").attr("data-id");
					location.href = "../html/goods.html?id=" + goodsid + "";
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
		function pageTurning() {
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
						xiaoliang: $xiaoliang,
						renqi: $renqi,
						shijian: $shijian
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
				xiaoliang: true
			},
			success: (res) => {
				var res = JSON.parse(res);
				render();
				//生成商品
				function render() {
					var $html = res.data.map(function(item) {
						return `<li data-id="${item.id}">
									<div class="conlist_all_logo">
										<img src="${item.imgurl}"/>
									</div>
									<div class="conlist_all_img">
										<img src="${item.imgurl}"/>
									</div>
									<p class="list_name1">${item.goodsname}</p>
									<p class="list_name2"><a href="">${item.goodsname}</a></p>
									<div class="list_price">
					                    <label>¥</label>
					                    <span>${item.oPrice}</span>
					                    <del>${item.deloprice}</del>
					                </div>
					                <p class="list_p">红人衣柜</p>
					                <div class="list_button">
					                	<a href="">加入购物车</a>
					                	<a href="">关注商品</a>
					                </div>
								</li>`;
					}).join("");
					$(".hotListUl").html($html);
				}
			}
		})

		//获取账号名
		setName();

		//进入页面渲染侧边购物车
		//获取账户名
		var name = Cookie.getCookie("username") || [];
		if(typeof name == "string") {
			name = JSON.parse(name);
		}
		console.log(name)
		if(name != "") {
			$.ajax({
				type: 'GET',
				url: "../api/car.php",
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
		} else {
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
		
	})
})
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
/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.5 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

var requirejs, require, define;
(function (global, setTimeout) {
    var req, s, head, baseElement, dataMain, src,
        interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = '2.3.5',
        commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
        //PS3 indicates loaded and complete, but need to wait for complete
        //specifically. Sequence is 'loading', 'loaded', execution,
        // then 'complete'. The UA check is unfortunate, but not sure how
        //to feature test w/o causing perf issues.
        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
                      /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',
        //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    //Could match something like ')//comment', do not lose the prefix to comment.
    function commentReplace(match, singlePrefix) {
        return singlePrefix || '';
    }

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === 'object' && value &&
                        !isArray(value) && !isFunction(value) &&
                        !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    function defaultOnError(err) {
        throw err;
    }

    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite an existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    //Allow for a require config object
    if (typeof require !== 'undefined' && !isFunction(require)) {
        //assume it is a config object.
        cfg = require;
        require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers,
            checkLoadedTimeoutId,
            config = {
                //Defaults. Do not set a default for map
                //config to speed up normalize(), which
                //will run faster if there is no default.
                waitSeconds: 7,
                baseUrl: './',
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            registry = {},
            //registry of just enabled modules, to speed
            //cycle breaking code when lots of modules
            //are registered, but not activated.
            enabledRegistry = {},
            undefEvents = {},
            defQueue = [],
            defined = {},
            urlFetched = {},
            bundlesMap = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part;
            for (i = 0; i < ary.length; i++) {
                part = ary[i];
                if (part === '.') {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i === 1 && ary[2] === '..') || ary[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex,
                foundMap, foundI, foundStarMap, starI, normalizedBaseParts,
                baseParts = (baseName && baseName.split('/')),
                map = config.map,
                starMap = map && map['*'];

            //Adjust any relative paths.
            if (name) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // If wanting node ID compatibility, strip .js from end
                // of IDs. Have to do this here, and not in nameToUrl
                // because node allows either .js or non .js to map
                // to same file.
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                // Starts with a '.' so need the baseName
                if (name[0].charAt(0) === '.' && baseParts) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = normalizedBaseParts.concat(name);
                }

                trimDots(name);
                name = name.join('/');
            }

            //Apply map config if available.
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split('/');

                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join('/');

                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break outerLoop;
                                }
                            }
                        }
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }

                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }

                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                }
            }

            // If the name points to a package's name, use
            // the package main instead.
            pkgMain = getOwn(config.pkgs, name);

            return pkgMain ? pkgMain : name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute('data-requiremodule') === name &&
                            scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);

                //Custom require that does not do map translation, since
                //ID is "absolute", already mapped/resolved.
                context.makeRequire(null, {
                    skipMap: true
                })([id]);

                return true;
            }
        }

        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = '';

            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix);
            }

            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (isNormalized) {
                        normalizedName = name;
                    } else if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        // If nested plugin references, then do not try to
                        // normalize, as it will not normalize correctly. This
                        // places a restriction on resourceIds, and the longer
                        // term solution is not to normalize until plugins are
                        // loaded and all normalizations to allow for async
                        // loading of a loader plugin. But for now, fixes the
                        // common uses. Details in #1131
                        normalizedName = name.indexOf('!') === -1 ?
                                         normalize(name, parentName, applyMap) :
                                         name;
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);

                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;

                    url = context.nameToUrl(normalizedName);
                }
            }

            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ?
                     '_unnormalized' + (unnormalizedCounter += 1) :
                     '';

            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ?
                        prefix + '!' + normalizedName :
                        normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }

            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(defined, id) &&
                    (!mod || mod.defineEmitComplete)) {
                if (name === 'defined') {
                    fn(defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === 'error') {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
                errback(err);
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit('error', err);
                        }
                    }
                });

                if (!notified) {
                    req.onError(err);
                }
            }
        }

        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                each(globalDefQueue, function(queueItem) {
                    var id = queueItem[0];
                    if (typeof id === 'string') {
                        context.defQueueMap[id] = true;
                    }
                    defQueue.push(queueItem);
                });
                globalDefQueue = [];
            }
        }

        handlers = {
            'require': function (mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return (mod.require = context.makeRequire(mod.map));
                }
            },
            'exports': function (mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return (defined[mod.map.id] = mod.exports);
                    } else {
                        return (mod.exports = defined[mod.map.id] = {});
                    }
                }
            },
            'module': function (mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return (mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function () {
                            return getOwn(config.config, mod.map.id) || {};
                        },
                        exports: mod.exports || (mod.exports = {})
                    });
                }
            }
        };

        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
                mod.emit('error', mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);

                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check(); //pass false?
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var err, usingPathFallback,
                waitInterval = config.waitSeconds * 1000,
                //It is possible to disable the wait interval by using waitSeconds of 0.
                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;

            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }

            inCheckLoaded = true;

            //Figure out the state of all the modules.
            eachProp(enabledRegistry, function (mod) {
                var map = mod.map,
                    modId = map.id;

                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }

                if (!map.isDefine) {
                    reqCalls.push(mod);
                }

                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return (needCycleCheck = false);
                        }
                    }
                }
            });

            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }

            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {});
                });
            }

            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }

            inCheckLoaded = false;
        }

        Module = function (map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;

            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
        };

        Module.prototype = {
            init: function (depMaps, factory, errback, options) {
                options = options || {};

                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }

                this.factory = factory;

                if (errback) {
                    //Register for errors on this module.
                    this.on('error', errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function (err) {
                        this.emit('error', err);
                    });
                }

                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);

                this.errback = errback;

                //Indicate this module has be initialized
                this.inited = true;

                this.ignore = options.ignore;

                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },

            defineDep: function (i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },

            fetch: function () {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;

                context.startTime = (new Date()).getTime();

                var map = this.map;

                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },

            load: function () {
                var url = this.map.url;

                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },

            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function () {
                if (!this.enabled || this.enabling) {
                    return;
                }

                var err, cjsModule,
                    id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;

                if (!this.inited) {
                    // Only fetch if not already in the defQueue.
                    if (!hasProp(context.defQueueMap, id)) {
                        this.fetch();
                    }
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;

                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error. However,
                            //only do it for define()'d  modules. require
                            //errbacks should not be called for failures in
                            //their callbacks (#699). However if a global
                            //onError is set, use that.
                            if ((this.events.error && this.map.isDefine) ||
                                req.onError !== defaultOnError) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }

                            // Favor return value over exports. If node/cjs in play,
                            // then will not have a return value anyway. Favor
                            // module.exports assignment over exports object.
                            if (this.map.isDefine && exports === undefined) {
                                cjsModule = this.module;
                                if (cjsModule) {
                                    exports = cjsModule.exports;
                                } else if (this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }

                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                err.requireType = this.map.isDefine ? 'define' : 'require';
                                return onError((this.error = err));
                            }

                        } else {
                            //Just a literal value
                            exports = factory;
                        }

                        this.exports = exports;

                        if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;

                            if (req.onResourceLoad) {
                                var resLoadMaps = [];
                                each(this.depMaps, function (depMap) {
                                    resLoadMaps.push(depMap.normalizedMap || depMap);
                                });
                                req.onResourceLoad(context, this.map, resLoadMaps);
                            }
                        }

                        //Clean up
                        cleanRegistry(id);

                        this.defined = true;
                    }

                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;

                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }

                }
            },

            callPlugin: function () {
                var map = this.map,
                    id = map.id,
                    //Map already normalized the prefix.
                    pluginMap = makeModuleMap(map.prefix);

                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);

                on(pluginMap, 'defined', bind(this, function (plugin) {
                    var load, normalizedMap, normalizedMod,
                        bundleId = getOwn(bundlesMap, this.map.id),
                        name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                            enableBuildCallback: true
                        });

                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                return normalize(name, parentName, true);
                            }) || '';
                        }

                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + '!' + name,
                                                      this.map.parentMap,
                                                      true);
                        on(normalizedMap,
                            'defined', bind(this, function (value) {
                                this.map.normalizedMap = normalizedMap;
                                this.init([], function () { return value; }, null, {
                                    enabled: true,
                                    ignore: true
                                });
                            }));

                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);

                            if (this.events.error) {
                                normalizedMod.on('error', bind(this, function (err) {
                                    this.emit('error', err);
                                }));
                            }
                            normalizedMod.enable();
                        }

                        return;
                    }

                    //If a paths config, then just load that file instead to
                    //resolve the plugin, as it is built into that paths layer.
                    if (bundleId) {
                        this.map.url = context.nameToUrl(bundleId);
                        this.load();
                        return;
                    }

                    load = bind(this, function (value) {
                        this.init([], function () { return value; }, null, {
                            enabled: true
                        });
                    });

                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];

                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });

                        onError(err);
                    });

                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function (text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;

                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }

                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }

                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);

                        //Transfer any config to this other module.
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }

                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError('fromtexteval',
                                             'fromText eval for ' + id +
                                            ' failed: ' + e,
                                             e,
                                             [id]));
                        }

                        if (hasInteractive) {
                            useInteractive = true;
                        }

                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);

                        //Support anonymous modules.
                        context.completeLoad(moduleName);

                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([moduleName], load);
                    });

                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, config);
                }));

                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },

            enable: function () {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;

                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;

                //Enable each dependency
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;

                    if (typeof depMap === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap,
                                               (this.map.isDefine ? this.map : this.map.parentMap),
                                               false,
                                               !this.skipMap);
                        this.depMaps[i] = depMap;

                        handler = getOwn(handlers, depMap.id);

                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }

                        this.depCount += 1;

                        on(depMap, 'defined', bind(this, function (depExports) {
                            if (this.undefed) {
                                return;
                            }
                            this.defineDep(i, depExports);
                            this.check();
                        }));

                        if (this.errback) {
                            on(depMap, 'error', bind(this, this.errback));
                        } else if (this.events.error) {
                            // No direct errback on this module, but something
                            // else is listening for errors, so be sure to
                            // propagate the error correctly.
                            on(depMap, 'error', bind(this, function(err) {
                                this.emit('error', err);
                            }));
                        }
                    }

                    id = depMap.id;
                    mod = registry[id];

                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));

                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));

                this.enabling = false;

                this.check();
            },

            on: function (name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },

            emit: function (name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt);
                });
                if (name === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;

            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');

            return {
                node: node,
                id: node && node.getAttribute('data-requiremodule')
            };
        }

        function intakeDefines() {
            var args;

            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();

            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' +
                        args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
            context.defQueueMap = {};
        }

        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            defQueueMap: {},
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function (cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                // Convert old style urlArgs string to a function.
                if (typeof cfg.urlArgs === 'string') {
                    var urlArgs = cfg.urlArgs;
                    cfg.urlArgs = function(id, url) {
                        return (url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
                    };
                }

                //Save off the paths since they require special processing,
                //they are additive.
                var shim = config.shim,
                    objs = {
                        paths: true,
                        bundles: true,
                        config: true,
                        map: true
                    };

                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (!config[prop]) {
                            config[prop] = {};
                        }
                        mixin(config[prop], value, true, true);
                    } else {
                        config[prop] = value;
                    }
                });

                //Reverse map the bundles
                if (cfg.bundles) {
                    eachProp(cfg.bundles, function (value, prop) {
                        each(value, function (v) {
                            if (v !== prop) {
                                bundlesMap[v] = prop;
                            }
                        });
                    });
                }

                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    config.shim = shim;
                }

                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location, name;

                        pkgObj = typeof pkgObj === 'string' ? {name: pkgObj} : pkgObj;

                        name = pkgObj.name;
                        location = pkgObj.location;
                        if (location) {
                            config.paths[name] = pkgObj.location;
                        }

                        //Save pointer to main module ID for pkg name.
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main')
                                     .replace(currDirRegExp, '')
                                     .replace(jsSuffixRegExp, '');
                    });
                }

                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function (mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id, null, true);
                    }
                });

                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },

            makeShimExports: function (value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || (value.exports && getGlobal(value.exports));
                }
                return fn;
            },

            makeRequire: function (relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;

                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }

                    if (typeof deps === 'string') {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                        }

                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }

                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }

                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;

                        if (!hasProp(defined, id)) {
                            return onError(makeError('notloaded', 'Module name "' +
                                        id +
                                        '" has not been loaded yet for context: ' +
                                        contextName +
                                        (relMap ? '' : '. Use require([])')));
                        }
                        return defined[id];
                    }

                    //Grab defines waiting in the global queue.
                    intakeDefines();

                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();

                        requireMod = getModule(makeModuleMap(null, relMap));

                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;

                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });

                        checkLoaded();
                    });

                    return localRequire;
                }

                mixin(localRequire, {
                    isBrowser: isBrowser,

                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function (moduleNamePlusExt) {
                        var ext,
                            index = moduleNamePlusExt.lastIndexOf('.'),
                            segment = moduleNamePlusExt.split('/')[0],
                            isRelative = segment === '.' || segment === '..';

                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }

                        return context.nameToUrl(normalize(moduleNamePlusExt,
                                                relMap && relMap.id, true), ext,  true);
                    },

                    defined: function (id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },

                    specified: function (id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id);
                    }
                });

                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function (id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();

                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);

                        mod.undefed = true;
                        removeScript(id);

                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];

                        //Clean queued defines too. Go backwards
                        //in array so that the splices do not
                        //mess up the iteration.
                        eachReverse(defQueue, function(args, i) {
                            if (args[0] === id) {
                                defQueue.splice(i, 1);
                            }
                        });
                        delete context.defQueueMap[id];

                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }

                            cleanRegistry(id);
                        }
                    };
                }

                return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function (depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function (moduleName) {
                var found, args, mod,
                    shim = getOwn(config.shim, moduleName) || {},
                    shExports = shim.exports;

                takeGlobalQueue();

                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }

                    callGetModule(args);
                }
                context.defQueueMap = {};

                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);

                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError('nodefine',
                                             'No define call for ' + moduleName,
                                             null,
                                             [moduleName]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                    }
                }

                checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function (moduleName, ext, skipExt) {
                var paths, syms, i, parentModule, url,
                    parentPath, bundleId,
                    pkgMain = getOwn(config.pkgs, moduleName);

                if (pkgMain) {
                    moduleName = pkgMain;
                }

                bundleId = getOwn(bundlesMap, moduleName);

                if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt);
                }

                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths = config.paths;

                    syms = moduleName.split('/');
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join('/');

                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        }
                    }

                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join('/');
                    url += (ext || (/^data\:|^blob\:|\?/.test(url) || skipExt ? '' : '.js'));
                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                }

                return config.urlArgs && !/^blob\:/.test(url) ?
                       url + config.urlArgs(moduleName, url) : url;
            },

            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function (id, url) {
                req.load(context, id, url);
            },

            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function (name, callback, args, exports) {
                return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function (evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === 'load' ||
                        (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;

                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function (evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    var parents = [];
                    eachProp(registry, function(value, key) {
                        if (key.indexOf('_@r') !== 0) {
                            each(value.depMaps, function(depMap) {
                                if (depMap.id === data.id) {
                                    parents.push(key);
                                    return true;
                                }
                            });
                        }
                    });
                    return onError(makeError('scripterror', 'Script error for "' + data.id +
                                             (parents.length ?
                                             '", needed by: ' + parents.join(', ') :
                                             '"'), evt, [data.id]));
                }
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function (deps, callback, errback, optional) {

        //Find the right context, use default
        var context, config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    };

    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function (config) {
        return req(config);
    };

    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) { fn(); };

    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!require) {
        require = req;
    }

    req.version = version;

    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    //Create default context.
    req({});

    //Exports some context-sensitive methods on global require.
    each([
        'toUrl',
        'undef',
        'defined',
        'specified'
    ], function (prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }

    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = defaultOnError;

    /**
     * Creates the node for the load command. Only used in browser envs.
     */
    req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        return node;
    };

    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function (context, moduleName, url) {
        var config = (context && context.config) || {},
            node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = req.createNode(config, moduleName, url);

            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName);

            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent &&
                    //Check if node.attachEvent is artificially added by custom script or
                    //natively supported by browser
                    //read https://github.com/requirejs/requirejs/issues/187
                    //if we can NOT find [native code] then it must NOT natively supported.
                    //in IE8, node.attachEvent does not have toString()
                    //Note the test for "[native code" with no closing brace, see:
                    //https://github.com/requirejs/requirejs/issues/273
                    !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                    !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;

                node.attachEvent('onreadystatechange', context.onScriptLoad);
                //It would be great to add an error handler here to catch
                //404s in IE9+. However, onreadystatechange will fire before
                //the error handler, so that does not help. If addEventListener
                //is used, then IE will fire error before load, but we cannot
                //use that pathway given the connect.microsoft.com issue
                //mentioned above about not doing the 'script execute,
                //then fire the script load event listener before execute
                //next script' that other browsers do.
                //Best hope: IE10 fixes the issues,
                //and then destroys all installs of IE 6-9.
                //node.attachEvent('onerror', context.onScriptError);
            } else {
                node.addEventListener('load', context.onScriptLoad, false);
                node.addEventListener('error', context.onScriptError, false);
            }
            node.src = url;

            //Calling onNodeCreated after all properties on the node have been
            //set, but before it is placed in the DOM.
            if (config.onNodeCreated) {
                config.onNodeCreated(node, config, moduleName, url);
            }

            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;

            return node;
        } else if (isWebWorker) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation is that a build has been done so
                //that only one script needs to be loaded anyway. This may need
                //to be reevaluated if other use cases become common.

                // Post a task to the event loop to work around a bug in WebKit
                // where the worker gets garbage-collected after calling
                // importScripts(): https://webkit.org/b/153317
                setTimeout(function() {}, 0);
                importScripts(url);

                //Account for anonymous modules
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError('importscripts',
                                'importScripts failed for ' +
                                    moduleName + ' at ' + url,
                                e,
                                [moduleName]));
            }
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
                return (interactiveScript = script);
            }
        });
        return interactiveScript;
    }

    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser && !cfg.skipDataMain) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }

            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                mainScript = dataMain;

                //Set final baseUrl if there is not already an explicit one,
                //but only do so if the data-main value is not a loader plugin
                //module ID.
                if (!cfg.baseUrl && mainScript.indexOf('!') === -1) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = mainScript.split('/');
                    mainScript = src.pop();
                    subPath = src.length ? src.join('/')  + '/' : './';

                    cfg.baseUrl = subPath;
                }

                //Strip off any trailing .js since mainScript is now
                //like a module name.
                mainScript = mainScript.replace(jsSuffixRegExp, '');

                //If mainScript is still a path, fall back to dataMain
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain;
                }

                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];

                return true;
            }
        });
    }

    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function (name, deps, callback) {
        var node, context;

        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps && isFunction(callback)) {
            deps = [];
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback
                    .toString()
                    .replace(commentRegExp, commentReplace)
                    .replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep);
                    });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        if (context) {
            context.defQueue.push([name, deps, callback]);
            context.defQueueMap[name] = true;
        } else {
            globalDefQueue.push([name, deps, callback]);
        }
    };

    define.amd = {
        jQuery: true
    };

    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
}(this, (typeof setTimeout === 'undefined' ? undefined : setTimeout)));
