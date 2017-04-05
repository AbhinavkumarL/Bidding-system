
$(document).ready(function(){
    $("#show").click(function(){
        $("#grid-container").show();
    });
    $("#hide").click(function(){
        $("#grid-container").hide();
    });
	$("#showhideToggle").click(function(){
        $("#grid-container").toggle();
    });
	$("#fadein").dblclick(function(){
        $("#grid-container").fadeIn();
    });
	$("#fadeout").dblclick(function(){
        $("#grid-container").fadeOut();
    });
	$("#fadeToggle").dblclick(function(){
        $("#grid-container").fadeToggle();
    });
	$("#fadeto").dblclick(function(){
        $("#grid-container").fadeTo("slow",0.5);
    });
    $("#unfadeto").dblclick(function(){
        $("#grid-container").fadeTo("slow",1);
    });
    $("#img1").mouseenter(function(){
    $("#img1").animate({
        opacity: '1.0',
        height: '200px',
        width: '250px'
    });
	$("#img1").animate({
        opacity: '0.5',
        height: '200px',
        width: '150px'
    });
	$("#img1").animate({
        opacity: '1.0',
        height:'350px',
		width:'300px'
    },function(){alert("Done!");});
    });
	
	$("#img1").mouseleave(function(){
        $("#img1").stop(true);
        alert("Done!!");
    });
    
	$("#nam1").keypress(function(){
	    $("#img1").fadeToggle("slow").fadeOut("slow").fadeIn("slow");
	});
	$("#nam1").keydown(function(){
	    $("#img1").animate({width:'400px'}).animate({width:'800px'}).animate({width:'600px'});
	});
	
});

	/*
  Jquery Validation using jqBootstrapValidation
   example is taken from jqBootstrapValidation docs 
  */
$(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // something to have when submit produces an error ?
            // Not decided if I need it yet
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var phone = $("input#phone").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "./bin/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + " it seems that my mail server is not responding...</strong> Could you please email me directly to <a href='mailto:me@example.com?Subject=Message_Me from myprogrammingblog.com;>me@example.com</a> ? Sorry for the inconvenience!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});

