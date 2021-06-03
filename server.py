import time
from flask import Flask, render_template, request,jsonify
from skimage.util import invert
from skimage import img_as_bool, io, color, morphology, img_as_ubyte
from PIL import Image
from io import BytesIO
import os
import threading
import numpy as np
import cv2
import base64
import random


app = Flask(__name__, static_folder='./build', static_url_path='/')
tasks = {}
results = {}
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/api/returnResults/<int:task_id>')
def get_results(task_id):
    if tasks[task_id].is_alive():
        return jsonify({'status': 'running'})
    try:
        tasks[task_id].join()
        return jsonify({'status': 'finished', 'result': results[task_id]})
    except RuntimeError:
        return jsonify({'status': 'not started'})


def do_work(results, task_id):   
    results[task_id] = True
        
@app.route('/api/checkColor', methods=['POST'])
def start_task(): 
    cv_image = process_image(request.files['images'])
    new_task_id  = random.randint(0, 1000000)
    task = threading.Thread(target=do_work, kwargs={'results' : results, 'task_id' : new_task_id})
    task.start()
    tasks[new_task_id] = task
    results[new_task_id] = None
    return jsonify({'task_id': new_task_id, 'total_tasks': len(tasks)})


def process_image(raw_image):
    img = Image.open(raw_image)
    #convert string data to numpy array
    img_array = np.array(img)
    # convert numpy array to image
    greyscale_img = img_array
    cv_image = cv2.cvtColor(img_as_ubyte(greyscale_img), cv2.COLOR_BGR2GRAY)
    return cv_image