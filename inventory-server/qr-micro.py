import segno
import base64
import sys
from io import BytesIO

def generate_micro_qr(data):
    qr = segno.make_micro(data,mode='alphanumeric')
    buffered = BytesIO()
    qr.save(buffered, kind='png')
    img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
    return img_str

if __name__ == "__main__":
    data = sys.argv[1]
    qr_code = generate_micro_qr(data)
    print(qr_code)