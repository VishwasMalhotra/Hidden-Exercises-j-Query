$(document).ready(function() {
	$("#placeOrder").hide();
	newDiv=1;
// Appending the selected item to the current order section.
	currentOrder = function(variable){
	order = $("#"+variable+" option:selected").val();
	cost = $("#"+variable+" option:selected").data("price");
	$('.'+variable+'').text(order +' ' + variable);
	$('.'+variable+'Price').text(' Rs.' + cost);
	$("#placeOrder").show();
	}
// Parsing the data-attribute(PRICE) into integer.
	toInteger = function(convert){
		parseInt(convert);
		return convert;
	}
// Caluclating Total Amount
	totalAmount = function(){
		bread = $("#breads option:selected").data("price") || 0;
		filling = $("#fillings option:selected").data("price") || 0;
		sauce = $("#sauces option:selected").data("price") || 0;
		drink = $("#drinks option:selected").data("price") || 0;
		toInteger(bread);
		toInteger(filling);
		toInteger(sauce);
		toInteger(drink);
		currentAmount = bread + filling + sauce + drink; 
		$("#totalPrice").text('Total Amount : ' +currentAmount);

	}
// Appending order to Today's Order.
	todayOrder = function(orderDetails){
		itemName = $("#"+orderDetails+" option:selected").val();
		itemPrice = $("#"+orderDetails+" option:selected").data('price');
		if (itemName === undefined || itemPrice === null){
			this.itemName = '';
			this.itemPrice = '';
		}
		newDivDetails = $('#'+newDiv+'').append(itemName + ' ' +itemPrice+'<br/>');
	}
// Clearing current order for the next order.
	clearOrder = function(){
		$(".a").html('');
		$("#totalPrice").html('');
		$("#placeOrder").hide();
		$("#breads option:selected").removeAttr("selected");
		$("#fillings option:selected").removeAttr("selected");
		$("#sauces option:selected").removeAttr("selected");
		$("#drinks option:selected").removeAttr("selected");
	}

// After Clicking on "Place Order", asking for customer's name & number.
// Calling Today's order function.
	customerInput = function() {
		customerName = prompt("Please enter customer's name", "");
		customerContactNumber = prompt("Please enter customer's contact number", "");
		if (customerName && customerContactNumber != null) {
			$("#orders").append($("<div/>", {id: newDiv}).css({"border": "1px solid black", "text-align": "center"}));
			customerDetails = 'Name: '+customerName + '<br/> '+'Contact no.: ' + customerContactNumber + '<br/>' + '<b>Order No. '+newDiv+'<b><br/>'
			$('#'+newDiv+'').prepend(customerDetails);
			todayOrder("breads");
			todayOrder("fillings");
			todayOrder("sauces");
			todayOrder("drinks");
			totalPriceVar = $(totalPrice).html();
			newDivDetails.append('<b>'+totalPriceVar+'</b>');
			newDiv++
			oldTotal = $("#totalSales").attr('data-total');
			newTotal = parseInt(oldTotal) + currentAmount;
			$("#totalSales").attr('data-total' , newTotal);
			$("#totalSales").text('Rs. ' + newTotal);
			clearOrder();
        } else {
            return customerInput();
        }
    }
// On Click of select List & Place order button, Event Fires.
	$("#breads").on('click', function(){
		breadID = this.id;
		currentOrder(breadID);
		totalAmount();
	});

	$("#fillings").on('click', function(){
		fillingsID = this.id;
		currentOrder(fillingsID);
		totalAmount();
	});

	$("#sauces").on('click', function(){
		saucesID = this.id;
		currentOrder(saucesID);
		totalAmount();
	});

	$("#drinks").on('click', function(){
		drinksID = this.id;
		currentOrder(drinksID);
		totalAmount();
	});

	$("#placeOrder").on('click',function(){
		customerInput();
	});
});
