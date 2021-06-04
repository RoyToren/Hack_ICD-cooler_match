from Model import process_frame
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from PIL import Image
import cv2


def recolor(img, i, j, edges, color):
    img_cpy = img.copy()
    h, w, _ = img_cpy.shape
    init_i = i
    init_j = j

    while i >= 0 and edges[i][j] == 0:
        while j >= 0 and edges[i][j] == 0:
            img_cpy[i][j] = color
            j -= 1

        j = init_j + 1
        while j < w and edges[i][j] == 0:
            img_cpy[i][j] = color
            j += 1
        i -= 1
        j = init_j

    i = init_i + 1
    j = init_j
    while i < h and edges[i][j] == 0:
        while j >= 0 and edges[i][j] == 0:
            img_cpy[i][j] = color
            j -= 1

        j = init_j + 1
        while j < w and edges[i][j] == 0:
            img_cpy[i][j] = color
            j += 1
        i += 1
        j = init_j

    i = init_i
    j = init_j

    while j >= 0 and edges[i][j] == 0:
        while i >= 0 and edges[i][j] == 0:
            img_cpy[i][j] = color
            i -= 1

        i = init_i + 1
        while i < h and edges[i][j] == 0:
            img_cpy[i][j] = color
            i += 1
        j -= 1
        i = init_i

    j = init_j + 1
    i = init_i
    while j < w and edges[i][j] == 0:
        while i >= 0 and edges[i][j] == 0:
            img_cpy[i][j] = color
            i -= 1

        i = init_i + 1
        while i < h and edges[i][j] == 0:
            img_cpy[i][j] = color
            i += 1
        j += 1
        i = init_i

    return img_cpy


def paint_segment(img, i, j, rgb_choice):
    cv2.blur(img, (15, 15), 0)
    edges = cv2.Canny(img, 100, 180)
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    return recolor(rgb, i, j, edges, rgb_choice)


def main():
    img = cv2.imread('../images/wall.jpeg', cv2.IMREAD_COLOR)
    repainted = paint_segment(img, img.shape[0] // 2, img.shape[1] // 2, [210, 160, 160])

    plt.imshow(repainted)
    plt.show()

    # img_cpy = img.copy()
    # recolor(img_cpy, img.shape[0] // 2, img.shape[1] // 2, edges, 100)
    # cv2.cvtColor(img_cpy, cv2.COLOR_GRAY2RGB)

if __name__ == '__main__':
    main()