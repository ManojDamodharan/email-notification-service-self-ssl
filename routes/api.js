const express = require('express');
const router = express.Router();
const fs = require('fs');
var configJSON = JSON.parse(fs.readFileSync('./config.json'));
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({ //This defines how the Data is sent in the Email 
    host: 'smtp.gmail.com', // SMTP hostname for Gmail
    port: 465, // secure:true for port 465, secure:false for port 587
    secure: true, // port for secure SMTP
    auth: {
        user: configJSON.gmail.email,
        pass: configJSON.gmail.password,
    },
});

router.get('/', (req, res) => { //ES6 Syntax for CallBack function
    res.send("Response is Coming from the Routed Service File 'api.js'");
})

router.post('/sendemailnotification', (req, res) => {
	console.log(req.body);
	let userData = req.body;
	let responseMailOptions = {
	    from: `${configJSON.mailSenderName} damodharangovt@gmail.com`,
	    to: `${userData.email}`,
	    subject: 'Response Email',
	    text: `Hello ${userData.name}..! Thank You for contacting us. We'll get in touch with you soon.`,
        html: `Hello <b>${userData.name}</b>..!<br><br>Thank You for contacting us. We'll get in touch with you soon.<br><br>Thanks & Regards<br>${configJSON.mailSenderName}<br><br><i>NOTE: This is a system-generated e-mail. Please do not reply to this e-mail.</i>`,
        attachments: [
            {   //using URL as an attachment
            filename: 'Greetings.png',
            path: 'https://img.itch.zone/aW1hZ2UvMTc5MjA0LzgzNzE3NS5wbmc=/original/GEC8ys.png'
            }
        ]
    };
    let acknowledgementMailOptions = {
	    from: `${configJSON.mailSenderName} damodharangovt@gmail.com`,
	    to: `${configJSON.gmail.email}`,
	    subject: 'Acknowledgement Email',
        text: `::: Customer Details ::: Name: ${userData.name}, Phone: ${userData.phone}, Email: ${userData.email}, Subject: ${userData.subject}, Message: ${userData.message}`,
        html: `::: Customer Details :::<br><br><b>Name:</b> ${userData.name}<br><b>Phone:</b> ${userData.phone}<br><b>Email:</b> ${userData.email}<br><b>Subject:</b> ${userData.subject}<br><b>Message:</b> ${userData.message}<br><br><i>NOTE: This is a system-generated e-mail. Please do not reply to this e-mail.</i>`
	};
	transporter.sendMail(responseMailOptions, (error, emailData) => {
	    if(error){
	        console.log('err');
	        console.log(error);
	    }
	    console.log('Response Email Sent Succesfully');
	    console.log(emailData);
    });
    transporter.sendMail(acknowledgementMailOptions, (error, emailData) => {
	    if(error){
	        console.log('err');
	        console.log(error);
	    }
	    console.log('Acknowledgement Email Sent Succesfully');
	    console.log(emailData);
	});
	res.status(200).send({notificationSent: true, success: true, message: 'Email Notification has been sent succesfully.'});
})


module.exports = router;