from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from pydub import AudioSegment
import whisper
from pyannote.audio import Pipeline
from io import BytesIO

app = Flask(__name__)

#Загрузка pl
pipeline = Pipeline.from_pretrained('pyannote/speaker-diarization-3.1', use_auth_token='****')
#загрузка модели whisper
model = whisper.load_model("medium")

def get_speech_separation_and_recognition(audio_name, expansion, speaker_count):
    #Функция обработки записи нейронными сетями.
    return

@app.route('/process_audio', methods=['POST'])
def process_file():
    try:
        if 'myfile' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['myfile']
        speaker_count = request.form.get('numSpikers')
        file_content = file.read()
        # Получаем расширение файла из его имени
        file_extension = file.filename.split('.')[-1].lower()

        # Обработка файла
        results = get_speech_separation_and_recognition(BytesIO(file_content), file_extension, int(speaker_count))
                
        return jsonify(results), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
