	$(document).ready(function() {
    var userForm = $("#userCreation");
    userForm.hide();
    var x = 0, y = 0, i = 0, z = 0;
    $("#createToDo").hide();
    $("#two").hide();
//Increasing the count.
    increaseCount = function(count){
        str = count.text();
        pickStr = str.substring(str.indexOf('(') + 1, str.indexOf(')'));
        pickInt = parseInt(pickStr) + 1;
        newStr = str.replace(pickStr, pickInt);
        count.text(newStr);
    }
// Decreasing the count.
    decreaseCount = function(checkbox){
        checkbox.prop('checked', true);
        checkbox.attr('disabled', true);
       	checkbox.parent().css("text-decoration", "line-through");
        checkboxId = checkbox.attr('id');
        checkboxSelector = $("#ulName li#" + checkboxId);
        strTwo = checkboxSelector.text();
        pickStrTwo = strTwo.substring(strTwo.indexOf('(') + 1, strTwo.indexOf(')'));
        pickIntTwo = parseInt(pickStrTwo) - 1;
        newStrTwo = strTwo.replace(pickStrTwo, pickIntTwo);
        checkboxSelector.text(newStrTwo);
    }
// Hiding and showing the elements on click of different buttons.
    $("#newUser").on("click", function() {
        userForm.show();
        $('#createUser').val('');
    });

    $("#createToDo").on("click", function() {
        $("#two").show();
        $("#todo").val('');
    });
// Creating a User.
    $("#userCreation").submit(function(event) {
        if ($("#createUser").val() == '') {
            alert("Enter Details");
            return false;
            alert("hi");
        } else {
            Username = $("#createUser").val();
            $("#userSelect").append($('<option>', {id: y}).text(Username));
            $("y").attr("data-id", x);
            $("x").data("")
            y++;
            $("#ulName").append($('<li>').text(Username + '(' + x + ')'));
            $('#ulName li').attr('id', function(i) {
                return i;
                i++;
            });
            $("#createToDo").show();
            userForm.hide();
            event.preventDefault();
        }
    });
// Appending a Task.
    $("#userTodo").submit(function(event) {
        if ($.trim($("#todo").val()) == '') {
            alert("Assign Something!");
            return false;
        } else {
            task = $("#todo").val();
            todoBy = $('#userSelect option:selected').val();
            attribute = $('#userSelect option:selected').attr('id');
            $("#todoListul").append($('<li>', {id:z}).append($('<input>', {id:attribute, type: "checkbox"})).append(task +' by(' + todoBy+')'));
            z++;
            $("#two").hide();
            $("#ulName li").each(function() {
                if ($('#userSelect option:selected').attr('id') == $(this).attr('id')) {
                    increaseCountThis = $(this);
                    increaseCount(increaseCountThis);
                }
            });
// Decreasing the count on completion of a task.            
            $(":checkbox").unbind().on("click", function() {
            	checkboxThis = $(this);
            	decreaseCount(checkboxThis);
            });
            event.preventDefault();
        }
    });
});