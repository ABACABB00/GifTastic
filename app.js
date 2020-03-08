 var animals = ["cat", "dog", "monkey", "lion", "shark", "zebra", "snake", "spider", "ant", "ratcoon"];
 
    function renderButtons() {
      $("#buttons-view").empty();
      for (var i = 0; i < animals.length; i++) {
        var buttons = $('<button class="btn btn-info" style= "margin: 5px;"></button>');      
        buttons.addClass("giph");
        buttons.attr("data-name", animals[i]);
        buttons.text(animals[i]);
        $("#buttons-view").append(buttons);
      }
    }
    $('body').on("click", '.gif', function () {      
      var src = $(this).attr("src");
      if ($(this).hasClass('playing')) {
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass('playing');
      } else {
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
      }
    });

    $("#giphy").on("click", function (event) {

      event.preventDefault();
      var animal = $("#search-input").val();
      var search = $("#search-input").val().trim();
      animals.push(animal);     
      renderButtons();
    });

    function displayGiphy() {
      $("button").on("click", function () {
        var giphy = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=fztxG0KlQX7hLnL5u3Fkvo7kmHbyyDeq&limit=10";
        $("#gifs").empty();

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function (response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                $("#gifs").append('<img class="gif" src="' +response.data[i].images.fixed_height_still.url + '">');
            }
        });
        $("#gifs").empty();
      });
    }
    $(document).on("click", ".giph", displayGiphy);
    renderButtons();
        
