$(document).ready(function() {
    images = [];
    $.ajax({
        url: "https://dl.dropboxusercontent.com/u/628209/exercises/javascript/product.json",
        type: "GET",
        dataType: "json",
        async: true,
        success: function(data) {
            $.each(data, function(i, data) {

                img = $("<img/>");
                img.attr('src', "images/" + data.url);
                (img).attr('data-color', data.color);
                (img).attr('data-name', data.name);
                (img).attr('data-brand', data.brand);
                (img).attr('data-sold_out', data.sold_out);


                images.push(img);

            });
        }
    });


    display = function(value) {
        images.sort(function(a, b) {
            if ($(a).data(value) > $(b).data(value)) {
                return 1;
            } else if ($(a).data(value) < $(b).data(value)) {
                return -1;
            } else {
                return 0;
            }
        });
        $.each(images, function(index, image) {
            $("#data").append(image);
        });
    }
    $("#dropList").change(function() {

        if ($('#dropList option:selected').val() == 'color') {
            display('color');
        }
        if ($('#dropList option:selected').val() == 'brand') {
            display('brand');
        }
        if ($('#dropList option:selected').val() == 'name') {
            display('name');
        }
        if ($('#dropList option:selected').val() == 'sold_out') {
            display('sold_out');
        }
    }).trigger("change");
});