const grpc = require('@grpc/grpc-js');
const services = require('./server/digit_recognition_grpc_pb');
const messages = require('./server/digit_recognition_pb');

function sendImage(call, callback) {
    const requestImage = call.request.getImage();
    // Process the image and predict
    const result = new messages.PredictionResult();
    result.setPredictedLabel('3'); // Dummy prediction
    result.setProbabilityDistributionList([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]); // Dummy distribution
    callback(null, result);
}

function getServer() {
    const server = new grpc.Server();
    server.addService(services.DigitRecognitionServiceService, {
        sendImage: sendImage
    });
    return server;
}

const server = getServer();
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Server running at http://0.0.0.0:50051');
});
