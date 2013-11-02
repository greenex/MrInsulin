<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
    "http://www.w3.org/TR/html4/strict.dtd"
    >
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
    
       <link rel="stylesheet" type="text/css" href="upload_style.css" /> 
    <link rel="stylesheet" type="text/css" href="css/msg.css" />
    <link rel="stylesheet" type="text/css" href="css/default_<?= $_SESSION['language']?>.css" />
    <link rel="stylesheet" type="text/css" href="css/custom.css" /> 
     
    
    <script language="JavaScript" type="text/javascript" src="cbrte/html2xhtml.min.js"></script>
    <script language="JavaScript" type="text/javascript" src="cbrte/richtext_compressed.js"></script>
    <title><?= $cpanel_title?></title>
    

</head>
<body>
<div class='page'>
    <div class='header'>
        <h2 align='center'><?= $cpanel_title?></h2>
        <?= $main_page_link?>
    </div>
    <div class='container'>
    <div class='menu' <?= $tag_menu?>>
        <ul>
	    <?php
	    if(!empty($_SESSION['admin'])){
		
		if ($_SESSION['language']=="en"){
	    echo "
	    <li><a href='index.php'>Home</a></li>
	    <li> <a href='add_page.php'>Add Page</a></li>
	     <li><a href='view_pages.php'>View pages</a></li>
	     <li><a href='add_article.php'>Add Announcment</a></li>
	     <li><a href='view_articles.php'>View Announcments</a></li>
	     <li><a href='add_news.php'>Add News</a></li>
	     <li><a href='view_news.php'>View News</a></li>
	     <li><a href='add_banner_photo.php'>Banner Photos</a></li>
	    <li><a href='register.php'>Add Admin</a></li>
	    <li><a href='view_admins.php'>View Admins</a></li>
	   <li><a href='settings.php'>Settings</a></li>
	    <li><a href='help.php'>Help</a></li>
	    <li><a href='logout.php'>Logout</a></li>";
		}elseif($_SESSION['language']=="ar"){
		 echo "
		 <a href='index.php'>الرئيسية</a></li>
	    <li> <a href='add_page.php'>اضافة صفحة</a></li>
	     <li><a href='view_pages.php'>عرض الصفحات</a></li>
	     <li><a href='add_article.php'>اضافة اعلان</a></li>
	     <li><a href='view_articles.php'>عرض الاعلانات</a></li>
	     <li><a href='add_news.php'>اضافة خبر</a></li>
	     <li><a href='view_news.php'>عرض الاخبار</a></li>
	     <li><a href='add_banner_photo.php'>صور البانر</a></li>
	    <li><a href='register.php'>اضافة مشرف</a></li>
	    <li><a href='view_admins.php'>عرض المشرفين</a></li>
	   <li><a href='settings.php'>إعدادات</a></li>
	    <li><a href='help.php'>مساعدة</a></li>
	    <li><a href='logout.php'>تسجيل الخروج</a></li>";  
		    
		}
	     if ($_SESSION['language']=="ar"){
		echo "<li><a href='?lan=en'>English</a></li>";
		}elseif($_SESSION['language']=="en"){
		echo "<li><a href='?lan=ar'>عربي</a></li>";    
		}
		
	    }
	    ?>
	    
        </ul>
    </div>
    <div class="content">
