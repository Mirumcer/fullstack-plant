# fullstack-plant
repo for CS465 Full stack final project. A plant dashboard


## Setup


## to run a local development server 
`pip3 install -r requirements.txt`

`python3 app.py`

you must also set the google cloud credentials with `export GOOGLE_APPLICATION_CREDENTIALS="[PATH]` for the google storage bucket that is set to public and change the img path in `app.py`


## to run a production server
`pip3 install -r requirements.txt`

run the flask app with the gunicorn wrapper `gunicorn app:app`

you must also set the google cloud credentials with `export GOOGLE_APPLICATION_CREDENTIALS="[PATH]` for the google storage bucket that is set to public and change the img path in `app.py`



## Documentation
flask: https://flask.palletsprojects.com/en/1.1.x/

flask-jwt: handle JWT authorization

APScheduler: schedule the once daily task of chnaging the days_until_water value

bcrypt: password hasher

Google Cloud: Bucket storage to host user plant images

