import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float, Date, Numeric

from flask import Flask, jsonify, render_template

import datetime as dt

#################################################
# Database1 Setup
#################################################

engine = create_engine("sqlite:///modeldata.sqlite")
conn = engine.connect()

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/api/")
def apiwa():
    """Return the data as json"""
    # Sets an object to utilize the default declarative base in SQL Alchemy
    Base = declarative_base()

    # Creates Classes which will serve as the anchor points for our Tables
    class data(Base):
        __tablename__ = 'model_data'
        index = Column(Integer, primary_key=True)
        no_of_cases = Column(Integer)
        no_of_trip = Column(Integer)
        reduced_by = Column(Integer)
        
    data = session.query(data)
    session.close()

    # Create a list to hold data'

    list = []
    for result in data:
        row = {}
        row["no_of_cases"] = result.no_of_cases
        row["no_of_trip"] = result.no_of_trip
        row["reduced_by"] = result.reduced_by
        list.append(row)
 
    return jsonify(list)

@app.route("/firstwave")
def firstwave():
    return render_template('firstwave.html')

@app.route("/secondwave")
def secondwave():
    return render_template('secondwave.html')

if __name__ == "__main__":
    app.run(debug=True)