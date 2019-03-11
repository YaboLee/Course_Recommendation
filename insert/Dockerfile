
FROM python:3.6

RUN apt-get update

RUN pip install mysql-connector-python

COPY . .

CMD ["python", "csvToSQL.py"]
# CMD ["bash"]