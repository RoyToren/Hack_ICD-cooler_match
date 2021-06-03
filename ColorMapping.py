import pandas as pd

def load_colors(colors_file):
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

rgb_name = load_colors('RGB Color fan.csv')
print(rgb_name)
