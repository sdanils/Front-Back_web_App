FROM python:3.11.2-alpine

# отключаем python кэш
ENV PYTHONDONTWRITEBYTECODE 1
# отключаем буферизацию сообщений python
ENV PYTHONBUFFERED 1

ENV SERVER_APP=server.py

ADD requirements.txt .

RUN pip install --no-cache-dir --no-input -r requirements.txt && pip cache purge

COPY . .

