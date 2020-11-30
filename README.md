# fullstack-plant
repo for CS465 Full stack final project. A plant dashboard

### POST /auth
{
    "username":"Username",
    "password":"Password"
}
returns a JWT

### GET /plants
{
    "Authorization":" "JWT [token]"
}
returns a JSON object with all the user's plants

### POST /plant
submit a form with name, description, water_interval, and img

### POST /new_user
{
    "username":"Username",
    "password":"Password"
}
returns 200 is user was made, otherwise it returns 400

### POST /feedback
{
    "name":"Name",
    "email":"email@email.com",
    "message":"Message"
}
returns status code

## Setup


## to run a local development server 
`pip3 install -r requirements.txt`

`python3 app.py`

you must also set the google cloud credentials with `export GOOGLE_APPLICATION_CREDENTIALS="[PATH]` for the google storage bucket that is set to public and change the img path in `app.py`


## to run a production server
`pip3 install -r requirements.txt`

run the flask app with the gunicorn wrapper `gunicorn app:app`

you must also set the google cloud credentials with `export GOOGLE_APPLICATION_CREDENTIALS="[PATH]` for the google storage bucket that is set to public and change the img path in `app.py`


NOTE: do not run as production server until moving the password salt to an OS environment variable


## Documentation
flask: https://flask.palletsprojects.com/en/1.1.x/

flask-jwt: handle JWT authorization

APScheduler: schedule the once daily task of chnaging the days_until_water value

bcrypt: password hasher

Google Cloud: Bucket storage to host user plant images

