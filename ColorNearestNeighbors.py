import cv2
from sklearn.neighbors import NearestNeighbors
import pandas as pd


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

def extract_rgb_candidate(img):
    pass


def main():
    df = load_colors('RGB Color fan.csv')
    clf = train_nn_classifier(df['RGB'], {'n_neighbors': 3})
    rgb_img, gs_img = load_img_rgb_grayscale('img.png')
    candidate_rgb = extract_rgb_candidate(rgb_img)


    candidates = clf.kneighbors(candidate_rgb, n_neighbors=3)
    print(candidates)



if __name__ == '__main__':
    main()