const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const grpc = require('@grpc/grpc-js');
const services = require('./server/digit_recognition_grpc_pb');
const messages = require('./server/digit_recognition_pb');
const app = express();

const port = 6789;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

const client = new services.DigitRecognitionServiceClient(
    'localhost:50051',
    grpc.credentials.createInsecure()
);

app.post('/upload', (req, res) => {
    const image = req.body.image;
    const request = new messages.ImageRequest();
    request.setImage(image);

    client.sendImage(request, (error, response) => {
        if (error) {
            console.error('Error in gRPC call:', error);
            return res.status(500).json({error: error.message});
        }
        console.log(response.getProbabilityDistributionList());
        res.json({
            predicted_label: response.getPredictedLabel(),
            probability_distribution: response.getProbabilityDistributionList()
        });
    });
});

app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:` + port));