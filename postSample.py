#!/usr/bin/env python2.7

import requests
from time import sleep
from datetime import datetime

eventCounter = 0

eventaURL = "https://project3-assets-overlord.herokuapp.com/epc-events"

while(eventCounter <= 10):
    eventCounter+=1
    data = {
        "epc": "ZZZZZZZZZZZZZZZZZZZZZ",
        "antenna_port": "2",
        "event_time": datetime.now()
    }
    r = requests.post(eventaURL, data=data)
    print(r.status_code, r.reason)
    sleep(2) # Time in Seconds
