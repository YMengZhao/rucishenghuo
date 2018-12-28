<?php
    $name = isset($_POST["name"])?$_POST["name"]:null;
    $pass = isset($_POST["pass"])?$_POST["pass"]:null; 
    $register = isset($_POST["register"])?$_POST["register"]:null;
 
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'rucishenghuo';
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        var_dump($conn->connect_error);
    }

    $conn->set_charset('utf8');
    $res = $conn->query('select * from user where name="'.$name.'"');

    if($res->num_rows > 0){
        echo "已被注册";
    }else{
        if($register){
            $res = $conn->query('insert into user (name,pass) values ('.$name.','.$pass.')');
            if($res){
                echo "插入成功";
            }else{
                echo "插入失败";
            }
        }else{
            echo "可用";
        }
    }
    $res->close();
    $conn->close();
?>