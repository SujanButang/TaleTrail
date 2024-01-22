# Project Description
Tale trail is a community blog platform that allows users to write their side of story, share knowledge of any of the insights. This project was developed as a final project during the internship period at Leapfrog. This project was developed in one week and has features like email verification, authentication, writing blogs, publishing blogs, leaving likes and comments on blogs, updating user profile and many more. Also a dynamic form is made to cater the need of blogs as per requirements.

# Installation
To run the project in your machine, first clone the repository in your device using 
```git clone https://github.com/SujanButang/TaleTrail.git```

Inside the API directory, look up on the .env.example file and create a .env file with the required fields. 
Then run ```npm install```. This will install all the required dependecies for the API.

Also while you are at it, make sure to open nodemailer.ts file and make necessary changes for user and auth.

Now move back to client directory. Inside replace the CLOUD_NAME in the constants file with your own cloudinary cloudname.

Now run ```npm install```.

# Running
Head to the API directory and hit ```npm run dev``` in the terminal. This should start the server.

Now for the client part do the same and the app should start running on port 5123.
