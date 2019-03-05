FROM python:3.6

RUN apt-get update

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN pip install --no-cache-dir -r requirements.txt

ENV FLASK_ENV="Development"
ENV FLASK_APP="main.py"

# CMD ["flask", "run"]
CMD ["python", "main.py"]
