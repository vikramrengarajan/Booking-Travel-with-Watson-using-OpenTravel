# Booking-Travel-with-Watson-using-OpenTravel

IBM OpenTravel Guide.

The demo application can be deployed in your own environment. After deploying you can explore the files, make changes, and play with the application. After the changes, you can deploy the modified version of the application to the Bluemix Cloud.

A.	Before you Begin:
1.	Ensure that you have an account on IBM Bluemix. Register for it at: Bluemix.
2.	The application uses Node.js and npm. You must have the runtimes installed.
3.	Also, install the Cloud Foundry command-line client
4.	Download the files of the project and extract them in a local directory
https://ibm.biz/opentravelproject
Please use this link if it does not work.

B.	Create and setup the Watson Services:
You will need 4 Watson services to set up the demo. (Ensure your Bluemix account has space
for at least 4 services)

1.	Conversation Service
1.1	Log in to IBM Bluemix from a web browser http://bluemix.net

1.2	Click on Create Service.


1.3	Then click on Watson under Services tab in the left.



1.4	Click on Conversation service.

1.5	Name the service “Conversation-pm” and click on Create.

1.6	We are redirected to the Conversation app dashboard. 
Click on Service Credentials and the View Credentials. Copy the username & password for use. After copying click on Manage.

Click on Launch Tool.


1.7	Click on Import. 


Make sure the option Everything (Intents, Entities and Dialog) is selected


Download the workspace from: http://ibm.biz/opentravelwrk
Please use this link if it does not work.

Click on choose file and select the downloaded JSON workspace file, then click Import.


You will get to the Workspace Dashboard.

1.8	Go Back in the page then click on More as shown below.





Click on View Details 



1.9	Then copy the WORSPACE ID for use.



2.	Tone Analyzer
2.1	 Go back to Bluemix site and click on Catalog.


2.2	Click on Watson and then choose Tone Analyzer.





2.3	Name the Tone Service as: “Tone Analyzer-55” and then click Create.


2.4	We get to the Tone Analyzer Dashboard. Click on Service credentials and then View Credentials.


Note down the credentials of username and password for later use.


3.	Text to Speech
Go back to Bluemix site and click on Catalog. Click on Watson and Text to Speech.


Name the service as “Text to Speech-pn” and click on create.



We get to the Text to Speech Dashboard. Click on Service credentials and then View Credentials.

Note down the credentials of username and password for later use.

4.	Speech to Text
Go back to Bluemix site and click on Catalog. Click on Watson and Text to Speech.


Name the service as “Speech to Text-9k” and click on create.



We get to the Text to Speech Dashboard. Click on Service credentials and then View Credentials.

Note down the credentials of username and password for later use.

C.	Configuring the environment:

1.	Go to the extracted folder of the app in your local directory. Navigate to the folder <local-directory>/Chatbotopentravelv1/routes.


Open the file conversation.js in any editor (Notepad, TextEdit, Atom, Sublime) and add your service credentials of username and password (copied in previous steps in section B when we created the Watson services) for the conversation and Tone analyzer service. 



Also, add the conversation API WORKSPACE ID copied in previous steps. 

Save and close the file.

2.	Again, navigate to the folder <local-directory>/Chatbotopentravelv1/routes.
Open the file speech-to-text.js in any editor.
Add your service credentials of username and password (copied in previous steps in section B when we created the Watson services) for the Speech to Text service.

Save and close the file.
3.	Navigate to the folder <local-directory>/Chatbotopentravelv1/routes.
Open the file Text-to-speech.js in any editor.
Add your service credentials of username and password (copied in previous steps in section B when we created the Watson services) for the Text to speech service.

Save and close the file.

D.	Running the Application:
Open a Terminal window.
1.	Install the demo application package into the local Node.js runtime environment:

2.	Start the application

The application is now deployed and running in your local server. Go http://localhost:5000/ in any browser and start playing.


The demo app runs at: http://ibm.biz/opentravelapp (Please use this link if it does not work)
