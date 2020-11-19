class User():
    def __init__(self, user_id, username, password):
        self.id = user_id
        self.username = username
        self.password = password

class Plant():
    def __init__(self, id, name, img_path, notes):
        self.id = id
        self.name = name
        self.img_path = img_path
        self.notes = notes