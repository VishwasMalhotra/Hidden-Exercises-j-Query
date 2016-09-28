$(document).ready(function() {
	
// Saving Values in a new Row.	
    rowAppend = function(newRow) {
        newRow.parent().siblings('td:first').text(nameval);
        newRow.parent().siblings('td:first').next().text(emailval);
        $('#addRow').attr('disabled', false);
        editButton = newRow.parent().html('').append($('<button>', {id: 'edit'}).text("Edit"));
        editButton.append($('<button>', {id: 'delete'}).text("Delete"));
    }

// Editing the Name or E-mail.    
    editRow = function(editingRow) {
        nameValTwo = editingRow.parent().siblings('td:first').html();
        emailValTwo = editingRow.parent().siblings('td:first').next().html();
        editingRow.parent().siblings('td:first').html('').append($('<input>', {id: "nameInput"}).val(nameValTwo));
        editingRow.parent().siblings('td:first').next().html('').append($('<input>', {id: "email"}).val(emailValTwo));
        editingRow.parent().html('').append($('<button>', {class: 'save'}).text("Save"));
    }

// Appending a new Row.
    $('#addRow').on('click', function() {
        $('#infoTable').append('<tr><td><input id="nameInput" type="textbox"></td><td><input id="email" type="email"></td><td><button class="save">Save</button></td></tr>');
        $('#addRow').attr('disabled', true);
    });

// Checking and Saving the values.
    $("#infoTable").on('click', ".save", function() {
        nameval = $('#nameInput').val().trim();
        emailval = $('#email').val().trim();

        if (nameval == '' || emailval == '') {
            alert("Please Fill the Details!");
        } else {
            row = $(this);
            rowAppend(row);
        }
    });

// Editing a Row
    $("#infoTable").on('click', '#edit', function() {
        rowEditing = $(this);
        editRow(rowEditing);
    });

// Deleting a Row
    $("#infoTable").on('click', '#delete', function() {
        $(this).parent().parent().remove();
    });
});