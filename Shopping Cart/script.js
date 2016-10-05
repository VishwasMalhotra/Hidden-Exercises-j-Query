$(document).ready(function() {
    $(".cart").append($('<button>', {class: "addToCart"}).text("Add to Cart"));
    jsonObj = [];

// Function to create a JSON Object.
    createJSONobj = function(itemName, itemCategory, itemPrice) {
        item = {};
        item["name"] = itemName;
        item["category"] = itemCategory;
        item["price"] = itemPrice;
        jsonObj.push(item);
        jsonString = JSON.stringify(jsonObj);
    }

// Creating a JSON object.
    createJSONobj('Apple MacBook Pro MA464LL/A 15.4" Notebook PC', "Computers", "2299.99");
    createJSONobj('Sony VAIO 11.1" Notebook PC', "Computers", "2699.99");
    createJSONobj('Canon Digital Rebel XT 8MP Digital SLR Camera', "Cameras", "550.00");

//Appending the JSON Objects name, category and price.
    $(jsonObj).each(function(index) {
        productName = this.name;
        productCategory = this.category;
        productPrice = this.price;
        $(".aboutProduct").eq(index).prepend($('<h4>',{class : "head"}).text(productName));
        $(".head").css("font-weight", "600");
        $(".head").eq(index).append($('<h5>', {class:"sub-head"}).text("Category: "+productCategory+""));
        $(".sub-head").css("font-weight", "600");
        $(".aboutProduct").eq(index).append($('<h3>').text('Price: '+ productPrice +''));
    });

// Sorting Items on Drop Down.
    sortingItems = function() {
        if ($("#categories option:selected").val() == "All") {
            $(".itemlist").show();
        } else {
            $(".itemlist").hide();
            $("." + $("#categories option:selected").val().toLowerCase() + "").show();
            }
        }

// Calling the sorting items on change of the list menu.
    $("#categories").change(function() {
        sortingItems();
    });

//Increasing the count of Cart.
    increaseCount = function(){
        str = $("#myCart a").html();
        pickStr = str.substring(str.indexOf('(') + 1, str.indexOf(')'));
        pickInt = parseInt(pickStr) + 1;
        newStr = str.replace(pickStr, pickInt);
        $("#myCart a").text(newStr);
    }

// Decreasing the count of Cart.
    decreaseCount = function(){
        strTwo = $("#myCart a").html();
        pickStrTwo = strTwo.substring(strTwo.indexOf('(') + 1, strTwo.indexOf(')'));
        pickIntTwo = parseInt(pickStrTwo) - 1;
        newStrTwo = strTwo.replace(pickStrTwo, pickIntTwo);
        $("#myCart a").text(newStrTwo);
    }

// On Product click actions.
    $("#cartItems").hide();
    $("#products").on('click', function() {
        $(this).addClass("active");
        $("#myCart").removeClass();
        $("#mainContainer").show();
        $("#cartItems").hide();
        sortingItems();
    });

//On Cart click actions.
    $("#myCart").on('click', function() {
        $(this).addClass("active");
        $("#products").removeClass();
        $("#mainContainer").hide();
        $("#cartItems").show();
    });

// Adding items to cart. 
    $(".addToCart").on('click', function() {
        increaseCount();
        $(this).attr('disabled', true);
        shoppedProductName = $(this).closest('.itemlist').find('h4').clone();
        shoppedProductImage = $(this).closest('.itemlist').find('img').clone();
        shoppedProductPrice = $(this).closest('.itemlist').find('h3').clone();
        shoppedProductQty = $(this).closest('.itemlist').find('input').clone();
        shoppedProductQty.prop("readonly", true);
        subTotalAmount();
        newRow = $('<tr>');
        oneTd = newRow.append($('<td>').append(shoppedProductImage).append($(shoppedProductName)));
        twoTd = oneTd.append($('<td>').append($(shoppedProductPrice)));
        threeTd = twoTd.append($('<td>').append($(shoppedProductQty)));
        fourTd = threeTd.append($('<td>').append(subTotal));
        fiveTd = fourTd.append($('<td>').append($('<button>', {class:'remove'}).text('REMOVE')));
        $("#infoTable").append(newRow);
    });

// Calculating the sub-total amount.
    subTotalAmount = function(){
        productPriceString = shoppedProductPrice.html();
        productPrice =  parseFloat(productPriceString.substring(productPriceString.indexOf(':')+1));
        productQuantity = parseInt(shoppedProductQty.val());
        sub = productPrice * productQuantity
        subTotal = sub.toFixed(2);
        oldTotal = $("#checkout").attr('data-total');
        newTotal = parseFloat(oldTotal) + parseFloat(subTotal);
        newTotal.toFixed(2);
        $("#checkout").attr('data-total' , newTotal);
        $("#checkout").text('Total: '+newTotal+'');
    }
    
// Removing items from cart.
    $("#infoTable").on("click",".remove", function(){
        decreaseCount();
        $(".addToCart").attr("disabled", false);
        $(this).closest('td').closest('tr').remove();

    });
});