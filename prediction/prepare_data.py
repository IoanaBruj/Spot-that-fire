import numpy as np
import pandas as pd
import yaml
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import SMOTE

RANDOM_STATE=0

def prepare(path):
    with open('data/fire_archive_2017.json', 'r') as f:
        fire_data = yaml.load(f.read())
    
    df_fire = pd.DataFrame(fire_data)
    # Conver to month
    df_fire['month'] = df_fire['acq_date'].apply(lambda dt: dt.month)
    df_fire['label'] = df_fire['confidence'].apply(lambda c: 1 if c > 90 else 0)

    # Convert latitude and longitude to 3D coordinates
    df_fire['x'] = df_fire['latitude'].apply(lambda lat: np.cos(lat)) * df_fire['longitude'].apply(lambda lon: np.cos(lon))
    df_fire['y'] = df_fire['latitude'].apply(lambda lat: np.cos(lat)) * df_fire['longitude'].apply(lambda lon: np.sin(lon))
    df_fire['z'] = df_fire['latitude'].apply(lambda lat: np.sin(lat))

    # Remove columns that don't give much information about our label
    df_fire_lean = df_fire.drop(['acq_date', 'longitude', 'latitude', 'acq_time', 'confidence', 
                                'instrument', 'satellite', 'scan', 'track', 'version'], axis=1)

    return df_fire_lean

def preprocess(df, over_sample=False, test_split=0.4):
    # Split features from label
    X_cols = ['bright_t31', 'brightness', 'frp', 'x', 'y', 'z', 'month']
    X = df[X_cols]
    Y = df['label']
    
    # Scale continuous features
    scaled_cols = ['bright_t31', 'brightness', 'frp']
    X_train_raw, X_test_raw, y_train, y_test = train_test_split(X, Y, test_size=test_split, random_state=RANDOM_STATE)
    scaler = StandardScaler()
    scaler.fit(X_train_raw[scaled_cols])
    X_train = X_train_raw.copy()
    X_train[scaled_cols] = scaler.transform(X_train_raw[scaled_cols])

    # Encode categorical features
    ohe = OneHotEncoder(categorical_features=[X_train.columns.tolist().index('month')])
    X_train = ohe.fit_transform(X_train)
    
    # The dataset is imbalanced, so if True we oversample the imbalanced label
    
    if over_sample:
        smote = SMOTE()
        X_train_resamp, y_train_resamp = smote.fit_resample(X_train, y_train)
        print(X_train.shape, y_train.shape)
    
        return X_train_resamp, y_train_resamp, X_test_raw, y_test, scaler, ohe, scaled_cols
        
    return X_train, y_train, X_test_raw, y_test, scaler, ohe, scaled_cols


