$(document).ready(function() {
	
// Saving Values in a new Row.	
    rowAppend = function(newRow) {
    	// debugger
        newRow.closest('td').siblings('td:first').text(nameVal);
        newRow.closest('td').siblings('td:first').next().text(emailVal);
        $('#addRow').attr('disabled', false);
        editButton = newRow.closest('td').html('').append($('<button>', {id: 'edit'}).text("Edit"));
        editButton.append($('<button>', {id: 'delete'}).text("Delete"));
    }

// Editing the Name or E-mail.    
    editRow = function(editingRow) {
        nameValTwo = editingRow.closest('td').siblings('td:first').html();
        emailValTwo = editingRow.closest('td').siblings('td:first').next().html();
        editingRow.closest('td').siblings('td:first').html('').append($('<input>', {id: "nameInput"}).val(nameValTwo));
        editingRow.closest('td').siblings('td:first').next().html('').append($('<input>', {id: "email"}).val(emailValTwo));
        editingRow.closest('td').html('').append($('<button>', {class: 'save'}).text("Save"));
    }

// Appending a new Row.
    $('#addRow').on('click', function() {
        $('#infoTable').append('<tr><td><input id="nameInput" type="textbox"></td><td><input id="email" type="email"></td><td><button class="save">Save</button></td></tr>');
        $('#addRow').attr('disabled', true);
    });

// Checking and Saving the values.
    $("#infoTable").on('click', ".save", function() {
        nameVal = $('#nameInput').val().trim();
        emailVal = $('#email').val().trim();
        if (nameVal == '' || emailVal == '') {
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
        $(this).closest('td').closest('tr').remove();
    });
});