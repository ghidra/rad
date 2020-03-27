<?php

require_once 'mysql.php';
require_once 'login.php';

function attemp_login($payload){
	$mysql = new mysql();
	$login = new login($mysql,$payload);

	if(!$login->logged_in)
	{
		return $mysql->errMsg . $login->errMsg . $login->get_login_page();
	}
	else
	{
		//get the user information

		//return html_logout_button();
		//return "LOG OUT???";
		return get_logout_page();
	}
}
if ( isset($_GET['q'])  )
{
	$q = $_GET['q'];

	$payload = new stdClass();

	if($q=='logout')
	{
		$logout = new logout();
		$payload->html = attemp_login($_GET);
		$payload->logged_in = false;
		echo json_encode($payload);
	}

	if($q=='login')	
	{
		if(isset($_SESSION['logged_in']))
		{
			$payload->html = get_logout_page();
			$payload->logged_in = true;
			echo json_encode($payload);
		}
		else
		{
			//echo attemp_login($_GET);//json_decode($_GET['payload'],true);
			$payload->html = attemp_login($_GET);
			$payload->logged_in = isset($_SESSION['logged_in']);
			echo json_encode($payload);
		}
	}
}
////passwords are send via post
if ( isset($_POST['q'])  )
{
	if($_POST['q']=='login')
	{
		$payload->html = attemp_login($_POST);
		$payload->logged_in = isset($_SESSION['logged_in']);
		echo json_encode($payload);
		//echo attemp_login($_POST);
	}
}
?>