import cv2
from sklearn.neighbors import NearestNeighbors
import pandas as pd
import numpy as np

def load_colors(colors_file):
    df = pd.read_csv(colors_file)
    return df[['hue name', 'RGB']]


def train_nn_classifier(rgb_vectors, params):
    nbrs = NearestNeighbors(**params)
    return nbrs.fit(rgb_vectors)


def load_img_rgb_grayscale(img_path):
    rgb = cv2.imread(img_path)
    gs = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
    return rgb, gs

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
    return [[blue_val, green_val, red_val]]


def main():
    df = load_colors('../RGB Color fan.csv')
    rgbs = df['RGB'].values
    rgbs = [rgb.split(';') for rgb in rgbs]

    clf = train_nn_classifier(rgbs, {'n_neighbors': 3})
    rgb_img, gs_img = load_img_rgb_grayscale('clay.jpeg')
    candidate_rgb = extract_rgb_candidate(gs_img, rgb_img)

    _, candidates = clf.kneighbors(candidate_rgb, n_neighbors=3)
    print(candidates)
    #df.iloc[candidates]



if __name__ == '__main__':
    main()