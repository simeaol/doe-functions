# doe-functions
Firebase Functions to handle DoE requests

### install firebase tools cli
* sudo npm install -g firebase-tools

### Check the installed version
* firebase --version


### login in firebase
* firebase login
 
 ### once loged, move forward

 cd /my_project_dir

 ### init firebase my_project
 *firebase init

### choose your favorite language and use npm for update dependencies

### cd in "functions" dir and update dependencies
* npm install firebase-admin@latest firebase-functions@latest

#Voilá

### Deploy firebase my_project
* firebase deploy #inside functions directory

### Emolutate functions in local machine without deploying it on cloud. in functions dir run following command
* npm run-script lint #check any error or absent in the functions

### Then build de my_project (This convert your typescript code into javascript)
* npm run-script build 

### Runup local function server by running 
* firebase serve --only functions



####==========Tips=========
!npm or !curl or !shomething         #show the last npm command executed





#### Promisses has 3 basic states: Pending, Rejected and FulFilled

Rules for termnation a cloud function

1- Http Triggers - send a response at the end the function method

2- Background triggers - return a promisse from the function

3- 


