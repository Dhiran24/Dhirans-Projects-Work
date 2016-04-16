
// register customer 
function addperson()
{
 var position = JSON.stringify(allMousePos);
    author = prompt("Please type your name");

    $.ajax({
        type: 'post',
        url: 'http://localhost/folder/database.php', //<--Note http
        data: {author: author, position: position},
        success: function( data ) {
        console.log( data );
        }
    });
	
var Surname =	document.getElementById("Surname").value;
var name =document.getElementById("name").value;
var shortexplanationwhyyouscannedthatimage = document.getElementById("shortexplanationwhyyouscannedthatimage").value;
var qrscanned =document.getElementById("qrscanned").value; 


if (customerpassword === customerpasswordtest && validateRegis()==true)
{

var mquery="INSERT INTO `PersonalInfo`(`Surname`, `name`, `cell`,`shortexplanationwhyyouscannedthatimage`,`qrscanned`) VALUES ('"+Surname+"','"+name +"','"+cell+"','"+shortexplanationwhyyouscannedthatimage+"','"+qrscanned+"')";
var mquertype ="INSERT";
$.getJSON("http://www.mydigitalshop.co.za/service/ServiceProject2015/ServiceProject2014/Client.php?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  
  alert( "Customer inserted Successfully " + customername + data );
  

var mquery="INSERT INTO `qrscanner`(`username`, `passwords`) VALUES ('"+uname+"','"+customerpassword+"')";
 mquery = EncryptQuery(mquery);
var mquertype ="INSERT";
$.getJSON("http://www.mydigitalshop.co.za/service/ServiceProject2015/ServiceProject2014/Client.php?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  alert(data);
  });
  });
}

else
{
alert("Error please make sure all information is filled");
}

}
