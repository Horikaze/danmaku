from flask import Flask, request, jsonify
from threp import THReplay
import os
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


@app.route("/upload", methods=["POST"])
def upload_file():
    if request.method == "POST":
        file = request.files["replay"]
        save_path = os.path.join(os.path.dirname(__file__), file.filename)
        file.save(save_path)
        tr = THReplay(f"{save_path}")
        base_info = tr.getBaseInfoDic()
        stage_score = tr.getStageScore()
        player = tr.getPlayer()
        slow_rate = tr.getSlowRate()
        date = tr.getDate()
        frame_count = tr.getFrameCount()
        z_keys = len(tr.getZ())
        x_keys = len(tr.getX())
        c_keys = len(tr.getC())
        rpy_name = file.filename
        shift = len(tr.getShift())
        os.remove(save_path)
        flat_response = {
            "player": player,
            **base_info,
            "stage_score": stage_score,
            "slow_rate": slow_rate,
            "date": date,
            "frame_count": frame_count,
            "z_keys": z_keys,
            "x_keys": x_keys,
            "c_keys": c_keys,
            "shift": shift,
            "rpy_name": rpy_name,
        }

        return jsonify(flat_response)


if __name__ == "__main__":
    app.run(debug=True)
