<?php
if(isset($_POST['sub']))
{
    	// Include the PHPMailer classes
	// If these are located somewhere else, simply change the path.
	require_once("class.phpmailer.php");
	require_once("class.smtp.php");
	//require_once("includes/PHPMailer/language/phpmailer.lang-en.php");
	
	// mostly the same variables as before
	// ($to_name & $from_name are new, $headers was omitted) 
	$to_name = $_POST['Tname'];
	$to = $_POST['Temail'];
	$subject = $_POST['subj'].strftime("%T", time());
	$message = $_POST['body'];
	$message = wordwrap($message,70);
	$from_name = $_POST['Fname'];
	$from =$_POST['Femail'];
	
	// PHPMailer's Object-oriented approach
	$mail = new PHPMailer();
	
	// Can use SMTP
	// comment out this section and it will use PHP mail() instead
	$mail->IsSMTP();
	$mail->Host     = "smtp.gmail.com";
	$mail->Port     = 25;
	$mail->SMTPAuth = true;
	$mail->Username = $_POST['Femail'];
	$mail->Password = $_POST['Fpass'];
	
	// Could assign strings directly to these, I only used the 
	// former variables to illustrate how similar the two approaches are.
	$mail->FromName = $from_name;
	$mail->From     = $from;
	$mail->AddAddress($to, $to_name);
	$mail->Subject  = $subject;
	$mail->Body     = $message;
	
	$result = $mail->Send();
	echo $result ? 'Sent' : 'Error';
}
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>Frome Name</title>
</head>

<body>

<form method="post">

<table>
	<tr>
		<td style="width: 117px"><label id="Label1">Frome Name:</label></td>
		<td style="width: 29px"><input name="Fname" style="width: 239px" type="text" /></td>
	</tr>
	<tr>
		<td style="width: 117px"><label id="Label1">Frome E-mail:</label></td>
		<td style="width: 29px"><input name="Femail" style="width: 239px" type="text" /></td>
	</tr>
	<tr>
		<td style="width: 117px"><label id="Label1">Frome Password:</label></td>
		<td style="width: 29px"><input name="Fpass" style="width: 239px" type="password" /></td>
	</tr>

	<tr>
		<td style="width: 117px"><label id="Label1">To name:</label></td>
		<td style="width: 29px"><input name="Tname" style="width: 239px" type="text" /></td>
	</tr>
	<tr>
		<td style="width: 117px"><label id="Label1">To E-mail:</label></td>
		<td style="width: 29px"><input name="Temail" style="width: 239px" type="text" /></td>
	</tr>
	<tr>
		<td style="width: 117px"><label id="Label1">Subject:</label></td>
		<td style="width: 29px"><input name="subj" style="width: 239px" type="text" /></td>
	</tr>
	<tr>
		<td style="width: 117px"><label id="Label1">Body:</label></td>
		<td style="width: 29px"><input name="sub" type="submit" value="SEND" /> </td>
	</tr>
	<tr>
		<td colspan="2">
		<textarea name="body" style="width: 376px; height: 277px"></textarea></td>
		<td>&nbsp;</td>
	</tr>
</table>

</body>

</html>
