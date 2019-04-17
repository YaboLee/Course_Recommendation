import csv
with open('dataset.csv', 'r') as f:
  data = list(csv.reader(f))
correct = 0
for i in range(len(data)):
    x = float(data[i][0])
    y = float(data[i][1])
    if x < 0:
        if y<3:
            correct+=1
    else:
        if y>=3:
            correct+=1
print(correct/len(data))