from concurrent import futures
import grpc
import torch
import torch.nn.functional as F

import digit_recognition_pb2
import digit_recognition_pb2_grpc
from model import CNN
from services import preprocess_service

class DigitRecognitionServicer(digit_recognition_pb2_grpc.DigitRecognitionServiceServicer):
    def __init__(self):
        self.model = CNN()
        self.model.load_state_dict(torch.load('trained_model.pth', map_location=torch.device('cpu')))
        self.model.eval()

    def SendImage(self, request, context):
        try:
            image_data = request.image
            input_tensor = preprocess_service.process_image(image_data)
            with torch.no_grad():
                output = self.model(input_tensor)
                probabilities = F.softmax(output, dim=1)
                _, predicted = torch.max(output, 1)
                # print("Predicted label:", predicted)
                # print(str(predicted.item()))
                # print(probabilities.numpy().tolist()[0])

            return digit_recognition_pb2.PredictionResult(
                predicted_label=str(predicted.item()),
                probability_distribution=probabilities.numpy().tolist()[0]
            )
        except Exception as e:
            print("Server error:", e)
            context.set_details(str(e))
            context.set_code(grpc.StatusCode.INTERNAL)
            return digit_recognition_pb2.PredictionResult()


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    digit_recognition_pb2_grpc.add_DigitRecognitionServiceServicer_to_server(
        DigitRecognitionServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print('Server started')
    server.wait_for_termination()

if __name__ == '__main__':
    serve()

