import numpy as np
import pandas as pd
import pickle
import requests
import json
from sklearn import svm
from sklearn import preprocessing
from sklearn import metrics
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from sklearn.ensemble import AdaBoostClassifier
#from sklearn.externals import joblib
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split


#data loading 
#OR
#imported the dataset using pandas
Dataset=pd.read_csv('G:/FYP/Trained Model/cardio_train_updated.csv')


print((Dataset.head(5)))


print(Dataset.Cardio.value_counts())


print(Dataset.isnull().sum())



def outlier_detect(df):
    for i in df.describe().columns:
        Q1=df.describe().at['25%',i]
        Q3=df.describe().at['75%',i]
        IQR=Q3 - Q1
        LTV=Q1 - 1.5 * IQR
        UTV=Q3 + 1.5 * IQR
        x=np.array(df[i])
        p=[]
        for j in x:
            if j < LTV or j>UTV:
                p.append(df[i].median())
            else:
                p.append(j)
        df[i]=p
    return df



cleaned_data=outlier_detect(Dataset)
print(cleaned_data.head(5))



def toCategorical(to_data, from_data,main_data):   
    to_data = pd.DataFrame(to_data,index= from_data.index, columns = from_data.columns)  
    to_data['Cardio'] = main_data['Cardio']   
    return to_data


#standardize data
temp_data = cleaned_data 
temp_data = temp_data.drop(columns = 'Cardio') 
standarized_data = preprocessing.StandardScaler().fit_transform(temp_data) 
standarized_data = toCategorical(standarized_data, temp_data,cleaned_data) 
del temp_data


temp_data = cleaned_data 
temp_data =  temp_data.drop(columns = 'Cardio') 
normalize_data = preprocessing.normalize(temp_data) 
normalize_data = toCategorical(normalize_data, temp_data,cleaned_data) 
del temp_data
#normalize_data.dtypes


print(standarized_data.dtypes)
print(standarized_data.head(5))



#separated the features and label from the dataset
X = standarized_data.drop(['Cardio'], axis = 1)
y = standarized_data.Cardio.values




X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.30, random_state = 6)





adaboost = AdaBoostClassifier(n_estimators=133,learning_rate=1)
 #Train Adaboost Classifer
model = adaboost.fit(X_train, y_train)

#Predict the response for test dataset
y_pred = model.predict(X_test)   

print("Accuracy:",metrics.accuracy_score(y_test, y_pred)*100)


# Saving model to disk
pickle.dump(model, open('Latestmodel.pkl','wb'))
# Loading model to compare the results
Trained_model = pickle.load(open('Latestmodel.pkl','rb'))

print(Trained_model.predict([[9401,2,173,67,113,84,1,1,1,0,1]]))