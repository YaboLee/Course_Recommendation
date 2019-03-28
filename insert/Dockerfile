
FROM python:3.6

RUN apt-get update

RUN pip install mysql-connector-python

RUN pip install flask

COPY . .

CMD ["python", "csvToSQLfull.py"]
# CMD ["bash"]