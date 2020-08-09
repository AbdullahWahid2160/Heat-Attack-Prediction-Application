# Import libraries
from flask import Flask, request, jsonify, make_response
import pickle

app = Flask(__name__)

Trained_model = pickle.load(open('Latestmodel.pkl','rb'))

@app.route('/api', methods=["POST"])
def Makeprediction():
    
    int_features = []
    data = request.get_json()   
    print("Data : ", data)
    
    for key, value in data.items():
        int_features.append(value)
    print("Integer Array", int_features)
    
    prediction = Trained_model.predict([int_features])   
    print("Trained_model",prediction[0])
    
    output= int(prediction[0])   
    print("output",output)
    
    return make_response(jsonify(output))

if __name__ == '__main__':
    app.run(host='192.168.43.168')