<?php

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

//session_start();
require_once 'mysql_link.php';
require_once 'backend/login.php';
$mysql = new mysql_link();
$login = new login($mysql,$_POST);

// foreach($_POST as $key=> $value){
// 	echo $value;//$_POST[$key];
// }
if(!$login->logged_in){
	echo $login->get_login_page();
}else{
	echo "logged in";
}

//$_SESSION['logged_in']=false;
echo $_SESSION['logged_in'];

?>