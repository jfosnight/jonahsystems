import time
from MS5611 import MS5611

## Basic Usage
sensor = MS5611(0)
sensor.setElevationFt(1420)
sensor.read()
sensor.printResults()



## Get individule values
tempF = sensor.getTempF()
press = sensor.getPressureAdj()
print
print "Values from sensor"
print tempF, "F", press, "hPa"



## In a loop (10 times)
print
time.sleep(5)
for x in range(10):
    print time.ctime()
    sensor.read()
    sensor.printResults()
    print
    time.sleep(5)
