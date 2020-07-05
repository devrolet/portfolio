(function() {
    $('#btn-contact-submit').click(function(event) {
        if (event) event.preventDefault();
        var vistor = {
            name: $('#contact-form-name').val(),
            email: $('#contact-form-email').val(),
            subject: $('#contact-form-subject').val(),
            message: $('#contact-form-message').val()
        };
        console.log('Contact Form Submitted: ' + JSON.stringify(vistor));

        $.ajax({
            url: '/api/subscriber',
            type: 'POST',
            data: vistor,
            success: function(response){
                // console.log('Subscriber created: ' + JSON.stringify(response));
                document.getElementById('contact-form').reset();
                // alert('Thank you for reaching out. We will be in touch soon.');
                
            },
            error: function(response){

            }
        });
    });
})();