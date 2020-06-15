# link to see working of the project:-
# https://youtu.be/g3qBgALnldQ
# A task tracker or management project (focused on MERN stack). MangoDB atlas used for database services. 
# Key features of the project:-
* user can register as an authorised individual . No two users can have same username.
* forms with complete validation 
* proper routing 
* A user can track there previous entries(they can edit and delete the entries)
* a user can create new tasks(verification is done that the user is same as the one who logged in)
* one can check detailed info about a particular task(including timer for the current tasks,no timer for finished tasks)
* a user can see current and finished tasks separately 


# How to operate database:-
   # 1 click on the link
   * https://cloud.mongodb.com/v2/5ee214ba54e4ff013011de57#clusters
   # 2 enter credentials
   * username:- niharikasharma123@yahoo.in
   * password:- niharikasharma
   # 3 click on the drop box (just above "data storage" on top left,it is containing name of all the projects)
   # 4 click on new project and write a project name -> click next -> create project
   # 5 click on build a cluster-> choose shared cluster(its free)->click create a cluster
   # 6 from providers choose "google cloud platform" and from region choose "mumbai" -> click on create cluster
   # 7 when the cluster is built,click on connect-> click on "add your current IP address" -> add IP address 
   # 8 Create a MongoDB User
   * username :- niharikasharmaDB
   * password :- niharikasharmaDBPASS
   * click "create MongoDB user" -> click on "choose a connection method"
   * choose "connect your application" -> copy the URL -> close
   # create a .env file (inside backend folder) and write :-
   * ATLAS_URI=copied_url
   * for example:- ATLAS_URI=mongodb+srv://niharikasharmaDB:PASSWORD@cluster0-hv56c.gcp.mongodb.net/DBNAME?retryWrites=true&w=majority
   * replace PASSWORD with niharikasharmaDBPASS
   * replace DBNAME with demo


   
# Commands used inside backend folder
   # 1 CREATE A REACT FOLDER
   * npx create-react-app REACT_PROJECT_NAME
   # 2 MAKE A BACKEND FOLDER
   * mkdir backend
   * cd backend
   # 3 INSIDE BACKEND FOLDER
   * npm init -y
   * npm install express cors mongoose dotenv
   * npm install -g nodemon
   # 4 RUN SERVER (WHILE YOU ARE INSIDE BACKEND FOLDER ON CMD)
   * nodemon server
   
# Commands used in the parent/main folder (installing dependencies)
   # 5 INSTALLING DEPENDENCIES
   {NOTE:- as for backend we have used cmd ,same for react project open other cmd and inside the parent folder install the                  dependencies,which means we require two cmd's one for MongoDB and another for React}
   * npm install bootstrap
   * npm install react-router-dom
   * npm install react-datepicker
   * npm install axios
   * npm i react-time-picker
   * npm i react-compound-timer
   * npm install --save particles-bg
   * npm i react-bootstrap
   # 6 RUNNING REACT PROJECT(WHILE YOU ARE INSIDE PARENT FOLDER ON SECOND CMD)
   * npm start
   
# Dependencies installed
+ express@4.17.1
+ dotenv@8.2.0
+ cors@2.8.5
+ mongoose@5.9.18
+ nodemon@2.0.4
+ bootstrap@4.5.0
+ react-router-dom@5.2.0
+ react-datepicker@3.0.0
+ axios@0.19.2
+ react-time-picker@4.0.1
+ react-compound-timer@1.2.0
+ particles-bg@2.5.0
+ react-bootstrap@1.0.1






