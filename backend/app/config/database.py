from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
import urllib.parse

load_dotenv()

# SQL Server connection using Windows Authentication
connection_string = (
    "mssql+pyodbc:///?odbc_connect="
    "Server=localhost;"
    "Database=terrain360;"
    "Trusted_Connection=yes;"
    "driver=ODBC+Driver+17+for+SQL+Server"
)

# URL encode the connection string
encoded_connection_string = urllib.parse.quote_plus(
    "Server=localhost;Database=terrain360;Trusted_Connection=yes;driver=ODBC+Driver+17+for+SQL+Server"
)
SQLSERVER_URL = f"mssql+pyodbc:///?odbc_connect={encoded_connection_string}"

engine = create_engine(SQLSERVER_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()