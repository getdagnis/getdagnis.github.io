$(window).on('load', function() {


$('#header, div')
$('#header').on("click", function() {
    $(this).toggleClass('highlight');
})

// Add an click event to a button that toggles it's class (add some style to the class)
// Create an HTML element, append a new one to it and one before
$(".btn-danger").on("click", function() {
    $(this).toggleClass('btn-danger btn-secondary');
    $(".new-button").append("<button id='btn-scroll' class='btn btn-info'>Much cool SCROLLING!</button><span class='last'></span>");
    // Add a button to an element that when clicked scrolls 50% of the element height;
    $("#btn-scroll").on("click", function() {
        var docHeight = $(document).height()*0.5
        $(document).scrollTop( docHeight )
    })
    $(".new-button").append("<button id='btn-ajax' class='btn btn-danger'>Much cool SCROLLING more!</button><span class='last'></span>");
    // Create an ajax request that prints response data to the page (style it, make it look nice)

    $("#btn-ajax").on("click", function() {
        var docHeightFull = $(document).height()
        $(document).scrollTop( docHeightFull )
        $.ajax({
            method: "GET",
            url: "https://reqres.in/api/users"
        })
        .done(function( response ) {
            $('body').append('<ul class="new-list"></ul>')
        
            response.data.forEach(function(val) {
                $('.new-list').append('<img src="' + val.avatar + '" width="100px" />')
                $('.new-list').append('<li>' + val.email + '</li>')
            })
        });
    })

    })

})

