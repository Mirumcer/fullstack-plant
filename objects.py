class User():
    def __init__(self, user_id, username, password):
        self.id = user_id
        self.username = username
        self.password = password

class Plant():
    def __init__(self, id, user_id, name, img_path, water_interval, days_until_water, notes):
        self.id = id
        self.user_id = user_id
        self.name = name
        self.img_path = img_path
        self.notes = notes
        self.water_interval = water_interval
        self.days_until_water = days_until_water