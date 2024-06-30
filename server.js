const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Replace these with your Twilio credentials
const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const client = new twilio(accountSid, authToken);

app.post('/send-message', (req, res) => {
    const { username, phone, totalPrice } = req.body;

    client.messages.create({
        body: `Hello ${username}, your order has been processed. Total amount: $${totalPrice}`,
        to: phone,  // Text this number
        from: '+your_twilio_phone_number' // From a valid Twilio number
    })
    .then((message) => res.status(200).send({ success: true, message: message.sid }))
    .catch((error) => res.status(500).send({ success: false, error: error.message }));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
