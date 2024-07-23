FROM python:3.10.11-bullseye

# Установка зависимостей для обработки аудио
RUN apt-get update && apt-get install -y \
    ffmpeg \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --no-input -r requirements.txt
 
# Установка Whisper из репозитория GitHub
RUN pip install git+https://github.com/openai/whisper.git

#Кэширование 
RUN whisper --model medium dummy.wav; exit 0

COPY . .

ENV SERVER_NEURO_APP=listener.py