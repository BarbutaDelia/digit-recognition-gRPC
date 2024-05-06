// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var digit_recognition_pb = require('./digit_recognition_pb.js');

function serialize_digitrecognition_ImageRequest(arg) {
  if (!(arg instanceof digit_recognition_pb.ImageRequest)) {
    throw new Error('Expected argument of type digitrecognition.ImageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_digitrecognition_ImageRequest(buffer_arg) {
  return digit_recognition_pb.ImageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_digitrecognition_PredictionResult(arg) {
  if (!(arg instanceof digit_recognition_pb.PredictionResult)) {
    throw new Error('Expected argument of type digitrecognition.PredictionResult');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_digitrecognition_PredictionResult(buffer_arg) {
  return digit_recognition_pb.PredictionResult.deserializeBinary(new Uint8Array(buffer_arg));
}


// The digit recognition service definition.
var DigitRecognitionServiceService = exports.DigitRecognitionServiceService = {
  // Sends an image and receives a prediction result
sendImage: {
    path: '/digitrecognition.DigitRecognitionService/SendImage',
    requestStream: false,
    responseStream: false,
    requestType: digit_recognition_pb.ImageRequest,
    responseType: digit_recognition_pb.PredictionResult,
    requestSerialize: serialize_digitrecognition_ImageRequest,
    requestDeserialize: deserialize_digitrecognition_ImageRequest,
    responseSerialize: serialize_digitrecognition_PredictionResult,
    responseDeserialize: deserialize_digitrecognition_PredictionResult,
  },
};

exports.DigitRecognitionServiceClient = grpc.makeGenericClientConstructor(DigitRecognitionServiceService);
