from flask import Flask, json
import requests
url = 'http://127.0.0.1:80/api'
response = requests.post(url,json={'Age':9057,'Gender':2,'Height':173,'Weight':67,'Ap_Hi':115,'Ap_Lo':85,'Cholesterol':2,'Gluc':3,'Smoke':1,'Alco':0,'Active':1})
print (response.json())