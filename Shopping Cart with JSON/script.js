$(document).ready(function() {
    var JSONObject  = [ 
        {
            "name": "Apple MacBook Pro MA464LL/A 15.4\" Notebook PC",
            "img": "macbookpro.jpg",
            "category": "Computers",
            "about": "The Intel Core Duo powering MacBook Pro is actually two processors build into a single chip.",
            "price": "2299.99"
        },
        {
            "name": "Sony Digital VAIO 11.1\" Notebook PC",
            "img": "sonyvaio.jpg",
            "category": "Computers",
            "about": "Weighing in at just an amazing 2.84 pounds and offering a sleek, durable carbon-fiber case in charcoal black. And with 4 to 10 hours of standard battery life, it has a stamina to power you through your most demanding application.",
            "price": "2699.99"
        },
        {
            "name": "Canon Digital Rebel XT 8MP Digital SLR Camera",
            "img": "canon.jpg",
            "category": "Cameras",
            "about": " Canon EOS Digital Rebel XT SLR adds resolution, speed, extra creative control, and enhanced confort in the hand to one of the smallest and lightest digital camera",
            "price": "550.00"
        },               
    ];
     
    cartCountNumber = 0;
    creatingCartTable();

// Iterating over The JSON object.
    $.each(JSONObject, function(i, item){
        productsName = item.name;
        productsImage = item.img;
        categoryName = item.category;
        productsAbout = item.about;
        productsPrice = item.price;
        creatingProducts();
    });

// Shifting between Tabs.
        $("#productsTab").on('click', function() {
        $(this).addClass("active");
        $("#myCartTab").removeClass();
        $("#cartContainer").hide();
        $("#mainContainer").show();
    });

// Shifting between Tabs.
    $("#myCartTab").on('click', function() {
        $(this).addClass("active");
        $("#productsTab").removeClass();
        $("#mainContainer").hide();
        $("#cartContainer").show();        
 
    });

// Calling function on click of Add To Cart.
    $(".addToCart").on('click', function(){
        attrName = $(this).attr('data-name');
        that = $(this);     
        quantityValueCheck = $(this).siblings('input').val();
        if($("tr[data-name*='"+attrName+"']").length > 0) {
            if(isNaN(quantityValueCheck) || quantityValueCheck.trim() == '' || quantityValueCheck <= 0){
                alert("Enter a Valid Quantity.");
                $(this).siblings('input').val('1');
                return false;
            } else{
                incresedQty = parseInt($("tr[data-name*='"+attrName+"']").children().eq(2).html()) + parseInt(quantityValueCheck);
                $("tr[data-name*='"+attrName+"']").children().eq(2).text(""+incresedQty+"");            
            }                   
        } else {
            addingToCart(that);

        }
        calculatingSubTotal();
        calculatingGrandTotal();
        $(this).siblings('input').val('1');
    });

// Removing the object on click of remove button in cart.
    $("#cartTable").on('click',".remove", function(){
        $(this).closest('tr').remove();
        cartCountNumber--;
        $("#myCartTab a").text("My Cart ("+cartCountNumber+")");        
        calculatingGrandTotal();
    });

// Searching on the basis of input provided by the user.
    $("#search").on('click', function(){
        searchWithInput();
    });

// Clearing the search.
    $("#clear").on('click', function(){
        $("#searchVal").val('');
        $("button[data-name]").closest('div').show();
        searchWithInput();  
    });

// Searching on the basis of categories.
    $("#categories").on('change', function(){
        searchWithInput();
    });

// Creating the Cart Table.
    function creatingCartTable(){
        $("#myCartTab").append($('<a>', {class:"a"}).text("My Cart ("+cartCountNumber+")"));
        $("#cartContainer").hide();
        $("#cartContainer").append($('<table id="cartTable">'));
        $("#cartTable").css({"float":"left"});
        headingRow = $('<tr>');
        firstHead = headingRow.append($('<th>').append("Products"));
        secondHead = firstHead.append($('<th>').append("Price"));
        thirdHead = secondHead.append($('<th>').append("Quantity"));
        fourthHead = thirdHead.append($('<th>').append("Subtotal"));
        fifthHead = fourthHead.append($('<th>').append("")); 
        $("#cartTable").append(headingRow);          
        $("#cartContainer").append($('<div>',{id:"grandTotal"}));
        $("#grandTotal").css({"float":"right","font-weight":"700", "font-size":"40px"});
    }

// Adding the product to cart.
    function addingToCart(variable){
         if (isNaN(variable.parent().find('input').val()) || (variable.parent().find('input').val().trim() == "") || (variable.parent().find('input').val() <= 0)) {
            alert("Enter a Valid Quantity.");
            return false
        } else {
            cartCountNumber++;
            $("#myCartTab a").text("My Cart ("+cartCountNumber+")");
            newRow = $('<tr>').attr('data-name', variable.attr('data-name'));
            oneTd = newRow.append($('<td>').append((variable.parent().find('img').clone())).append(variable.attr('data-name')));
            twoTd = oneTd.append($('<td>').append(variable.attr('data-price')));
            threeTd = twoTd.append($('<td>').append(parseInt(variable.parent().find('input').val())));
            fourTd = threeTd.append($('<td>').append("subTotal"));
            fiveTd = fourTd.append($('<td>').append($('<button>', {class:'remove'}).text('REMOVE')));
            $("#cartTable").append(newRow);           
        }
    }

// Appending the JSON Object onto different div's.
    function creatingProducts(){
        products = $('<div>', {class:""+categoryName+" margin-top-3"}).css("padding-left", "20px");
        products.append('<label>').text("Quantity: ")
        products.append($('<input>').attr('size', '4').val(1))
        products.append($('<button>', {class:'addToCart'}).css('margin-left', '4%').text("Add to Cart").attr('data-price', productsPrice).attr('data-name', productsName));
        image = $('<img>', {src:productsImage}).css({"height":"100px", "width": "200px", "border": "1px solid black"});        
        nameHeading = $('<h4>').css("font-weight", "600").text(productsName);
        productsCategory = $('<h5>').text("Category: " + categoryName);
        nameHeading.append(productsCategory);
        productDetails = $('<p>').css("margin-top","10px").text(productsAbout);
        productsCategory.append(productDetails);
        productsCost = $('<h3>').text("Rs. " + productsPrice);
        productDetails.append(productsCost);
        products.append($('<div>', {class:"col-md-2"}).append(image));
        products.append($('<div>',{class:"col-md-6 details"}).append(nameHeading));
        $("#mainContainer").append(products);        
    }

// Calculating and appending the subtotal.
    function calculatingSubTotal(){
        $('tr').not($('tr').eq(0)).each(function(){
            subPrice = parseFloat($(this).children().eq(1).html());
            subQty = parseInt($(this).children().eq(2).html());
            subAmount = (subPrice * subQty).toFixed(2);
            $(this).children().eq(3).text(""+subAmount+"");
            
        });
    }

// Calculating and appending the Total amount.
    function calculatingGrandTotal(){
        grandTotalAmount = 0;
        $('tr').not($('tr').eq(0)).each(function(){
            grandTotalAmount += parseFloat($(this).children().eq(3).html());
        });        
        fixedGrandAmount = parseFloat(grandTotalAmount).toFixed(2);
        $("#grandTotal").text('Total: Rs.'+ fixedGrandAmount);
    }
    
// Function to search on the basis of input provided by the user.
    function searchWithInput() {
        $("button[data-name]").closest('div').hide();
        if($("#searchVal").val().trim() == '') {
            if($('option:selected').html() == 'All') {
                $("button[data-name]").closest('div').show();
            } else {
                $("button[data-name]").closest('div .'+$('option:selected').html()+'').show();
            }
        } else {
        str = $("#searchVal").val();
        str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        $("button[data-name]").closest('div').hide();
            if($('option:selected').html() == 'All') {
                $("button[data-name*='"+str+"']").closest('div').show();
            } else {
                $("button[data-name*='"+str+"']").closest('div .'+$('option:selected').html()+'').show();
            }
        }
        
    }
});