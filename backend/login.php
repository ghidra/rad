<?php
if (!isset($_SESSION)) {
	session_start();
}
class login{

	var $logged_in = false;
	var $errMsg = '';
	var $mysql;
	var $user_table = '';

	public function __construct($mysql,$post){

		$this->mysql=$mysql;
		$this->user_table = $mysql->user_table;

		if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] == false)
	      	$this->check_post_data($post);
	    else
	    	$logged_in = true;
		
	}

	private function check_post_data($post){
		if (isset($post['txtUserid'])) {
			$check_to = $this->mysql->get_user_password($this->user_table,$post['txtUserid']);//get the user data
			if($check_to!='denied'){//we are a go, user exists
				$passwordhashed = sha1($post['txtUserpw']);
				if ($passwordhashed === $check_to) {
		        	$_SESSION["logged_in"] = true;
		        	$_SESSION["user"] = $post['txtUserid'];//this is here so I can
		        	$_SESSION["user_id"] = $this->mysql->user_id;
		        	$this->logged_in = true;
		    	} else {
		        	$this->errMsg = 'wrong password';
		    	} 	
			}else{
				$this->errMsg = 'user does not exist';
			}     
		} 
		//------if we are making a new user
		if(isset($post['setuser'])){
			if ($post['setpw1'] === $post['setpw2'] && $post['setpw1'] != '') {//check the password so that it is valid
				$this->mysql->create_user($this->user_table,$post['setuser'],$post['setpw1'],1);
			}else{
				$this->errMsg='something went wrong, with the password';
			}
		}
	}

	public function get_login_page(){
		$page='';
		$setup=$this->mysql->table_exists($this->user_table);

		$empty=true;
		if($setup){
			$empty = $this->mysql->table_is_empty($this->user_table);
		}
		
		if($empty){//if we have not been set up before, fill out the nessisary information to proceed
			///make 3 fields, one user name, 2 passwords
			$page.='<div class="login_form">
 			<form action="" method="post" name="login_form_new_user" id="login_form_new_user">
 			<input name="setuser" type="text" id="setuser" value="" placeholder="user name" class="login_input">
 			<input name="setpw1" type="password" id="setpw1" value="" placeholder="password" class="login_input">
 			<input name="setpw2" type="password" id="setpw2" value="" placeholder="confirm password" class="login_input">
 			<input type="button" name="Submit" value="Submit" onclick="process_login(\'login_form_new_user\')">
 			</form>
 			</div>';
		}else{
			$page.='<div class="login_form">
 			<form action="" method="post" name="login_form" id="login_form">
 			<input name="txtUserid" type="text" id="txtUserid" value="" placeholder="user name" class="login_input">
 			<input name="txtUserpw" type="password" id="txtUserpw" value="" placeholder="password" class="login_input">
 			<input type="button" name="Submit" value="Submit" onclick="process_login(\'login_form\')">
 			</form>
 			</div>';

 			// $page.='<div class="login_form">
 			// register new user:
 			// <form action="" method="post" name="login_form_new_user" id="login_form_new_user">
 			// <input name="setuser" type="text" id="setuser" value="" placeholder="user name" class="login_input">
 			// <input name="setpw1" type="password" id="setpw1" value="" placeholder="password" class="login_input">
 			// <input name="setpw2" type="password" id="setpw2" value="" placeholder="confirm password" class="login_input">
 			// <input type="button" name="Submit" value="Submit" onclick="process_login(\'login_form_new_user\')">
 			// </form>
 			// </div>';
		}
		return $page;
	}
}

class logout{
	public function __construct(){
		//session_start();
		//$_SESSION['logged_in'] = false;
		$_SESSION = array();
		session_destroy();
	}
}

?>