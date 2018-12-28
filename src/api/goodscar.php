<?php
    $name = isset($_GET["name"])?$_GET["name"]:null;
	$num = isset($_GET["num"])?$_GET["num"]:null;
	$goodsname = isset($_GET["goodsname"])?$_GET["goodsname"]:null;
	$imgurl = isset($_GET["imgurl"])?$_GET["imgurl"]:null;
	$oPrice = isset($_GET["oPrice"])?$_GET["oPrice"]:null;
	$alloprice = isset($_GET["alloprice"])?$_GET["alloprice"]:null;
	$goodsid = isset($_GET["goodsid"])?$_GET["goodsid"]:null;
	$register = isset($_GET["register"])?$_GET["register"]:null;
		
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "rucishenghuo";
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        var_dump($conn->connect_error);
    }
    $conn->set_charset('utf8');
    
    //查询账号
    $res3 = $conn -> query('select * from goodscar where name = '.$name.' and goodsid='.$goodsid);
    //当有数据时加数量和总价，没有数据时插入数据
    if($res3->num_rows > 0){
    	if($register){
    		$res3 = $conn -> query('update goodscar set num = num + '.$num.' , alloprice = alloprice + '.$alloprice.' where name = '.$name.' and goodsid = '.$goodsid.'');
    		if($res3){
    			$res3 = $conn -> query('select * from goodscar where name='.$name);
                $content3 = $res3->fetch_all(MYSQLI_ASSOC);
				$content3 = json_encode($content3,JSON_UNESCAPED_UNICODE);
				echo $content3;
    		}else{
    			echo "失败";
    		}
    	}
    }else{
    	if($register){
    		$res3 = $conn->query('insert into goodscar (name,num,goodsname,imgurl,oPrice,alloprice,goodsid) values ('.$name.','.$num.',"'.$goodsname.'","'.$imgurl.'",'.$oPrice.','.$alloprice.','.$goodsid.')');
			if($res3){
                $res3 = $conn -> query('select * from goodscar where name='.$name);
                $content3 = $res3->fetch_all(MYSQLI_ASSOC);
				$content3 = json_encode($content3,JSON_UNESCAPED_UNICODE);
				echo $content3;
            }else{
                echo "失败";
            }
	   	}
    }
//  $res3->close();
    $conn->close();
?>