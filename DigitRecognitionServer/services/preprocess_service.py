import io
import base64
import numpy as np
import os
from PIL import Image
from torchvision import transforms
import time

def process_image(data_url):
    upload_folder = 'uploaded_images'
    os.makedirs(upload_folder, exist_ok=True)
    # np.set_printoptions(threshold=np.inf)
    header, image_data = data_url.split(',', 1)
    image_binary = base64.b64decode(image_data)

    image = Image.open(io.BytesIO(image_binary))

    grayscale_pixel_matrix = np.array(image.convert('L'))
    inverted_pixel_matrix = 255 - grayscale_pixel_matrix
    inverted_image = Image.fromarray(inverted_pixel_matrix.astype('uint8'))

    transform = transforms.Compose([
        transforms.Resize((28, 28)),
        transforms.ToTensor(),
    ])

    processed_image = transform(inverted_image)
    processed_pixel_matrix = np.array(processed_image)
    input_tensor = processed_image.unsqueeze(0)

    image_name = 'uploaded_image' + str(int(time.time())) + '.png'
    image_filename = os.path.join(upload_folder, image_name)
    inverted_image.save(image_filename)

    return input_tensor