<?php
    $id = isset($_GET["id"])?$_GET["id"]:null;

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "rucishenghuo";
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        var_dump($conn->connect_error);
    }
    $conn->set_charset('utf8');
 	//查询商品
    $res2 = $conn -> query('select * from goodslist where id='.$id);
    if($res2->num_rows > 0){
        $content2 = $res2->fetch_all(MYSQLI_ASSOC);
        $content2 = json_encode($content2,JSON_UNESCAPED_UNICODE);
        echo $content2;
    }else{ 
        echo "没有满足条件的数据";
    }
    

    $res2->close();
    $conn->close();
?>