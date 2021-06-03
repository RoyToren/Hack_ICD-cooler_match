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
from sklearn.neighbors import NearestNeighbors
import pandas as pd

def load_colors(colors_file):
    df = pd.read_csv(colors_file)
    return df[['hue name', 'RGB']]

def train_nn_classifier(rgb_vectors, params):
    nbrs = NearestNeighbors(**params)
    return nbrs.fit(rgb_vectors)


def rgb_to_name(colors_file):
    df = pd.read_csv(colors_file)
    rgb_name_dict = dict(zip(df['RGB'], df['hue name']))
    # return dict(zip(df['RGB'], df['hue name']))
    ret = {}
    for k, v in rgb_name_dict.items():
        ret[convert_to_tuple(k)] = v
    return ret

def convert_to_tuple(rgb):
    _rgb = tuple(int(x) for x in rgb.split(';'))
    return _rgb

app = Flask(__name__, static_folder='./build', static_url_path='/')
tasks = {}
results = {}
global clf, rgbs, rgb_names
clf = {}
rgbs = {}
rgb_names = {}
@app.before_first_request
def startup():
    global clf, rgbs, rgb_names
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, 'public', 'RGB_Color_fan.csv')
    df = load_colors(json_url)
    rgbs = df['RGB'].values
    rgbs = [rgb.split(';') for rgb in rgbs]
    rgb_names = rgb_to_name(json_url)
    clf = train_nn_classifier(rgbs, {'n_neighbors': 3})

def extract_rgb_candidate(img_gray,img_color):
    y, x = img_gray.shape
    startx = x // 2
    starty = y // 2
    trys = img_color[starty:starty + 20, startx:startx + 20]

    gauss_img = cv2.bilateralFilter(trys, 9, 75, 75)
    gauss_img = cv2.GaussianBlur(gauss_img, (9, 9), 0)

    red_val = int(np.average(gauss_img[:, :, 0]))
    green_val = int(np.average(gauss_img[:, :, 1]))
    blue_val = int(np.average(gauss_img[:, :, 2]))
    return [[red_val, green_val, blue_val]]
    
def process_image(raw_image):
    img = Image.open(raw_image)
    #convert string data to numpy array
    bgr_image = np.array(img)
    # convert numpy array to image
    greyscale_img = bgr_image
    gray_image = cv2.cvtColor(img_as_ubyte(greyscale_img), cv2.COLOR_BGR2GRAY)
    bgr_image = cv2.cvtColor(img_as_ubyte(greyscale_img), cv2.COLOR_BGRA2BGR)
    return gray_image,bgr_image
    
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

@app.route('/')
def index():
    return app.send_static_file('index.html')

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

def do_work(gray_image, color_image, results, task_id, clf):   
    candidate_rgb = extract_rgb_candidate(gray_image, color_image)
    _, candidates = clf.kneighbors(candidate_rgb, n_neighbors=3)
    res = rgbs[candidates[0][0]]
    color_name = rgb_names[tuple([int(r) for r in res])]
    color_value = np.array(res).tolist()
    results[task_id] = {'name' : color_name, 'val': color_value}
        
@app.route('/api/checkColor', methods=['POST'])
def start_task(): 
    gray_image, color_image = process_image(request.files['images'])
    new_task_id  = random.randint(0, 1000000)
    task = threading.Thread(target=do_work, kwargs={'gray_image' : gray_image,'color_image' : color_image,'results' : results, 'task_id' : new_task_id, 'clf' : clf})
    task.start()
    tasks[new_task_id] = task
    results[new_task_id] = None
    return jsonify({'task_id': new_task_id, 'total_tasks': len(tasks)})


