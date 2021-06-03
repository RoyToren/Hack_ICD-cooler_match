import torch
import numpy as np
from torchvision import transforms
import torchvision


# model = torch.hub.load('pytorch/vision:v0.9.0', 'mobilenet_v2', pretrained=True)
model = torchvision.models.segmentation.lraspp_mobilenet_v3_large(pretrained=True)
model.eval()

preprocess = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

if torch.cuda.is_available():
    model.to('cuda')


def process_frame(frame: np.ndarray):
    input_tensor = preprocess(frame)
    input_batch = input_tensor.unsqueeze(0)  # create a mini-batch as expected by the model
    # move the input and model to GPU for speed if available
    if torch.cuda.is_available():
        input_batch = input_batch.to('cuda')
    with torch.no_grad():
        output = model(input_batch)['out'][0]
    output_predictions = output.argmax(0)
    return output_predictions.byte().cpu().numpy()

