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
        if($register){
            $respass = $conn->query('select pass from user where name="'.$name.'"');
            $content2 = $respass->fetch_all(MYSQLI_ASSOC);
            foreach($content2 as $key => $val1){
                foreach($val1 as $key => $val){
                    if($val == $pass){
                        echo "正确";
                    }else{
                        echo "错误";
                    }
                }
            }
        }
    }else{
        echo "账号错误";
    }
    $res->close();
    $conn->close();
?>