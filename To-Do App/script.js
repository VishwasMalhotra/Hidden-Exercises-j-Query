$(document).ready(function() {
    var userForm = $("#userCreation");
    userForm.hide();
    $("#createToDo").hide();
    $("#two").hide();
    x = 0;
    y = 0;
    i = 0;
    z = 0;

    $("#newUser").on("click", function() {
        userForm.show();
        $('#createUser').val('');
    });

    $("#createToDo").on("click", function() {
        $("#two").show();
        $("#todo").val('');
    });

    $("#userCreation").submit(function(event) {
        if ($("#createUser").val() == '') {
            alert("Enter Details");
            return false;
            alert("hi");
        } else {
            Username = $("#createUser").val();
            $("#userSelect").append('<option id= ' + y + '>' + Username + '</option>');
            y++;
            $("#ulName").append('<li>' + Username + '(' + x + ') </li>');
            $('#ulName li').attr('id', function(i) {
                return i;
                i++;
            });
            $("#createToDo").show();
            userForm.hide();
            event.preventDefault();
        }
    });

    $("#userTodo").submit(function(event) {
        if ($.trim($("#todo").val()) == '') {
            alert("Assign Something!");
            return false;
        } else {
            task = $("#todo").val();
            todoBy = $('#userSelect option:selected').val();
            $("#todoListul").append('<li id=' + z + '> <input type="checkbox" id=' + $('#userSelect option:selected').attr('id') + '>' + task + ' by(' + todoBy + ')</li>');
            z++;
            $("#two").hide();
            $("#ulName li").each(function() {
                if ($('#userSelect option:selected').attr('id') == $(this).attr('id')) {
                    str = $(this).text();
                    pickStr = str.substring(str.indexOf('(') + 1, str.indexOf(')'));
                    pickInt = parseInt(pickStr) + 1;
                    newStr = str.replace(pickStr, pickInt);
                    $(this).text(newStr);
                }
            });
            $(":checkbox").unbind().on("click", function() {
                $(this).prop('checked', true);
                $(this).attr("disabled", true);
                $(this).parent().css("text-decoration", "line-through");
                checkboxId = $(this).attr('id');
                checkboxSelector = $("#ulName li#" + checkboxId);
                strTwo = checkboxSelector.text();
                pickStrTwo = strTwo.substring(strTwo.indexOf('(') + 1, strTwo.indexOf(')'));
                pickIntTwo = parseInt(pickStrTwo) - 1;
                newStrTwo = strTwo.replace(pickStrTwo, pickIntTwo);
                checkboxSelector.text(newStrTwo);
            });
            event.preventDefault();
        }
    });
});