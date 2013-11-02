// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
// Cordova is ready
//

function onDeviceReady() {
	db.transaction(checkuser, errorCB);
	//db.transaction(checkuser, errorCB, successCB);
}

function testemail() {
	window.plugins.emailComposer.showEmailComposerWithCallback(null, "this is for khader", "<table><tr><th>Name</th><th>email</th></tr><tr><td>Khader</td><td><b>mkhader88</b></td></tr></table>", ["mkhader88@gmail.com"], [], [], true, []);
}

function addinfo() {
	db.transaction(populateDB, errorCB);
	//db.transaction(populateDB, errorCB, successCB);
}

// Populate the database
//

function addsize() {

	db.transaction(addsizedb, errorCB);
}

function addsizedb(tx) {
	//alert($("#texttime").val());
	if ($("#textsize").val() == "" || $("#texttime").val() == "" || $("#cominnts").val() == "") {
		alert("الرجاء ادخال جميع البيانات المطلوبة");
	} else {
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
		today = mm + '/' + dd + '/' + yyyy;
		var datasize=parseInt($("#textsize").val());
		tx.executeSql('INSERT INTO insulin_sizes (size,time,info,sent,date) VALUES ("' + $("#textsize").val() + '","' + $("#texttime").val() + '","' + $("#cominnts").val() + '","0","' + today + '")');
		view_size();
		alert("تم ادخال البيانات بنجاح");
		if(datasize>220){
			alert("نسبة السكر مرتفعة");
		}
		if(datasize<80){
			alert("نسبة السكر منخفضة");
		}

	}
}

function populateDB(tx) {
	//alert($("#name").val());
	//alert($("#name").val()+" "+ $("#age").val()+" "+ $("#weight").val()+" "+$("#length").val()+" "+$("#email").val()+" "+$("#dr_email").val()+" "+$("#pass").val());

	if ($("#name").val() == "" || $("#age").val() == "" || $("#weight").val() == "" || $("#length").val() == "" || $("#email").val() == "" || $("#dr_email").val() == "" || $("#pass").val() == "") {
		alert("الرجاء ادخال جميع البيانات المطلوبة");
	} else {
		tx.executeSql('CREATE TABLE IF NOT EXISTS insulin_sizes (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT , size TEXT , time TEXT , info TEXT , sent TEX, date TEXT)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS user_info (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT , name TEXT , age TEXT , length TEXT , weight TEXT , email TEXT , dr_email TEXT , password TEXT)');
		tx.executeSql('INSERT INTO user_info (name,age,weight,length,email,dr_email,password) VALUES ("' + $("#name").val() + '","' + $("#age").val() + '","' + $("#weight").val() + '","' + $("#length").val() + '","' + $("#email").val() + '","' + $("#dr_email").val() + '","' + $("#pass").val() + '")');
		alert("تم ادخال البيانات بنجاح");
		$("#info").hide();
		$("#icons").show();
	}
}

function checkuser(tx) {
	//alert("check user!");
	//tx.executeSql('DROP TABLE IF EXISTS user_info;');
	//tx.executeSql('DROP TABLE IF EXISTS insulin_sizes;');
	tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='user_info'", [], function(tx, result) {
		if (result.rows.length == 0) {
			//	alert("not excet");
			$("#info").show();
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
	db.transaction(queryDB, errorCB);
}

function runadd() {
	//alert("rub add!");
	db.transaction(addrow, errorCB);
}

function queryDB(tx) {
	//	alert("select data!");
	tx.executeSql('SELECT * FROM user_info', [], querySuccess, errorCB);
}

function view_size() {
	db.transaction(getsizes, errorCB);
}

function getsizes(tx) {
	//alert("select data!");

	tx.executeSql('SELECT * FROM insulin_sizes', [], querysizes, errorCB);

}

function deletesize (id) {
  var result = confirm("هل انت  متأكد ؟");
				if (result == true) {

					$('#size'+id).remove();

				}
}

function querysizes(tx, result) {
	//alert("goo");
	$('#viewallsizes li').remove();
	$('#texttime').empty();
	var myitems = new Array();
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
		$('#viewallsizes').append('<li id="size'+ result.rows.item(i).id +'"><a href="#" data-icon="delete"><table width="100%"><tr><td><h3>' + result.rows.item(i).date +'</h3></td><td><h3>'+timedata+ '</h3></td><td><a href="javascript:deletesize('+ result.rows.item(i).id +');"  data-role="button" data-icon="delete" data-iconpos="notext">Delete</a></td></tr><tr><td colspan="3"><h4>' + result.rows.item(i).info + '</h4></td></tr></table></a></li>');

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
		fruits[i]
	}
	$("#viewallsizes").trigger('create');
	$('#viewallsizes').listview('refresh');
	$('#texttime').append('<option value="7">وقت اخر</option>');
	$("#texttime").trigger('create');
	$('#texttime').content('refresh');

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
