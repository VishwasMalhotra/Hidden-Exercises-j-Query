$(document).ready(function() {
    jsonObj = [];
    individualId = 0;

//Creating a JSON object.
    createJSONobj = function() {
        item = {};
        item["id"] = individualId;
        item["name"] = name;
        item["email"] = email;
        jsonObj.push(item);
        jsonString = JSON.stringify(jsonObj);
        // console.log(jsonString);
    }

// Reseting the values of name and email.
    reset = function() {
        $("#name").val('');
        $("#email").val('');
    }

// Triming mail and email.
    trim = function(variable) {
        return $.trim(variable);
    }

// Creating a new div adding attributes to it and appending it.
    createnewObj = function() {
        var div = $('<div>', {class: "personalContact"}).append(name + '<br/>' + email + '<br/>');
        div.attr("data-id", individualId);
        div.attr("data-name", name);
        var button = $('<button>', {id: "delete"}).text('Delete');
        div.append(button);
        $("#contacts").append(div);
        $("#delete").css("width:50px; height:20px;");
    }

// Show & Hide on search.
    search = function() {
        jsonIdarr = [];
        $.each(jsonObj, function(element) {
            if (this.name.startsWith(searchval)) {
                jsonIdarr.push(this.id);
            }
            $("#contacts .personalContact").each(function(index, container) {
                if ($.inArray($(container).data('id'), jsonIdarr) > -1) {
                    $(container).show();
                } else {
                    $(container).hide();
                }
            });
        });        
    }

// calling all the functions on submit.
    $("#form").submit(function(event) {
        name = $("#name").val().toLowerCase();
        email = $("#email").val();
        name = trim(name);
        email = trim(email);
        if (name == '' || email == '') {
            alert("Please fill the details!");
        } else {
            createnewObj();
            createJSONobj();
            reset();
            individualId++
        }
        event.preventDefault();
    });

// Deleting JSON object and removing the div from the list on delete button click.
    $("#contacts").on("click", "#delete", function() {
        var deleteDiv = $(this).parent();
        var indexno;
        deleteDiv.remove();
        $.each(jsonObj, function(index, info) {
            if (info.id === deleteDiv.data('index')) {
                indexno = index;
            }
        });
        jsonObj.splice(indexno, 1);
    });
    
// Searching JSON object.
    $("#search").keyup(function() {
        searchval = $("#search").val().toLowerCase();;
        search();
    });
});