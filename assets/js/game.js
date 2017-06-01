var topics = ["Cleveland", "Baltimore", "New York", "San Fransisco", "Denver", "Santa Fe", "Portland", "Tampa Bay", "Erie", "Ontario", "Las Vegas"];
var btnDiv = $("#btnDiv");



function displayButtons() {
    $("#btnDiv").empty();
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $("<button>");
        newBtn.text(topics[i]);
        newBtn.addClass('btn btn-default cityBtn');
        btnDiv.append(newBtn);
    }
}

$(document).ready(function() {
    displayButtons();
});

$("#btnAddCity").on("click", function() {
    event.preventDefault();
    if ($("#inputCity").val()) {
        // addButton($("#inputCity").val());
        topics.push($("#inputCity").val());
        $("#inputCity").val("");
        displayButtons();
    }
});

// $(".cityBtn").on("click", function() {
$("#btnDiv").on("click", ".cityBtn", function() {
    var topic = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" +
        topic;

    $.ajax({
            url: queryURL,
            type: "GET"
        })
        .done(function(response) {
            console.log(queryURL);
            console.log(response);
            var results = response.data;

            $("#gifsDiv").empty();


            // var newRow = $("<div class='row'>");
            // var j = 1;
            // var gifs = [];
            for (var i = 0; i < results.length; i++) {
                var imgRating = results[i].rating;
                var stillImg = results[i].images.fixed_height_still.url;
                var responsiveImg = results[i].images.fixed_height.url;

                var newGif = $("<div class='thumbnail'>");
                var img = $("<img class='cityGif'>");
                img.attr("src", stillImg);
                img.attr("data-state", "still");
                img.attr("data-still", stillImg);
                img.attr("data-responsive", responsiveImg);

                var rating = $("<div class='caption'>");
                var p = $("<p>").text("Rating: " + imgRating);
                rating.append(p);

                newGif.append(img);
                newGif.prepend(rating);

                // newRow.append(newGif);
                // gifs.push(newGif);
                // j++;
                // if (j % 3 === 0) {
                //     $("#gifsDiv").append(newRow);
                    // newRow = new $("<div class='row'");
                // }

                $("#gifsDiv").append(newGif);
            }
            // console.log(gifs);
        });
})


$("#gifsDiv").on("click", ".cityGif", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("data-state", "responsive");
        $(this).attr("src", $(this).attr("data-responsive"));
    } else {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
});
