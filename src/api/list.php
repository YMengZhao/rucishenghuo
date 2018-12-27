<?php
    $id = isset($_GET["id"])?$_GET["id"]:null;
	$qty = isset($_GET["qty"])?$_GET["qty"]:20;
	$currentPage = isset($_GET["currentPage"])?$_GET["currentPage"]:1;
	$jiage = isset($_GET["jiage"])?$_GET["jiage"]:null;
	$xiaoliang= isset($_GET["xiaoliang"])?$_GET["xiaoliang"]:null;
	$renqi= isset($_GET["renqi"])?$_GET["renqi"]:null;
	$shijian= isset($_GET["shijian"])?$_GET["shijian"]:null;
	
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'rucishenghuo';
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        var_dump($conn->connect_error);
    }
    $conn->set_charset('utf8');
    
	
    $res2 = $conn -> query('select * from goodslist where id');
    if($res2->num_rows > 0){
		if($jiage == "true"){
			$res2 = $conn -> query('select * from goodslist order by oPrice desc');
		}else if($jiage == "false"){
			$res2 = $conn -> query('select * from goodslist order by oPrice asc');
		}else if($xiaoliang == "true"){
			$res2 = $conn -> query('select * from goodslist order by sales desc');
		}else if($xiaoliang == "false"){
			$res2 = $conn -> query('select * from goodslist order by sales asc');
		}else if($renqi == "true"){
			$res2 = $conn -> query('select * from goodslist order by hot desc');
		}else if($renqi == "false"){
			$res2 = $conn -> query('select * from goodslist order by hot asc');
		}else if($shijian == "true"){
			$res2 = $conn -> query('select * from goodslist order by settime desc');
		}else if($shijian == "false"){
			$res2 = $conn -> query('select * from goodslist order by settime asc');
		}else{
			$res2 = $conn -> query('select * from goodslist order by id asc');
		}
		
		
		
        $content2 = $res2->fetch_all(MYSQLI_ASSOC);   
		$len = count($content2);
		$data = array_slice($content2,($currentPage-1)*$qty,$qty);
        
        $res = array(
	        "data" => $data,
	        "len" => $len,
	        "qty" => $qty,
	        "currentPage" => $currentPage
    	);
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
    }else{ 
        echo "没有满足条件的数据";
    }
    $res2->close();
    $conn->close();
?>