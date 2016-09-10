$(document).ready(function() {

var JSONObject  = [{"name":"1","url":"1.jpg","color":"Yellow","brand":"BRAND A","sold_out":"1"},
{"name":"2","url":"2.jpg","color":"Red","brand":"BRAND B","sold_out":"0"},
{"name":"3","url":"3.jpg","color":"Green","brand":"BRAND D","sold_out":"0"},
{"name":"4","url":"4.jpg","color":"Red","brand":"BRAND A","sold_out":"1"},
{"name":"5","url":"5.jpg","color":"Blue","brand":"BRAND B","sold_out":"0"},
{"name":"6","url":"6.jpg","color":"Green","brand":"BRAND C","sold_out":"0"},
{"name":"7","url":"7.jpg","color":"Red","brand":"BRAND C","sold_out":"1"},
{"name":"8","url":"8.jpg","color":"Blue","brand":"BRAND D","sold_out":"0"},
{"name":"9","url":"9.jpg","color":"Yellow","brand":"BRAND A","sold_out":"0"},
{"name":"10","url":"10.jpg","color":"Yellow","brand":"BRAND B","sold_out":"1"},
{"name":"11","url":"11.jpg","color":"Green","brand":"BRAND D","sold_out":"0"},
{"name":"12","url":"12.jpg","color":"Yellow","brand":"BRAND D","sold_out":"0"},
{"name":"13","url":"13.jpg","color":"Blue","brand":"BRAND A","sold_out":"0"},
{"name":"14","url":"14.jpg","color":"Blue","brand":"BRAND D","sold_out":"0"},
{"name":"15","url":"15.jpg","color":"Green","brand":"BRAND B","sold_out":"0"},
{"name":"16","url":"16.jpg","color":"Yellow","brand":"BRAND B","sold_out":"1"},
{"name":"17","url":"17.jpg","color":"Green","brand":"BRAND A","sold_out":"1"},
{"name":"18","url":"18.jpg","color":"Blue","brand":"BRAND D","sold_out":"1"},
{"name":"19","url":"19.jpg","color":"Green","brand":"BRAND C","sold_out":"0"},
{"name":"20","url":"20.jpg","color":"Yellow","brand":"BRAND A","sold_out":"0"}];

    // A function to create the Image Object and add attributes to it.
    createImage = function(data) {
            var url = "images/" + data.url;
            var color = data.color;
            var name = data.name;
            var brand = data.brand;
            var sold_out = data.sold_out;
            var img = new Image();
            img.src = url;
            $(img).attr('data-color', color);
            $(img).attr('data-name', name);
            $(img).attr('data-brand', brand);
            $(img).attr('data-sold_out', sold_out);
            return img;
        }
        
        // A function to create the image array, sort it, and display it.
    function display() {

        images = [];
        for (i = 0; i < JSONObject.length; i++) {
            var img = createImage(JSONObject[i]);
            images.push(img);
        }
        // Sorting the Array.
        images.sort(function(a, b) {
            if ($(a).data(value) > $(b).data(value)) {
                return 1;
            } else if ($(a).data(value) < $(b).data(value)) {
                return -1;
            } else {
                return 0;
            }
        });
        // Displaying it.
        $("#data").html('');
        $("#data").append(images);
    }

    // On Change event of the drop down list.
    $("#dropList").change(function() {
        if ($('#dropList option:selected').val() == 'color') {
            value = 'color';
        }
        if ($('#dropList option:selected').val() == 'brand') {
            value = 'brand';
        }
        if ($('#dropList option:selected').val() == 'name') {
            value = 'name';
        }
        if ($('#dropList option:selected').val() == 'sold_out') {
            value = 'sold_out';
        }
        display();
    }).trigger("change");
});