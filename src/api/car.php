<?php
	$name = isset($_GET["name"])?$_GET["name"]:null;
	$goodsid = isset($_GET["goodsid"])?$_GET["goodsid"]:null;
	$register = isset($_GET["register"])?$_GET["register"]:null;
	$num = isset($_GET["num"])?$_GET["num"]:null;
	$alloprice = isset($_GET["alloprice"])?$_GET["alloprice"]:null;
	
	$servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "rucishenghuo";
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        var_dump($conn->connect_error);
    }
    $conn->set_charset('utf8');
    
    if($register == "true"){
    	//查询数据
    	$res3 = $conn -> query('select * from goodscar where name = '.$name.' and goodsid='.$goodsid);
    	if($res3->num_rows > 0){
    		$res3 = $conn -> query('update goodscar set num = '.$num.' , alloprice = '.$alloprice.' where name = '.$name.' and goodsid = '.$goodsid.'');
    		$res3 = $conn -> query('select * from goodscar where name = '.$name);
	    	if($res3->num_rows > 0){
	    		$content3 = $res3->fetch_all(MYSQLI_ASSOC);
				$content3 = json_encode($content3,JSON_UNESCAPED_UNICODE);
				echo $content3;
			}else{
				echo "无";
			}
		}else{
			echo "无";
		}
    }else if($register == "false"){
    	//查询数据
    	$res3 = $conn -> query('select * from goodscar where name = '.$name.' and goodsid='.$goodsid);
    	if($res3->num_rows > 0){
    		$res3 = $conn -> query('delete from goodscar where name = '.$name.' and goodsid='.$goodsid);
    		$res3 = $conn -> query('select * from goodscar where name = '.$name);
	    	if($res3->num_rows > 0){
	    		$content3 = $res3->fetch_all(MYSQLI_ASSOC);
				$content3 = json_encode($content3,JSON_UNESCAPED_UNICODE);
				echo $content3;
			}else{
				echo "无";
			}
		}else{
			echo "无";
		}
    }else{
    	//查询数据
    	$res3 = $conn -> query('select * from goodscar where name = '.$name);
    	if($res3->num_rows > 0){
	    	$content3 = $res3->fetch_all(MYSQLI_ASSOC);
			$content3 = json_encode($content3,JSON_UNESCAPED_UNICODE);
			echo $content3;
		}else{
			echo "无";
		}
    }
    
    
    
    
    
    $res3->close();
    $conn->close();
?>