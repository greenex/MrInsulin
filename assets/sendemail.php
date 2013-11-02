<?php
require_once("PHPMailer/class.phpmailer.php");
require_once("PHPMailer/class.smtp.php");
require_once("functions.php");
 
 //$msg="Name : ".$_POST['name']."\n E-Mail: ".$_POST['email']."\n Phone: ".$_POST['phone']."\n Content:\n ".$_POST['msg'];
 sendEmail("this is test msg :P");
//echo $_POST['name']." ".$_POST['email']." ".$_POST['phone']." ".$_POST['msg'];
?>