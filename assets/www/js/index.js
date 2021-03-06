// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
// Cordova is ready
//
var detetedid = 0;
var msgtextdata = '';
var dr_email = '';
var detetedalarmid = 0;
var editalarmid = 0;
hostname = "naemhd.webfactional.com";
function onDeviceReady() {
	db.transaction(checkuser);
	//db.transaction(checkuser , successCB);
}

function testemail() {
	window.plugins.emailComposer.showEmailComposerWithCallback(null, "this is for khader", "<table><tr><th>Name</th><th>email</th></tr><tr><td>Khader</td><td><b>mkhader88</b></td></tr></table>", ["mkhader88@gmail.com"], [], [], true, []);
}

function addinfo() {
	db.transaction(populateDB);
	//db.transaction(populateDB , successCB);
}

// Populate the database
//
function senddata() {

	db.transaction(senddatadb);
}

function senddatadb(tx) {
	tx.executeSql('SELECT * FROM user_info', [], getuserinfo );
}

function getuserinfo(tx, result) {
	msgtextdata = '';
	msgtextdata += '<table dir="rtl" style="float:right;">';
	msgtextdata += '<tr><td>الاسم :</td><td>' + result.rows.item(0).name + '</td></tr>';
	msgtextdata += '<tr><td>العمر :</td><td>' + result.rows.item(0).age + '</td></tr>';
	msgtextdata += '<tr><td>الطول :</td><td>' + result.rows.item(0).length + '</td></tr>';
	msgtextdata += '<tr><td>الوزن :</td><td>' + result.rows.item(0).weight + '</td></tr>';
	msgtextdata += '<tr><td>البريد الالكتروني :</td><td>' + result.rows.item(0).email + '</td></tr>';
	msgtextdata += '<tr><td>الهاتف :</td><td>' + result.rows.item(0).phone + '</td></tr>';
	msgtextdata += '</table>';

	dr_email = result.rows.item(0).dr_email;
	if ($('#sendtype').val() == '1') {
		tx.executeSql('SELECT * FROM insulin_sizes', [], querysend );
	} else {
		tx.executeSql('SELECT * FROM insulin_sizes where sent=\'0\'', [], querysend );
	}
}

function get_info() {

	db.transaction(get_info_db );
}

function get_edited_alarm(id) {
	editalarmid = id;

	db.transaction(get_alarm_info_db );
}

function get_info_db(tx) {
	tx.executeSql('SELECT * FROM user_info', [], geteditinfo );
}

function get_alarm_info_db(tx) {
	tx.executeSql('SELECT * FROM alarm where id=' + editalarmid, [], geteditalarminfo );
}

function geteditinfo(tx, result) {

	$("#nameedit").val(result.rows.item(0).name);
	$("#ageedit").val(result.rows.item(0).age);
	$("#weightedit").val(result.rows.item(0).length);
	$("#lengthedit").val(result.rows.item(0).weight);
	$("#emailedit").val(result.rows.item(0).email);
	$("#passedit").val(result.rows.item(0).phone);
	$("#dr_emailedit").val(result.rows.item(0).dr_email);

}

function geteditalarminfo(tx, result) {
	
	$("#subtexteditoption").html(result.rows.item(0).note);
	
	$("#subtextedit").trigger('create');
	$("#subtexteditoption").trigger('create');
	$("#textinput4edit").val(result.rows.item(0).time);

}

function updatesentdata(tx) {
	tx.executeSql('UPDATE insulin_sizes SET `sent`=\'1\' where `sent`=\'0\'');
}

function querysend(tx, result) {
	var sentemail = false;
	var myitems = new Array();
	msgtextdata += '<table width="100%" border="1"><tr><th><b>التاريخ </b></th><th><b>الوقت </b></th><th><b>القياس </b></th><th><b>ملاحضة</b></th></tr>';
	for (var i = 0; i < result.rows.length; i++) {
		var timedata = '';
		if (result.rows.item(i).time == 1) {
			timedata = 'قبل الافطار ';
		} else if (result.rows.item(i).time == 2) {
			timedata = 'بعد الافطار ';
		} else if (result.rows.item(i).time == 3) {
			timedata = 'قبل الغداء ';
		} else if (result.rows.item(i).time == 4) {
			timedata = 'بعد الغداء ';
		} else if (result.rows.item(i).time == 5) {
			timedata = 'قبل العشاء ';
		} else if (result.rows.item(i).time == 6) {
			timedata = 'بعد العشاء ';
		} else {
			timedata = 'وقت اخر ';
		}
		msgtextdata += '<tr><td><h3>' + result.rows.item(i).date + '</h3></td><td><h3>' + timedata + '</h3></td><td><h3>' + result.rows.item(i).size + '</h3></td><td>' + result.rows.item(i).info + '</td></tr>';
		//window.plugins.emailComposer.showEmailComposerWithCallback(null, "Mr.Insulin",textdata, ["mkhader88@gmail.com"], [], [], true, []);

		//alert(result.rows.item(i).time);
		//s += "<li><a href='edit.html?id=" + results.rows.item(i).id + "'>" + results.rows.item(i).title + "</a></li>";
	}
	msgtextdata += '</table>';
	avilable_size();
	if (result.rows.length > 0) {
		jQuery.ajax({
			type : "POST",
			url : "http://" + hostname + "/sendemail.php",
			data : {
				msg : msgtextdata,
				dremail : dr_email

			},
			error : function(request, status, error) {
				alert("لا يوجد اتصال إنترنت");
			}
		}).done(function(msg) {
			if (msg == 1) {
				alert("تم ارسال البريد الالكتروني");
				db.transaction(updatesentdata );
			} else
				alert("لم يتم الارسال");
		});

	} else {
		alert("لا يوجد بيانات جديدة للارسال");
	}

}

function addsize() {

	db.transaction(addsizedb );
}

function get_date() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	//January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	return mm + '/' + dd + '/' + yyyy;
}

function addalarm() {

	db.transaction(addalarmdb );
}

function editalarm() {

	db.transaction(editalarmdb );
}

function editalarmdb(tx) {
	//alert($("#texttime").val());
	if ($("#subtextedit").val() == "" || $("#textinput4edit").val() == "") {
		alert("الرجاء ادخال جميع البيانات المطلوبة");
	} else {
		var text      = $("#subtextedit").val();
		var dateSplit = $("#textinput4edit").val().split(':');
		var date      = new Date();
		date.setHours(dateSplit[0],dateSplit[1]);
		
		tx.executeSql('update alarm set note="' + $("#subtextedit").val() + '",time="' + $("#textinput4edit").val() + '" where id=' + editalarmid);
		
		plugins.localNotification.add({
			date : date,
			message : text,
			ticker : "تذكير سيد انسولين",
			repeatDaily : true,
			id : editalarmid
		});
		
		view_alarm();
		alert("تم تعديل البيانات بنجاح");
		
		

	}
}

function addalarmdb(tx) {
	//alert($("#texttime").val());
	if ($("#subtext").val() == "" || $("#textinput4").val() == "") {
		alert("الرجاء ادخال جميع البيانات المطلوبة");
	} else {
		//tx.executeSql('INSERT INTO alarm (note,time) VALUES ("' + $("#subtext").val() + '","' + $("#textinput4").val() + '")');
		var text      = $("#subtext").val();
		var dateSplit = $("#textinput4").val().split(':');
		var date      = new Date();
		date.setHours(dateSplit[0],dateSplit[1]);
		
		tx.executeSql(
            'INSERT INTO alarm (note,time) VALUES (?,?)',
            [$("#subtext").val(),$("#textinput4").val()],
            function(tx, results){
                plugins.localNotification.add({
	    			date : date,
	    			message : text,
	    			ticker : "تذكير سيد انسولين",
	    			repeatDaily : true,
	    			id : results.insertId
				});
            },
            errorCB
        );
		
		view_alarm();
		alert("تم ادخال البيانات بنجاح");
		
		$("#subtext").val('');
		$("#textinput4").val('');

	}
}

function addsizedb(tx) {
	//alert($("#texttime").val());
	var goo = true;
	var textcheck=$("#textsize").val();
	textcheck=textcheck.trim();
	if (textcheck == "" || $("#texttime").val() == "") {
		alert("الرجاء ادخال جميع البيانات المطلوبة");
		goo = false;
	}
	var passedit = $("#textsize").val();
	if (isNaN(passedit) && goo) {
		alert('الرجاء ادخال القياس بشكل صحيح');
		goo = false;
	}
	if (goo) {
		var result = confirm("هل انت  متأكد ؟ القياس  "+$("#textsize").val());
		if (result == true) {
			today = get_date();
			var datasize = parseInt($("#textsize").val());
			tx.executeSql('INSERT INTO insulin_sizes (size,time,info,sent,date) VALUES ("' + $("#textsize").val() + '","' + $("#texttime").val() + '","' + $("#cominnts").val() + '","0","' + today + '")');
			view_size();
			alert("تم ادخال البيانات بنجاح");
			$("#textsize").val('');
			$("#cominnts").val('');
			
				
			if (datasize >= 250) {
				$.mobile.changePage( "#sadfacebig", { transition: "pop", changeHash: true });
				playAudio('sad.mp3');
			}else if (datasize <= 80) {
				$.mobile.changePage( "#sadfaceless", { transition: "pop", changeHash: true });
				playAudio('sad.mp3');
			}else{
				$("#insulinface").empty();
				$.mobile.changePage( "#happyface", { transition: "pop", changeHash: true });
				playAudio('happy.mp3');
			}
			$("#insulinface").trigger('create');
		}
	}
}

function populateDB(tx) {
	//alert($("#name").val());
	//alert($("#name").val()+" "+ $("#age").val()+" "+ $("#weight").val()+" "+$("#length").val()+" "+$("#email").val()+" "+$("#dr_email").val()+" "+$("#pass").val());
	var goo = true;
	if ($("#name").val() == "" || $("#age").val() == "" || $("#weight").val() == "" || $("#length").val() == "" || $("#email").val() == "" || $("#pass").val() == "") {
		alert("الرجاء ادخال جميع البيانات المطلوبة");
		goo = false;
	}

	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if (!filter.test($("#email").val()) && goo) {
		alert('الرجاء ادخال بريد الكتروني صحيح');
		goo = false;
	}

	var age = $("#age").val();

	if (isNaN(age) && goo) {
		alert('الرجاء ادخال العمر بشكل صحيح');
		goo = false;
	}
	var weight = $("#weight").val();

	if (isNaN(weight) && goo) {
		alert('الرجاء ادخال الوزن بشكل صحيح');
		goo = false;
	}
	var length = $("#length").val();

	if (isNaN(length) && goo) {
		alert('الرجاء ادخال الطول بشكل صحيح');
		goo = false;
	}
	var passedit = $("#pass").val();
	if (isNaN(passedit) && goo) {
		alert('الرجاء ادخال المحمول بشكل صحيح');
		goo = false;
	}
	if ($("#dr_email").val() != "") {
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if (!filter.test($("#dr_email").val()) && goo) {
			alert('الرجاء ادخال بريد الكتروني للدكتور صحيح');
			goo = false;
		}
	}

	if (goo) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS alarm (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT , note TEXT , time TEXT)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS insulin_sizes (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT , size TEXT , time TEXT , info TEXT , sent TEXT, date TEXT)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS user_info (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT , name TEXT , age TEXT , length TEXT , weight TEXT , email TEXT , dr_email TEXT , phone TEXT)');
		tx.executeSql('INSERT INTO user_info (name,age,weight,length,email,dr_email,phone) VALUES ("' + $("#name").val() + '","' + $("#age").val() + '","' + $("#weight").val() + '","' + $("#length").val() + '","' + $("#email").val() + '","' + $("#dr_email").val() + '","' + $("#pass").val() + '")');
		alert("تم ادخال البيانات بنجاح");
		$("#info").hide();
		$("#icons").show();
	}
}
function view_form_info () {
	$('#home').css("background-image", "none");  
	$('#home').css("background-color", "#A9DDF1");  
  $("#welcome").hide();
  $("#info").show();
}
function editinfo() {

	db.transaction(editinfo_db );
}

function editinfo_db(tx) {
	//alert($("#name").val());
	//alert($("#name").val()+" "+ $("#age").val()+" "+ $("#weight").val()+" "+$("#length").val()+" "+$("#email").val()+" "+$("#dr_email").val()+" "+$("#pass").val());
	var goo = true;
	if ($("#nameedit").val() == "" || $("#ageedit").val() == "" || $("#weightedit").val() == "" || $("#lengthedit").val() == "" || $("#emailedit").val() == "" || $("#passedit").val() == "") {
		alert("الرجاء ادخال جميع البيانات المطلوبة");
		goo = false;
	}

	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if (!filter.test($("#emailedit").val()) && goo) {
		alert('الرجاء ادخال بريد الكتروني صحيح');
		goo = false;
	}

	var age = $("#ageedit").val();

	if (isNaN(age) && goo) {
		alert('الرجاء ادخال العمر بشكل صحيح');
		goo = false;
	}
	var weight = $("#weightedit").val();

	if (isNaN(weight) && goo) {
		alert('الرجاء ادخال الوزن بشكل صحيح');
		goo = false;
	}
	var length = $("#lengthedit").val();

	if (isNaN(length) && goo) {
		alert('الرجاء ادخال الطول بشكل صحيح');
		goo = false;
	}
	var passedit = $("#passedit").val();
	if (isNaN(passedit) && goo) {
		alert('الرجاء ادخال المحمول بشكل صحيح');
		goo = false;
	}

	if ($("#dr_emailedit").val() != "") {
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if (!filter.test($("#dr_emailedit").val()) && goo) {
			alert('الرجاء ادخال بريد الكتروني للدكتور صحيح');
			goo = false;
		}
	}
	if (goo) {
		tx.executeSql('update user_info set name="' + $("#nameedit").val() + '", age="' + $("#ageedit").val() + '", weight="' + $("#weightedit").val() + '", length="' + $("#lengthedit").val() + '", email="' + $("#emailedit").val() + '", dr_email="' + $("#dr_emailedit").val() + '", phone="' + $("#passedit").val() + '"');
		alert("تم تعديل البيانات بنجاح");
	}
}

function checkuser(tx) {
	//alert("check user!");
	//tx.executeSql('DROP TABLE IF EXISTS user_info;');
	//tx.executeSql('DROP TABLE IF EXISTS insulin_sizes;');
	tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='user_info'", [], function(tx, result) {
		if (result.rows.length == 0) {
			//	alert("not excet");
			$('#home').css("background-image", "url(images/bg.gif)");  
			$("#welcome").show();
		} else {
			$("#icons").show();

		}
	});
}

// Transaction error callback
//
function errorCB(tx, err) {
	alert("Error processing SQL: " + err);
}

// Transaction success callback
//
function successCB() {
	//alert("success!");
	db.transaction(queryDB );
}

function runadd() {
	//alert("rub add!");
	db.transaction(addrow );
}

function queryDB(tx) {
	//	alert("select data!");
	tx.executeSql('SELECT * FROM user_info', [], querySuccess );
}

function view_size() {
	db.transaction(getsizes );
}

function getsizes(tx) {
	//alert("select data!");

	tx.executeSql('SELECT * FROM insulin_sizes', [], querysizes );

}

function view_alarm() {
	db.transaction(getalarm );
}

function getalarm(tx) {
	//alert("select data!");

	tx.executeSql('SELECT * FROM alarm', [], queryalarm );

}

function avilable_size() {

	db.transaction(getavailablesizes );
}

function getavailablesizes(tx) {
	//alert("select data!");

	tx.executeSql("SELECT * FROM insulin_sizes where date='" + get_date() + "'", [], queryavailabesizes );

}

function queryavailabesizes(tx, result) {

	$('#texttime').empty();
	var myitems = new Array();
	for (var i = 0; i < result.rows.length; i++) {

		myitems.push(result.rows.item(i).time);
		//alert(result.rows.item(i).time);
		//s += "<li><a href='edit.html?id=" + results.rows.item(i).id + "'>" + results.rows.item(i).title + "</a></li>";
	}
	$('#texttime').append('<option value=""></option>');
	var fruits = ["قبل الافطار", "بعد الافطار ", "قبل الغداء", "بعد الغداء", "قبل العشاء ", "بعد العشاء"];
	//alert(myitems.length);
	for (var i = 0; i <= 5; i++) {
		var num = i + 1;
		if (myitems.indexOf(num + "") == -1) {
			//	alert(i);
			$('#texttime').append('<option value="' + num + '">' + fruits[i] + '</option>');
		} else {
			//alert(i);
			$('#texttime').append('<option value="' + num + '" disabled="true">' + fruits[i] + '</option>');
		}

	}

	$('#texttime').append('<option value="7">وقت اخر</option>');
	$("#texttime").trigger('create');
	$('#newsize').content('refresh');

}

function deletesize(id) {
	detetedid = id;
	var result = confirm("هل انت  متأكد ؟");
	if (result == true) {
		db.transaction(deletesizedb );
		$('#size' + id).remove();
		avilable_size();
	}
}

function deletealarm(id) {
	detetedalarmid = id;
	var result = confirm("هل انت  متأكد ؟");
	if (result == true) {
		db.transaction(deletealarmdb );
		$('#alarm' + id).remove();
		plugins.localNotification.cancel(id)
	}
}

function deleteallsizes(id) {

	var result = confirm("هل انت  متأكد ؟");
	if (result == true) {
		db.transaction(deleteallsizedb );
		$('#viewallsizes li').remove();
		avilable_size();
	}
}

function deleteallsizedb(tx) {

	tx.executeSql('Delete FROM insulin_sizes');
}

function deletesizedb(tx) {

	tx.executeSql('Delete FROM insulin_sizes where id=' + detetedid);
}

function deletealarmdb(tx) {

	tx.executeSql('Delete FROM alarm where id=' + detetedalarmid);
}

function queryalarm(tx, result) {
	//alert("goo");
	$('#viewallalarms li').remove();

	for (var i = 0; i < result.rows.length; i++) {

		$('#viewallalarms').append('<li id="alarm' + result.rows.item(i).id + '"><a href="#editalarmform" onclick="get_edited_alarm(' + result.rows.item(i).id + ')"><table width="100%"><tr><td><h2>' + result.rows.item(i).time + '</h2></td><td rowspan="2" style="float:left;"><a href="javascript:deletealarm(' + result.rows.item(i).id + ');"  data-role="button" data-icon="delete" data-iconpos="notext">Delete</a></td></tr><tr><td>' + result.rows.item(i).note + '</td></tr></table></a></li>');

	}

	$("#viewallalarms").trigger('create');
	$('#viewallalarms').listview('refresh');

}

function querysizes(tx, result) {
	//alert("goo");
	$('#viewallsizes li').remove();
	$('#texttime').empty();
	var myitems = new Array();
	$('#viewallsizes').append('<li><table width="100%"><tr><th style="padding-right:30px;"><b>التاريخ </b></th><th style="padding-right:28px;"><b>الوقت </b></th><th><b>القياس </b></th><th><b>حذف</b></th></tr></table></li>');
	for (var i = 0; i < result.rows.length; i++) {
		var timedata = '';
		if (result.rows.item(i).time == 1) {
			timedata = 'قبل الافطار ';
		} else if (result.rows.item(i).time == 2) {
			timedata = 'بعد الافطار ';
		} else if (result.rows.item(i).time == 3) {
			timedata = 'قبل الغداء ';
		} else if (result.rows.item(i).time == 4) {
			timedata = 'بعد الغداء ';
		} else if (result.rows.item(i).time == 5) {
			timedata = 'قبل العشاء ';
		} else if (result.rows.item(i).time == 6) {
			timedata = 'بعد العشاء ';
		} else {
			timedata = 'وقت اخر ';
		}
		$('#viewallsizes').append('<li id="size' + result.rows.item(i).id + '"><a href="#"><table width="100%"><tr><td><h3>' + result.rows.item(i).date + '</h3></td><td><h3>' + timedata + '</h3></td><td><h3>' + result.rows.item(i).size + '</h3></td><td><a href="javascript:deletesize(' + result.rows.item(i).id + ');"  data-role="button" data-icon="delete" data-iconpos="notext">Delete</a></td></tr><tr><td colspan="3"><h4>' + result.rows.item(i).info + '</h4></td></tr></table></a></li>');

		//alert(result.rows.item(i).time);
		//s += "<li><a href='edit.html?id=" + results.rows.item(i).id + "'>" + results.rows.item(i).title + "</a></li>";
	}
	avilable_size();
	$("#viewallsizes").trigger('create');
	$('#viewallsizes').listview('refresh');

}

function querySuccess(tx, result) {
	//alert("goo");
	$('#SoccerPlayerList').empty();
	for (var i = 0; i < result.rows.length; i++) {
		$('#SoccerPlayerList').append('<li><a href="#"><h3 class="ui-li-heading">' + result.rows.item(i).id + '</h3><p class="ui-li-desc"> ' + result.rows.item(i).name + '</p></a></li>');

		//s += "<li><a href='edit.html?id=" + results.rows.item(i).id + "'>" + results.rows.item(i).title + "</a></li>";
	}
	$('#SoccerPlayerList').listview();

}
