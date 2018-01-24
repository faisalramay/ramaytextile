/*
Name: 			View - Contact
Written by: 	Crivos - (http://www.crivos.com)
Version: 		1.0
*/

var Contact = {

	initialized: false,

	initialize: function() {

		if (this.initialized) return;
		this.initialized = true;

		this.build();
		this.events();

	},

	build: function() {

		this.validations();

	},

	events: function() {

		

	},

	validations: function() {

		$("#contactForm").validate({
			submitHandler: function(form) {

				$.ajax({
					type: "POST",
					url: "https://api.sendgrid.com/v3/mail/send",
					headers: {
						"Authorization": "Bearer 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",
						"Content-Type": "application/json"
					},
					data: {
						"personalizations":  [{"to": [{"email": "test@example.com"}]}],
						"from": {"email": "test@example.com"},
						"subject": "Sending with SendGrid is Fun",
						"content": [{"type": "text/plain", "value": "and easy to do anywhere, even with cURL"}]
					},
					dataType: "json",
					success: function (data) {
						if (data.response == "success") {
							$("#contactSuccess").removeClass("hidden");
							$("#contactError").addClass("hidden");

							$("#contactForm #name, #contactForm #email, #contactForm #subject, #contactForm #message").val("");

						} else {
							$("#contactError").removeClass("hidden");
							$("#contactSuccess").addClass("hidden");
						}
					}

				});
			},
			rules: {
				name: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				subject: {
					required: true
				},
				message: {
					required: true
				}
			},
			highlight: function (element) {
				$(element).closest('.control-group').removeClass('success').addClass('error');
			},
			success: function (element) {
				element.text('OK!').addClass('valid')
					.closest('.control-group').removeClass('error').addClass('success');
			}
		});

	}

};

Contact.initialize();