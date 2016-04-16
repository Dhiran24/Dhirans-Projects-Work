// navigation go to login
function gologin()
{
$.ajax({url: "./index.html", success:function(result)
	{
		$("#content").html(result);
	}});
}

//navigation to go home
function gohome()
{
$.ajax({url: "./forms/home.html", success:function(result)
	{
		$("#content").html(result);
	}});
}

//navigation to go home
function registration()
{
$.ajax({url: "./forms/registration.html", success:function(result)
	{
		$("#content").html(result);
	}});
}

//navigation to go to view orders
function GotoVieworders()
{
	$.ajax({url: "./forms/ViewOrders.html", success:function(result)
	{
		$("#content").html(result);
	}});
}
//navigation to go make orders
function GotoMakeorders()
{
	$.ajax({url: "./forms/Makeorders.html", success:function(result)
	{
		$("#content").html(result);
	}});
}
//navigation to go to view products
function GotoViewproducts()
{
	$.ajax({url: "./forms/ViewProducts.html", success:function(result)
	{
		$("#content").html(result);
	}});
}
//navigation to google maps
function GotoViewMaps()
{
	$.ajax({url: "./forms/ViewMap.html", success:function(result)
	{
		$("#content").html(result);
	}});
}
//navigation to edit profile
function GotoEditprofile()
{
	$.ajax({url: "./forms/EditProfile.html", success:function(result)
	{
		$("#content").html(result);
	}});
}
//navigation to contacts us
function GotoContact()
{
	$.ajax({url: "./forms/ContactUs.html", success:function(result)
	{
		$("#content").html(result);
	}});
}


// login method
function Loginfunction ()
{
    var uname = document.getElementById("x").value;
    window.localStorage["uname"] = document.getElementById("x").value;
    
	var password = CryptoJS.SHA256(document.getElementById("y").value);
   
	var password = $.base64.encode( password );
   var typeofuser = "customer";
	 
    $.getJSON("http://linkwhereservicesarehostedonthephppage?method=Logins&jsoncallback=?", { USE: uname, PASS: password ,TYPE : typeofuser} )
   .done(function( data ) {
   
   if (data == 1)
   {
	
	alert ("Login Successful")
	$('.spinner').hide().empty();
	$.ajax({url: "./forms/home.html", success:function(result)
	{
		$("#content").html(result);
	}});
	
   }
   else
   {
   
    alert("Error please enter your username and password again ")
	$('.spinner').hide().empty();
   };
   });
}
// forgot passsword function 
function forgot()
{
var username= document.getElementById("userforgot").value;
if (validateforget()==true )
{
$('.spinner').hide().empty();
var mquery="SELECT `customeremail` FROM `customer` WHERE `customer`.`username` = '"+username+"'";
 mquery = EncryptQuery(mquery);
var mquertype ="SELECT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  var emails = JSON.parse(data);
var email = emails[0].customeremail;
var type ="customer";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=PassReset&jsoncallback=?", { USE:username,MAIL:email,TYPE:type} )    
  .done(function( data ) {
  $('.spinner').hide().empty();
  alert( "Data Loaded: " + data  );
  }); 
  });
 }
}


function ForgotPassword()
{
	$.ajax({url: "./forms/ForgotPassword.html", success:function(result)
	{
		$("#content").html(result);
	}});
	
}
// bing username 
function getuname()
{
var mquery="SELECT * FROM `customer` ORDER BY `username` DESC LIMIT 1";
 mquery = EncryptQuery(mquery);
var mquertype ="SELECT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  var user = JSON.parse(data);
  var username = document.getElementById("username");
  username.value= parseInt(user[0].username) + 1;	
 document.getElementById("username").readOnly = true;
 });
}
// register customer 
function registercustomer()
{
$('.spinner').hide().empty();
var uname =document.getElementById("username").value;
var customername =	document.getElementById("fullname").value;
var customersurname =	document.getElementById("surname").value;
var wholesale_retail_both =document.getElementById("wholesaleRetailboth").options[document.getElementById("wholesaleRetailboth").selectedIndex].value;
var customerpassword = CryptoJS.SHA256(document.getElementById("passwords").value);
var customerpassword = $.base64.encode( customerpassword );
var customerpasswordtest = CryptoJS.SHA256(document.getElementById("passwords1").value);
var customerpasswordtest = $.base64.encode( customerpasswordtest );
var customerlandline =document.getElementById("landline").value;
var customeraddress =document.getElementById("address").value;
var customercell =document.getElementById("cellnumber").value;
var customeremail =document.getElementById("email").value;
var customercordinateslatitude =document.getElementById("gpscordinateslatitude").value;
var customercordinateslongitude =	document.getElementById("gpscordinateslongitude").value;
  $('.spinner').hide().empty();

if (customerpassword === customerpasswordtest && validateRegis()==true)
{

var mquery="INSERT INTO `customer`(`username`, `customername`, `customerpassword`, `customersurname`, `customerlandline`, `customercordinateslatitude`, `customercordinateslongitude`, `orderid`, `customeraddress`, `customercell`, `customeremail`, `wholesale_retail_both`) VALUES ('"+uname+"','"+customername +"','"+customerpassword+"','"+customersurname +"','"+customerlandline+"','"+customercordinateslatitude+"','"+customercordinateslongitude+"',' ','"+customeraddress+"','"+customercell+"','"+customeremail+"','"+wholesale_retail_both+"')";
 mquery = EncryptQuery(mquery);
var mquertype ="INSERT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  
  alert( "Customer inserted Successfully " + customername);
  

var mquery="INSERT INTO `customer_login`(`username`, `passwords`) VALUES ('"+uname+"','"+customerpassword+"')";
 mquery = EncryptQuery(mquery);
var mquertype ="INSERT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  });
  });
//}
} 
else
{
alert("Error please make sure all information is filled");
}

}

// getting orders to fill in a in a details  
function ViewOrders()
{
var uname =window.localStorage["uname"]; 
var mquery="SELECT `customercell` FROM `customer` WHERE `customer`.`username` = '"+uname+"'";
 mquery = EncryptQuery(mquery);
var mquertype ="SELECT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  var cell = JSON.parse(data);
  var customercell = cell[0].customercell ;
    
 // the second method 
var mquery="SELECT * FROM `orders` WHERE `orders`.`customercell` = '"+customercell+"' ORDER BY `orderid` ASC";
 mquery = EncryptQuery(mquery);
var mquertype ="SELECT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  // orders array
  var orders = JSON.parse(data);
   

	// CustomerOrders select

  
  var mquery="SELECT * FROM `CustomerOrders` WHERE `CustomerOrders`.`username` = '"+uname+"' ORDER BY `orderid` ASC";
   mquery = EncryptQuery(mquery);
  var mquertype ="SELECT";
  $.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  // CustomerOrders array
  var CustomerOrders = JSON.parse(data);
		var txtOrders= "";
   var c=0;
   for (var a= 0; a < CustomerOrders.length; a++ )
  {
	var mquery="SELECT * FROM `OrderProducts` WHERE `OrderProducts`.`orderid` = '"+CustomerOrders[a].orderid+"' ORDER BY `orderid` ASC";
	mquery = EncryptQuery(mquery);
	var mquertype ="SELECT"; 
	$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
	.done(function( data ) {
	var OrderProducts = JSON.parse(data);
   
   for (var b= 0; b < OrderProducts.length; b++ )
	{ 
		txtOrders+= "<details><summary>Order ID: "+OrderProducts[b].orderid +"</summary><table><tr><th>Order Type :</th><td>"+orders[b].ordertype+"</td></tr><th>Order Description :</th><td>"+OrderProducts[b].description+"</td></tr><th>Status :</th><td>"+orders[c].status+"</td></tr><th>Order Date :</th><td>"+orders[c].orderdate+"</td></tr><th>Deliver By Date :</th><td>"+orders[c].deliverbydate+"</td></tr></table></details><br>";
		c++;			
	} 
	document.getElementById('ordercontent').innerHTML = txtOrders;
     });
	  $('.spinner').hide().empty();
  }
   });
    });
	});
}


// view products 
function ViewProducts()
{
 
var mquery="SELECT * FROM `products`ORDER BY `productsid` ";
 mquery = EncryptQuery(mquery);
var mquertype ="SELECT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  var products = JSON.parse(data);
  var txtContentProducts = "";
  $('.spinner').hide().empty();
 for (var i=0; i < products.length; i++)
  {
  txtContentProducts += "<details><summary>Product Id: "+products[i].productsid +"</summary><table><tr><th>Product Type :</th><td>"+products[i].producttype+"</td></tr><th>Product Price :</th><td>"+products[i].productprice+"</td></tr><th>Product Sold Per Weight :</th><td>"+products[i].productsoldperweight+"</td></tr><th>Product Grade :</th><td>"+products[i].productgrade+"</td></tr></table></details><br>";
  }
 
  
  document.getElementById('contents').innerHTML = txtContentProducts;
  });
}
// to fill the username and address and cell number of the user which is currently logged in
function bindingorderdetails()
{
var mquery="SELECT * FROM `orders` ORDER BY `orderid` DESC LIMIT 1";
 mquery = EncryptQuery(mquery);
var mquertype ="SELECT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
   $('.spinner').hide().empty();
  var Order = JSON.parse(data);
  var orderid = document.getElementById("orderid");
  orderid.value= parseInt(Order[0].orderid) + 1;	
   var orderid = document.getElementById("orderid").readOnly= true;
   // var val = intValue(document.getElementById("orderid"));
 //document.getElementById("orderid").readOnly = true;
var uname =window.localStorage["uname"]; 
var mquery="SELECT * FROM `customer` WHERE `customer`.`username` = '"+uname+"'";
 mquery = EncryptQuery(mquery);
var mquertype ="SELECT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
 var Customer = JSON.parse(data);
 $('.spinner').hide().empty();
	var customername = document.getElementById("fullname");
	customername.value= Customer[0].customername;
	document.getElementById("fullname").readOnly = true;
	var loyalty = document.getElementById("loyalty");
	loyalty.value= Customer[0].loyalty;
	document.getElementById("loyalty").readOnly = true;
	var cellnumber = document.getElementById("cellnum");
	cellnumber.value= Customer[0].customercell ;
	var address = document.getElementById("address");
	address.value= Customer[0].customeraddress ;
	// used to show if must show both retail or wolesale 
	var wholesale_retail_both = Customer[0].wholesale_retail_both;     
if(wholesale_retail_both === '3')     
   {    
	$('#ordertype').show();
    $('#ordertype1').show(); 
	$('#ordertype2').show();	
   } 
else if (wholesale_retail_both === '1') 
   {
	$('#ordertype').hide();  
    $('#ordertype1').hide();
	$('#ordertype2').hide();
	$('#productgrade').show();  
						$('#productgrade1').show();   
						$('#productgrade2').show();  
						$('#quantity2').show();
						$('#producttype1').show();
						$('#producttype').hide();
						$('#quantity').hide();
						$('#quantity1').hide(); 
						$('#producttype').hide();
   } 
else if (wholesale_retail_both === '2') 
    {
	$('#ordertype').hide();  
    $('#ordertype1').hide();
	$('#ordertype2').hide();
   } 
 });
 });
}

function calculatetotal()
{
var BagQuantity = 0;
var productsonhand1;
var value;
var value1;
var wholesale_retail_both = document.getElementById("ordertype").options[document.getElementById("ordertype").selectedIndex].value;
var producttype =document.getElementById("producttype").options[document.getElementById("producttype").selectedIndex].value;
var BagQuantity = document.getElementById("BagQuantity").value;
var productgrade =document.getElementById("productgrade").options[document.getElementById("productgrade").selectedIndex].value;

// used to calculate the total 
if( wholesale_retail_both =="Retail")
{
 quantity2 = 0;
var quantity = document.getElementById("quantity").options[document.getElementById("quantity").selectedIndex].value;
var quantity1 = document.getElementById("quantity1").options[document.getElementById("quantity1").selectedIndex].value;
}
else
if (wholesale_retail_both =="Wholesale")
{ 
var quantity2 = document.getElementById("quantity2").options[document.getElementById("quantity2").selectedIndex].value;
quantity1=0;
quantity=0;
}

if (producttype == "Coal" && quantity1=="70 KG")
{
var TotalPrice = document.getElementById("TotalPrice");
	TotalPrice.value= 115 * parseInt(BagQuantity);
	document.getElementById("TotalPrice").readOnly = true;
	 
}
else 
if (producttype == "Coal" && quantity1=="50 KG")
{
var TotalPrice = document.getElementById("TotalPrice");
	TotalPrice.value= 85 * parseInt(BagQuantity);
	document.getElementById("TotalPrice").readOnly = true;
}
else 
if (producttype == "Coal" && quantity1=="40 KG")
{
var TotalPrice = document.getElementById("TotalPrice");
	TotalPrice.value= 65 * parseInt(BagQuantity);
	document.getElementById("TotalPrice").readOnly = true;

}
else
if (producttype == "Anthracite" && quantity=="70 KG")
{ 
var TotalPrice = document.getElementById("TotalPrice");
	TotalPrice.value= 175 * parseInt(BagQuantity);
	document.getElementById("TotalPrice").readOnly = true;

}
else 
if (producttype == "Anthracite" && quantity=="65 KG")
{
var TotalPrice = document.getElementById("TotalPrice");
	TotalPrice.value= 163 * parseInt(BagQuantity);
	document.getElementById("TotalPrice").readOnly = true;

}
else 
if (producttype == "Anthracite" && quantity=="40 KG")
{
var TotalPrice = document.getElementById("TotalPrice");
	TotalPrice.value= 110 * parseInt(BagQuantity);
	document.getElementById("TotalPrice").readOnly = true;
	
}
else 
if (producttype == "Anthracite" && quantity=="20 KG")
{
var TotalPrice = document.getElementById("TotalPrice");
	TotalPrice.value= 65 * parseInt(BagQuantity);
	document.getElementById("TotalPrice").readOnly = true;

}
else 

if (productgrade == "A Grade" && quantity2=="1 Ton" )
{
var TotalPrice = document.getElementById("TotalPrice");
	TotalPrice.value= 950 * parseInt(BagQuantity);
	document.getElementById("TotalPrice").readOnly = true;

}
else 
if (productgrade == "B Grade" && quantity2=="1 Ton" )
{
var TotalPrice = document.getElementById("TotalPrice");
	TotalPrice.value= 850 * parseInt(BagQuantity);
	document.getElementById("TotalPrice").readOnly = true;
	
}
else 
if(productgrade === "C Grade" && quantity2==="1 Ton" )
{
var TotalPrice = document.getElementById("TotalPrice");
	TotalPrice.value= 750 * parseInt(BagQuantity);
	document.getElementById("TotalPrice").readOnly = true;
}
}
function updatecoalstock()
{
var mquery="SELECT * FROM `products`ORDER BY `productsid` ";
 mquery = EncryptQuery(mquery);
var mquertype ="SELECT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  var products = JSON.parse(data);
  var productquantityonhand =products[0].productquantityonhand;
  var productquantityneeded =products[0].productquantityneeded;
   var productquantityonhand1 =parseInt(productquantityonhand) - 581;
  var productquantityneeded1 =parseInt(productquantityneeded) + 581;
  var id = '1';
  var mquery="UPDATE `products` SET `productquantityonhand`='"+productquantityonhand1+"',`productquantityneeded`='"+productquantityneeded1+"' WHERE productsid ='"+id+"'";
 mquery = EncryptQuery(mquery);
var mquertype ="SELECT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {

  });
  });

}
// gets the current date 
function currentdate()
{

Date.prototype.yyyymmdd = function() {         
                                
        var yyyy = this.getFullYear().toString();                                    
        var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based         
        var dd  = this.getDate().toString();             
                            
        return yyyy + '/' + (mm[1]?mm:"0"+mm[0]) + '/' + (dd[1]?dd:"0"+dd[0]);
   };  

d = new Date();
var datenow = d.yyyymmdd();
var orderdate =	document.getElementById("orderdate");
	orderdate.value= datenow;
}
var subtotal = 0;
function addtocart()
{/*
var mquery="SELECT * FROM `OrderProducts` ORDER BY `orderid` DESC LIMIT 1";
var mquertype ="SELECT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  var Order = JSON.parse(data);
  var orderid = document.getElementById("orderid").value;
  orderid.value= Order[0].orderid ;
alert (Order[0].orderid);  
  });*/
var orderid = document.getElementById("orderid").value;
var producttype =document.getElementById("producttype").value;
var productgrade =document.getElementById("productgrade").value;
var quantity1 = document.getElementById("quantity1").options[document.getElementById("quantity1").selectedIndex].value;
var quantity = document.getElementById("quantity").options[document.getElementById("quantity").selectedIndex].value;
var BagQuantity = document.getElementById("BagQuantity").value;
var TotalPrice = document.getElementById("TotalPrice").value;
subtotal= parseInt(TotalPrice) + parseInt(subtotal); 
window.localStorage["subtotal"] = subtotal;
alert(subtotal);
var carton = document.getElementById("cart");
carton.value = carton.value +""+producttype + ", " +productgrade+ ", " + quantity + ", " + BagQuantity + " bags, " +"R" +TotalPrice + " ; ";

}

function confirmcart()
{
var orderid = document.getElementById("orderid").value;
var carton = document.getElementById("cart").value;
var productsid = " ";
var BagQuantity = " ";

var mquery="INSERT INTO `OrderProducts`(`orderid`, `productsid`,`quantity`,`description`) VALUES ('"+orderid+"','"+productsid+"','"+BagQuantity+"','"+carton+"')";
 mquery = EncryptQuery(mquery);
var mquertype ="INSERT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  alert (value);
  });
}
function Clearcart()
{
var carton = document.getElementById("cart");
	carton.value= " ";
}

function InsertOrder()
{
var uname =window.localStorage["uname"]; 
var mquery="SELECT * FROM `customer` WHERE `customer`.`username` = '"+uname+"'";
 mquery = EncryptQuery(mquery);
var mquertype ="SELECT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
	var Customer = JSON.parse(data);
	// used to show if must show both retail or wolesale 
	var wholesale_retail_both = Customer[0].wholesale_retail_both;     
	if (wholesale_retail_both === '1') 
   {
	var ordertype ="Wholesale";   
   }
 
    else if (wholesale_retail_both === '2') 
   {
	var ordertype ="Retail";  
   }
    orderid = document.getElementById("orderid").readOnly = "true";
var orderid =	document.getElementById("orderid").value;
 
var customername =document.getElementById("fullname").value;
var customeraddress =document.getElementById("address").value;
var customercell =document.getElementById("cellnum").value;
var producttype =document.getElementById("producttype").value;
var productgrade =document.getElementById("productgrade").value;
var quantity = document.getElementById("quantity1").options[document.getElementById("quantity1").selectedIndex].value;
var quantity = document.getElementById("quantity").options[document.getElementById("quantity").selectedIndex].value;
var BagQuantity = document.getElementById("BagQuantity").value;
var orderdate =	document.getElementById("orderdate").value;
var deliverbydate =	"2014-01-01";//document.getElementById("deliverbydate").value;
var TotalPrice = document.getElementById("TotalPrice").value;
var status = "pending";
var useloyality =  document.getElementById("loyalty1").checked;
var useloyality2 =  document.getElementById("loyalty2").checked;
var loyalty = document.getElementById("loyalty").value;
var useloyality =  document.getElementById("loyalty1").checked;
var useloyality2 =  document.getElementById("loyalty2").checked;
var loyalty = document.getElementById("loyalty").value;
if (useloyality==true)
{
// update the loyalty points 
var uname =window.localStorage["uname"]; 
var loyaltyifyes = parseInt(loyalty) / 100000;
var total= window.localStorage["subtotal"];
var discount = loyaltyifyes * parseInt(total);
alert("The discount you will be receiving is R" + discount);
var newloyality = 0;
var mquery = "UPDATE `customer` SET `loyalty`='"+newloyality+"' WHERE username ='"+uname+"'";
 mquery = EncryptQuery(mquery);
var mquertype ="UPDATE";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
.done(function( data ) {  
alert("Your loyalty point have been used ");
});
var mquery="INSERT INTO `crackhut_Massive_Dynamix`.`orders` ( `ordertype`, `status`, `customername`, `customeraddress`, `customercell`, `producttype`, `productgrade`, `orderdate`, `deliverbydate` ,`orderquantity` ,`BagsQuantity` ,`ordertotalprice` ) VALUES ( '"+ordertype +"','"+status +"','"+customername +"','"+customeraddress +"' ,'"+customercell +"','"+producttype +"' ,'"+productgrade +"','"+orderdate +"' ,'"+deliverbydate +"' ,'"+quantity +"' ,'"+BagQuantity +"' ,'"+TotalPrice +"')";
 mquery = EncryptQuery(mquery);
var mquertype ="INSERT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  $('.spinner').hide().empty();
  alert( "Order inserted Successfully ");
var mquery="INSERT INTO `CustomerOrders`(`orderid`, `username`) VALUES ('"+orderid+"','"+uname+"')";
 mquery = EncryptQuery(mquery);
var mquertype ="INSERT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  });
  });
}
else
{
var mquery="INSERT INTO `crackhut_Massive_Dynamix`.`orders` ( `ordertype`, `status`, `customername`, `customeraddress`, `customercell`, `producttype`, `productgrade`, `orderdate`, `deliverbydate` ,`orderquantity` ,`BagsQuantity` ,`ordertotalprice` ) VALUES ( '"+ordertype +"','"+status +"','"+customername +"','"+customeraddress +"' ,'"+customercell +"','"+producttype +"' ,'"+productgrade +"','"+orderdate +"' ,'"+deliverbydate +"' ,'"+quantity +"' ,'"+BagQuantity +"' ,'"+TotalPrice +"')";
 mquery = EncryptQuery(mquery);
var mquertype ="INSERT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  $('.spinner').hide().empty();
  alert( "Order inserted Successfully ");
  var uname =window.localStorage["uname"]; 
var mquery="INSERT INTO `CustomerOrders`(`orderid`, `username`) VALUES ('"+orderid+"','"+uname+"')";
 mquery = EncryptQuery(mquery);
var mquertype ="INSERT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  });
  });  
}
});
}

// view customer for binding 
function bindingCustomer()
{
var uname =window.localStorage["uname"].toString();
var mquery="SELECT  * FROM `customer` WHERE `customer`.`username` = '"+uname+"'";
 mquery = EncryptQuery(mquery);
var mquertype ="SELECT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  var Customer = JSON.parse(data);
  $('.spinner').hide().empty();
	var customername = document.getElementById("fullname");
	customername.value= Customer[0].customername;
	var surname = document.getElementById("surname");
	surname.value= Customer[0].customersurname ;
	var wholesale_retail_both = document.getElementById("wholesaleRetailboth").options[document.getElementById("wholesaleRetailboth").selectedIndex].value;
	wholesale_retail_both.value= Customer[0].wholesale_retail_both ;
	var passwords = document.getElementById("passwords");
	passwords.value= Customer[0].customerpassword ;
	var landline = document.getElementById("landline");
	landline.value= Customer[0].customerlandline ;
	var cellnumber = document.getElementById("cellnumber");
	cellnumber.value= Customer[0].customercell ;
	var address = document.getElementById("address");
	address.value= Customer[0].customeraddress ;
	var email = document.getElementById("email");
	email.value= Customer[0].customeremail ;
	var gpscordinateslatitude = document.getElementById("gpscordinateslatitude");
	gpscordinateslatitude.value= Customer[0].customercordinateslatitude ;
	document.getElementById("gpscordinateslatitude").readOnly = true;
	var gpscordinateslongitude = document.getElementById("gpscordinateslongitude");
	gpscordinateslongitude.value= Customer[0].customercordinateslongitude ;
	document.getElementById("gpscordinateslongitude").readOnly = true;
});		
}

function getlongandlatfromaddress ()
{

var address = document.getElementById("address").value;

$.getJSON("http://linkwhereservicesarehostedonthephppage?method=FetchAddressCo&jsoncallback=?", { ADD:address} )    
  .done(function( data ) {
   var gpscordinateslatitude = document.getElementById("gpscordinateslatitude");
	gpscordinateslatitude.value= data['Geometry'].Latitude ;
	var gpscordinateslongitude = document.getElementById("gpscordinateslongitude");
	gpscordinateslongitude.value= data['Geometry'].Longitude ;
  });
}

// check the passwords are the same 
function password ()
{
		$('#passwords1').show();
}

function passwordvalidate()
{
	if($('#passwords1').val() != $('#passwords').val())     
	{ 
		alert("Please make sure that you type the password correctly in both textboxes");	
	}
							
}


function updateCustomer()
{

var uname =window.localStorage["uname"].toString();
// uname is the primary key that a user uses to login 
var customername =	document.getElementById("fullname").value;
var customersurname =	document.getElementById("surname").value;
var wholesale_retail_both =document.getElementById("wholesaleRetailboth").options[document.getElementById("wholesaleRetailboth").selectedIndex].value;
var customerpassword = CryptoJS.SHA256(document.getElementById("passwords").value);
var customerpassword = $.base64.encode( customerpassword );
var customerpasswordtest = CryptoJS.SHA256(document.getElementById("passwords1").value);
var customerpasswordtest = $.base64.encode( customerpasswordtest );
var customerlandline =document.getElementById("landline").value;
var customeraddress =document.getElementById("address").value;
var customercell =document.getElementById("cellnumber").value;
var customeremail =document.getElementById("email").value;
var customercordinateslatitude =document.getElementById("gpscordinateslatitude").value;
var customercordinateslongitude =	document.getElementById("gpscordinateslongitude").value;

if (customerpassword === customerpasswordtest && validateRegis()==true)
{
var customerpasswordtest = CryptoJS.SHA256(document.getElementById("passwords1").value);
var customerpasswordtest = $.base64.encode( customerpasswordtest );
var mquery = "UPDATE `customer` SET `username`='"+uname+"',`customername`='"+customername+"',`customersurname`='"+customersurname+"',`customerpassword`='"+customerpassword+"',`customerlandline`='"+customerlandline+"',`customercordinateslatitude`='"+customercordinateslatitude+"',`customercordinateslongitude`='"+customercordinateslongitude+"',`customeraddress`='"+customeraddress+"',`customercell`='"+customercell+"',`customeremail`='"+customeremail+"' ,`wholesale_retail_both`='"+wholesale_retail_both+"' WHERE username ='"+uname+"'";
 mquery = EncryptQuery(mquery);
var mquertype ="UPDATE";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
.done(function( data ) {   
// this is to update the other table
  var uname = window.localStorage["uname"].toString();
  var customerpassword = CryptoJS.SHA256(document.getElementById("passwords").value);
  var customerpassword = $.base64.encode( customerpassword );
  var mquery = "UPDATE `customer_login` SET `username`='"+uname+"', `passwords`='"+customerpassword+"'  WHERE username ='"+uname+"'";
  mquery = EncryptQuery(mquery);
var mquertype ="UPDATE";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} ) 
.done(function( data ) {   
$('.spinner').hide().empty();
  alert( "Updated Successfully"); 
  });
  });
}
else if (customerpasswordtest =="ZTNiMGM0NDI5OGZjMWMxNDlhZmJmNGM4OTk2ZmI5MjQyN2FlNDFlNDY0OWI5MzRjYTQ5NTk5MWI3ODUyYjg1NQ=="  && validateRegis()==true )
{
var mquery = "UPDATE `customer` SET `username`='"+uname+"',`customername`='"+customername+"',`customersurname`='"+customersurname+"',`customerpassword`='"+customerpassword+"',`customerlandline`='"+customerlandline+"',`customercordinateslatitude`='"+customercordinateslatitude+"',`customercordinateslongitude`='"+customercordinateslongitude+"',`customeraddress`='"+customeraddress+"',`customercell`='"+customercell+"',`customeremail`='"+customeremail+"' ,`wholesale_retail_both`='"+wholesale_retail_both+"' WHERE username ='"+uname+"'";
 mquery = EncryptQuery(mquery);
var mquertype ="UPDATE";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} )    
.done(function( data ) {   
// this is to update the other table
  var uname = window.localStorage["uname"].toString();
   var customerpassword = CryptoJS.SHA256(document.getElementById("passwords").value);
  var customerpassword = $.base64.encode( customerpassword );
  var mquery = "UPDATE `customer_login` SET `username`='"+uname+"', `passwords`='"+customerpassword+"'  WHERE username ='"+uname+"'";
    mquery = EncryptQuery(mquery);
var mquertype ="UPDATE";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", { QUERY:mquery,QUERYTYPE:mquertype} ) 
.done(function( data ) {   
$('.spinner').hide().empty();
  alert( "Updated Successfully"); 
  });
  });
}
else
{
$('.spinner').hide().empty();
alert("Failed to update due to the passwords not matching");
alert(validateRegis());
}
}

function Maps()
{
var uname =window.localStorage["uname"];
var mquery="SELECT  * FROM `customer` WHERE `customer`.`username` = '"+uname+"'";
 mquery = EncryptQuery(mquery);
var mquertype ="SELECT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", {QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  var LongandLat = JSON.parse(data);
var latitude  = LongandLat[0].customercordinateslatitude;
var longitude = LongandLat[0].customercordinateslongitude; 

       var map = L.map('map').setView([latitude,longitude], 14);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; ' + mapLink,
            maxZoom: 18,
            }).addTo(map);
			var circle = L.circle([latitude,longitude], 200, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(map);

var gpsid = "1";
var mquery="SELECT  * FROM `coordinates` WHERE `coordinates`.`gpsid` = '"+gpsid+"'";
 mquery = EncryptQuery(mquery);
var mquertype ="SELECT";
$.getJSON("http://linkwhereservicesarehostedonthephppage?method=TableQuery&jsoncallback=?", {QUERY:mquery,QUERYTYPE:mquertype} )    
  .done(function( data ) {
  var LongandLat1 = JSON.parse(data);  
$('.spinner').hide().empty();
var lat1  = LongandLat1[0].latitude;
var lon1 = LongandLat1[0].longitude; 

var circle = L.circle([lat1,lon1], 200, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(map);
});
});
}

function spinner()
{
 var opts = {
            lines: 10, // The number of lines to draw
            length: 7, // The length of each line
            width: 4, // The line thickness
            radius: 10, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#000', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 25, // Top position relative to parent in px
            left: 25 // Left position relative to parent in px
        };
		  var target = document.getElementById('spinner');
		window.localStorage["target"] = document.getElementById('spinner').value;
       // var target = document.getElementById('spinner');
        var spinner = new Spinner(opts).spin(target);
		$(target).data('spinner', spinner);
		
}


function EncryptQuery(query)
{
    var rsa = new RSAKey();
    rsa.setPublic('8a5f4d4fa7dd78ca8539ba8b9581b30c9ce04e1998cd881d5279221984bc606e2c7d3368dc184b357507966a0f20930ba665cd9e914d6b0b67c8636ffe8cacfd', '10001');
    return rsa.encrypt(query);
}

// validation 

function validateLogin()

    {

        // Create validation tracking variables

        var valid = true;

        var validationMessage = 'Please correct the following errors:\r\n';

 

        // Validate first name

        if (document.getElementById('x').value.length == 0)

        {

            validationMessage = validationMessage + '  - username is missing\r\n';

            valid = false;

        }

        

        // Validate last name

        if (document.getElementById('y').value.length == 0)

        {

            validationMessage = validationMessage + '  - Password is missing\r\n';

            valid = false;

        }

  if (valid == false)

        {

            alert(validationMessage);

        }

        

        return valid;

    }
    
    //forget Password
       //login
 function validateforget()

    {

        // Create validation tracking variables

        var valid = true;

        var validationMessage = 'Please correct the following error:\r\n';

 

        // Validate first name

        if (document.getElementById('userforgot').value.length == 0)

        {

            validationMessage = validationMessage + '  - username is missing\r\n';

            valid = false;

        }

        

  if (valid == false)

        {

            alert(validationMessage);

        }

        

        return valid;

    }
    //Edit Profile
    
    //validate Registration
 function validateRegis()

    {

        // Create validation tracking variables

        var valid = true;

        var validationMessage = 'Please correct the following errors:\r\n';

 

        // Validate first name

        if (document.getElementById('fullname').value.length == 0)

        {

            validationMessage = validationMessage + '  - fullname is missing\r\n';

            valid = false;

        }

        if (document.getElementById('surname').value.length == 0)

        {

            validationMessage = validationMessage + '  - surname is missing\r\n';

            valid = false;

        }

 

  

        if (document.getElementById('passwords').value.length == 0)

        {

            validationMessage = validationMessage + '  - passwords1 is missing\r\n';

            valid = false;

        }

// if (document.getElementById('passwords1').value.length == 0)

      //  {

         //   validationMessage = validationMessage + '  - password2 is missing\r\n';

         //   valid = false;

       // }

        

        if (document.getElementById('wholesaleRetailboth').value.length == 0)

        {

            validationMessage = validationMessage + '  - wholesale ,Retail both is missing\r\n';

            valid = false;

        }

  if (document.getElementById('landline').value.length == 0)

        {

            validationMessage = validationMessage + '  - landline is missing\r\n';

            valid = false;

        }
         if (document.getElementById('cellnumber').value.length == 0)

        {

            validationMessage = validationMessage + '  - cellnumber is missing\r\n';

            valid = false;

        }
         if (document.getElementById('address').value.length == 0)

        {

            validationMessage = validationMessage + '  - Address is missing\r\n';

            valid = false;

        }
         if (document.getElementById('email').value.length == 0)

        {

            validationMessage = validationMessage + '  - Email is missing\r\n';
            

            valid = false;

        }

        

        if (valid == false)

        {

            alert(validationMessage);

        }

        

        return valid;

    }
    
    //numbers for landline
    
        var specialKeys = new Array();
        specialKeys.push(8); //Backspace
        
        function IsNumeric(e) {
            var keyCode = e.which ? e.which : e.keyCode
            var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
            document.getElementById("error").style.display = ret ? "none" : "inline";
            return ret;
        }
