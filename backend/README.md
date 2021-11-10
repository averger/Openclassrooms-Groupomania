# Projet 1 - Parcours Fullstack 👋

Build a secure API for a food review app.

- [Requirements](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Requirements_DW_P6.pdf) of the project  
- Github frontend [Repository](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6)

## Installation

Here are the dependancies you need to install :

- NodeJS 12.14 or 14.0.  
- Angular CLI 7.0.2.  
- node-sass : make sure to use the corresponding version to NodeJS.  
For Noe 14.0 for instance, you need node-sass in version 4.14+.


## Usage 🛠

- Clone the backend repository :

```bash
git clone https://github.com/averger/OpenClassrooms-API.git
```

- Create a .env file at the root of backend folder.

```bash
cd backend
touch .env
```

- Add your URI MongoDB connection in this file.

```bash
SECRET_DB = 'mongodb+srv://userName:passWord@cluster0.wq0w7.mongodb.net/test?retryWrites=true&w=majority'
```

- Run backend

```bash
npm install -g nodemon
nodemon server
```

- Clone the frontend repository :

```bash
https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git
```

- Run frontend

```bash
cd frontend
npm install
npm start
``` 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)