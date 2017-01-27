import time
from MS5611 import MS5611
import requests, json


# Set URL and Headers for POST Data to Jonny's Server
url = "http://api.jfosnight.com/sensor/1/data"
headers = {'Content-Type':'application/json', 'Accept':'application/json'}

## Basic Usage
sensor = MS5611(0)
sensor.setElevationFt(1505)
sensor.read()
sensor.printResults()

## Get individule values
tempF = sensor.getTempF()
press = sensor.getPressureAdj()
print
print "Values from sensor"
print tempF, "F", press, "hPa"

def sendData():
    #Send the data to the server for logging purposes
    data = {'temperature': sensor.getTempF(), 'pressure': sensor.getPressureAdj()}
    try:
        requests.post(url, data=json.dumps(data), headers=headers)
        print "Uploaded Data", time.ctime()
        print sensor.getTempF(), "F", sensor.getPressureAdj(), "hPa"
        pass
    except:
        print "Unable to Post data to server"

while(True):
    sensor.read()
    sendData()
    time.sleep(30)

# ## In a loop (10 times)
# print
# time.sleep(5)
# for x in range(10):
#     print time.ctime()
#     sensor.read()
#     sensor.printResults()
#     print
#     time.sleep(5)
