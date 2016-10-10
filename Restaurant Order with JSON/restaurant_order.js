$(document).ready(function() {
	var JSONObject  = [ 
		{
			"category_name": "Breads",
			"products" : [
				{"name":"White", "price":"50"},
				{"name":"Brown", "price":"100"},
				{"name":"Multigrain", "price":"200"}

			]
		},
		{
			"category_name": "Fillings",
			"products" : [
				{"name":"Veg", "price":"100"},
				{"name":"Non-Veg", "price":"200"}
			]
		},
		{
			"category_name": "Sauces",
			"products" : [
				{"name":"Tomato", "price":"20"},
				{"name":"Mint", "price":"40"},
				{"name":"Mayo", "price":"60"},
				{"name":"Southwest", "price":"80"},
			]
		},
		{
			"category_name": "Drinks",
			"products" : [
				{"name":"Coke", "price":"30"},
				{"name":"Smoothies", "price":"50"},
				{"name":"Mojito", "price":"100"}
			]
		}		
	];

    customerOrderId = 1;
// Displaying the Billed amount for the current order.
    $(".orderTab").append($('<div>',{id:"totalPrice"}).attr('data-billedamount', '0'));
    $("#totalPrice").css("font-weight", "800");
// Appending a button to place order.
    $(".orderTab").append($('<button>', {id: 'PlaceOrder'}).text('Place Order'));
// Hiding the button until a order has started being placed.
    $("#PlaceOrder").hide();

// Iterating over the Object.
    $.each(JSONObject, function(i, item) {
// Appending the Menu Headings.
        menuSelect = $($('<select>', {id:item.category_name}).attr('size', 4));
        menuHeading = $('<h3>').text(item.category_name);
        $(".menu").append($('<div>',{class:"col-md-2"}).append(menuHeading).append(menuSelect));
// Appending the Menu options.
//Assigning Data attribute 'price', to the menu options.
        $.each(item.products, function(x, info) {
            menuSelect.append($($('<option>').attr('data-price', info.price)).text(info.name));
        });
// Calling a on click function on the select list.
        $(menuSelect).on("click", function() {
            $("#PlaceOrder").show();
            $("#totalPrice").show();
            menuListId = $('option:selected', this).closest('select').attr('id');
            newDiv = $($('<div>', {class:$(this).closest('select').attr('id')}).css("text-align", "center"));
            itemPrice = $('option:selected', this).attr('data-price');
            newDiv.attr('data-divattr', itemPrice);
            $("." + menuListId).remove();
            $("#container").append(newDiv);
            $(newDiv).css("font-weight", "700");
            newDiv.append($(this).closest('select').attr('id') + ': ' + $('option:selected', this).text());
            newDiv.append(' Rs.' + itemPrice);
            updateAmount();
        });
// Removing a item on Double Click.
        $(menuSelect).dblclick(function() {
            $("option:selected", this).prop("selected", false);
            newDiv.remove($('option:selected', this).text());
            updateAmount();
        });
    });

    $("#PlaceOrder").on('click', function() {
        newOrder();
        customerDetails();
        updateTotalAmount();

    });
// Updating the Total Amount of the current order.
    function updateAmount() {
        newTotal = 0;
        $("#container").find("[data-divattr]").each(function() {
            newTotal += parseInt($(this).attr('data-divattr'));
        });
        $("#totalPrice").attr('data-billedamount', newTotal);
        $("#totalPrice").text("Total amount :" + newTotal);
    }
// Appending the new div for a new order.
    function newOrder() {
        $("#orders").append($("<div>", {id: customerOrderId}));
        $("#container").find("[data-divattr]").each(function() {
            newOrderDiv = $("#" + customerOrderId + "").css({"border": "1px solid black","text-align": "center"});
            $(this).removeClass().css("font-weight", "").appendTo(newOrderDiv);
        });
        $(newOrderDiv).prepend($('<b>').text("Order Number: " + customerOrderId));
        $(newOrderDiv).append($('<b>').text($("#totalPrice").text()));
        customerOrderId++
        $("#PlaceOrder").hide();
        $("#totalPrice").hide();
        $("option:selected").removeAttr("selected");
    }
// Updating the Total Sales.
    function updateTotalAmount() {
        billedAmount = $("#totalPrice").attr('data-billedamount');
        totalSales = $("#totalSales").attr('data-total');
        dayTotal = parseInt(billedAmount) + parseInt(totalSales);
        $("#totalSales").attr('data-total', dayTotal);
        $("#totalSales").text("Rs. " + dayTotal);
    }
// Asking for Customer Details
    function customerDetails() {
        customerName = prompt("Please enter customer's name", "").trim();
        customerContactNumber = prompt("Please enter customer's contact number", "").trim();;
        if (customerName && customerContactNumber != null) {
        	$(newOrderDiv).prepend("<hr/>");
            $(newOrderDiv).prepend($('<b>').text("Customer Number: " + customerContactNumber));
        	$(newOrderDiv).prepend("<br/>");
            $(newOrderDiv).prepend($("<b>").text("Customer Name: " + customerName));
        } else {
            return customerDetails();
        }
    }
});