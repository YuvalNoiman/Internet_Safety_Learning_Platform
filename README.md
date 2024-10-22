Installation and Setup Guide Windows
Step 1:
Download all code from the github repository:
https://github.com/YuvalNoiman/Internet_Safety_Learning_Platform
Step 2:
Unzip Code from Folder

Step 3:
Download Node,js: 
https://nodejs.org/en

Accept Terms of License

Set Installation Folder and Install Node.js runtime

Install other recommended tools and then click Install

Step 4:
Download MySQL and MySQL WorkBench:
https://dev.mysql.com/downloads/windows/installer/8.0.html

Don’t make an account

Let Windows Configure Installer and Install Full MySQL or at least MySQL and MySQL WorkBench

Click Execute and then click next on configure

Leave as default and use strong password encryption

For Accounts and Roles enter any password you want. If you want to skip a step later choose Pass1234.
Then Continue with default and then Grant full access

Execute and then Click next

Test Server connection and then finish configuring. Everything remaining can be left as default.
Step 5:
Locally generate sql database and table using LearningPlatform File by uncommenting lines as shown below.

Step 6:
Change database password in manager.js code to your password

Step 7:
Open terminal and navigate to the directory containing code.

Step 8:
NPM install express (the other packages are already downloaded from Github)

Step 9:
Type in the command node manager.js

Step 10:
Open a web browser and type in http://localhost:3000/home

Step 11:
Success! You should be able to fully use the website.
