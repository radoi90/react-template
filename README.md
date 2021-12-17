# Getting Started with this template

## Installation
Install the frontend:

    yarn

Install the backend:

    cd ./backend
    pip install -r requirements.txt

# Running
Start the backend:

    cd ./backend
    gunicorn wsgi:app --workers=1

Start the frontend (might have to change the backend URL):

    REACT_APP_API_URL=http://0.0.0.0:8000 yarn run start
