import sqlite3
from objects import User

DB_FILE = 'plant.db'

class model():
    def __init__(self):
        # Make sure our database exists
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        
        #make sure the user table exists
        try:
            cursor.execute("select count(rowid) from users")
        except sqlite3.OperationalError:
            cursor.execute("create table users (user_id int primary key, username text UNIQUE, password text)")
        
        #make sure the plants table exists
        try:
            cursor.execute("select count(rowid) from plants")
        except sqlite3.OperationalError:
            cursor.execute("create table plants (user_id int, name text, water_interval int, notes text, FOREIGN KEY(user_id) REFERENCES users(user_id))")
        cursor.close()
    
    def get_user_by_username(self, username):
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM users WHERE username=\'"+str(username)+"\'")
        user = cursor.fetchall()
        if user:
            user = user[0]
        return User(user[0], user[1], user[2])
    
    def get_user_by_id(self, user_id):
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM users WHERE user_id="+str(user_id))
        user = cursor.fetchall()
        if user:
            user = user[0]
        return User(user[0], user[1], user[2])

    def create_user(self, username, password):
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        sql = "INSERT INTO users (username, password) VALUES (" +"\'"+  username + "\'"+ "," + "\'" + password + "\'" + ")"
        try:
            cursor.execute(sql)
        except:
            return False
        return True


    def get_plants(self, user_id):
        return {"name":"spider plant", "water_interval": 5}