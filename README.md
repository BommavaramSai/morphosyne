# Installation

```bash
├── Morphosyne
│   ├── webapp
│   │   ├── backend
│   │   │   ├── synergy           # djangoproject
│   │   │   ├── accounts          # djangoapp
│   │   │   └── manage.py
│   │   ├── frontend
│   │   │   ├── src
│   │   │   │   ├── pages
│   │   │   │   ├── components
│   │   │   │   └── reducers      # Redux reducers
│   │   │   ├── Store.js
│   │   │   ├── App.js
│   │   │   └── index.js
└── └── └── .gitignore
```

```shell
mkdir webapp
cd webapp
mkdir backend
cd backend
```
 
### Backend
```python
python --version                            # Check Python version
python -m venv pyEnv                        # Create a Python virtual environment
pyEnv\scripts\activate                      # Activate the Python virtual environment
python -m pip install --upgrade pip         # Upgrade pip to the latest version
pip install django                          # Install Django framework
pip install djangorestframework             # Install Django REST framework for building APIs
pip install djangorestframework-simplejwt   # Install Django REST framework JWT for token-based authentication
pip install django-cors-headers             # Install Django CORS headers for Cross-Origin Resource Sharing (CORS)
pip install psycopg2 psycopg2-binary        # Install psycopg2 and psycopg2-binary for PostgreSQL database connection
pip install djoser                          # Install Djoser for user authentication endpoints
pip freeze > requirements.txt               # Generate a requirements.txt file containing project dependencies
 ```
### Frontend
```shell
mkdir frontend
cd frontend
```

```js
npx create-react-app                        # Create a new React application using Create React App
npm install axios                           # Install Axios for making HTTP requests
npm install react-redux                     # Install React Redux for state management
npm install react-helmet                    # Install React Helmet for managing document head tags
npm install react-router-dom                # Install React Router DOM for client-side routing
npm install @reduxjs/toolkit                # Install Redux Toolkit for simplified Redux setup

```

### Run the Application
#### Backend Server
```shell
C:\Users\Desktop\Morphosyne\webapp\backend> python manage.py makemigration
C:\Users\Desktop\Morphosyne\webapp\backend> python manage.py migrate
C:\Users\Desktop\Morphosyne\webapp\backend> python manage.py runserver
```
#### Frontend Server
```shell
C:\Users\Desktop\Morphosyne\webapp\frontend> npm start
```



