import sys

with open(sys.argv[1]) as file:
  file = file.readlines()


for line in file:
	if count % 2 == 0:
	#	print (line.split()[1])
		tot = tot + float(line.split()[1])
		count+=1 