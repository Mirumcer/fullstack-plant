import sqlite3
from objects import User, Plant

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
            cursor.execute("create table users (user_id integer primary key, username text UNIQUE, password text)")
        
        #make sure the plants table exists
        try:
            cursor.execute("select count(rowid) from plants")
        except sqlite3.OperationalError:
            cursor.execute("create table plants (id integer primary key, user_id int, name text, water_interval int, days_until_water int, notes text, img_path, FOREIGN KEY(user_id) REFERENCES users(user_id))")
        
        #make sure the user table exists
        try:
            cursor.execute("select count(rowid) from feedback")
        except sqlite3.OperationalError:
            cursor.execute("create table feedback (name text, email text, message text)")
        
        cursor.close()
    
    def get_user_by_username(self, username):
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM users WHERE username=\'"+str(username)+"\'")
        user = cursor.fetchall()
        if user:
            user = user[0]
        cursor.close()
        return User(user[0], user[1], user[2])
    
    def get_user_by_id(self, user_id):
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM users WHERE user_id="+str(user_id))
        user = cursor.fetchall()
        if user:
            user = user[0]
        cursor.close()
        return User(user[0], user[1], user[2])

    def create_user(self, username, password):
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        
        sql = "INSERT INTO users (username, password) VALUES (" +"\'"+  username + "\'"+ "," + "\'" + password + "\'" + ")"
        try:
            cursor.execute(sql)
        except:
            return False
        connection.commit()
        cursor.close()
        return True

    def add_plant(self, user, plant):
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        sql = "INSERT INTO plants (user_id, name, water_interval, days_until_water, img_path, notes) VALUES (" +"\'"+  str(user.id) + "\'"+ "," + "\'" + plant.name + "\'"  + "," + "\'" + str(plant.water_interval) + "\'"+ "," + "\'" + str(plant.water_interval) + "\'"+ "," + "\'" + plant.img_path + "\'"+ "," + "\'" + plant.notes + "\'"+")"
        try:
            cursor.execute(sql)
        except:
            return False

        connection.commit()
        cursor.close()
        return True

    def get_plants(self, user):
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        sql = "SELECT * FROM plants WHERE user_id =" + str(user.id)
        try:
            cursor.execute(sql)
        except:
            return False
        rows = cursor.fetchall()
        plants = []
        for plant in rows:
            plants.append(Plant(id=plant[0], user_id=plant[1], name=plant[2], img_path=plant[6],water_interval=plant[3], days_until_water=plant[4], notes=plant[5]))
        return plants

    def add_feedback(self, name, email, message):
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        message = message.replace("\'","\'\'")
        sql = "INSERT INTO feedback (name, email, message) VALUES (" +"\'"+  name + "\'"+ "," + "\'" + email + "\'"  + "," + "\'" + message + "\'"+")"
        try:
            cursor.execute(sql)
        except:
            return False

        connection.commit()
        cursor.close()
        return True