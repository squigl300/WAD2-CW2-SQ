Food Sharing Application
This is a web application that allows users to share surplus food items with local food pantries. It provides features for user registration, login, item management, and admin functionality.
Prerequisites
Before running the application, ensure that you have the following installed:
•	Node.js 
•	NPM 
Installation
1.	Clone the repository: git clone https://github.com/squigl300/WAD2-CW2-SQ.git
2.	Navigate to the project directory: cd food-sharing-app
3.	Install the dependencies: npm install
Configuration
1.	Create a .env file in the root directory of the project.
2.	Open the .env file and provide the necessary configuration values: PORT=3000 SESSION_SECRET=your-session-secret
Usage
1.	Start the application: npm start
2.	Open your web browser and visit http://localhost:3000 to access the application.
3.	Register a new user account or log in with an existing account.
4.	Explore the available features:
•	Browse and select available food items.
•	Create new food items if you have surplus food to share.
•	Contact the administrators using the contact form.
5.	Admin users can access the admin dashboard to manage users and items.

Contributing
If you'd like to contribute to this project, please follow these steps:
1.	Fork the repository.
2.	Create a new branch for your feature or bug fix.
3.	Make your changes and commit them with descriptive messages.
4.	Push your changes to your forked repository.
5.	Submit a pull request to the main repository.
License
This project is licensed under the MIT License.
Contact
If you have any questions or suggestions, please feel free to contact us at squigl300@caledonian.ac.uk



List of implemented Features

1.	User Registration:
•	User can create a new account by providing name, email, and password.
•	Form validation ensures required fields are filled and email is valid.
•	Password is securely hashed before storing in the database.

2.	User Login:
•	Registered users can log in using their email and password.
•	Authentication middleware ensures only authenticated users can access protected routes.
•	Sessions are used to maintain user state throughout the application.

3.	Admin Functionality:
•	Admin users have access to an admin dashboard.
•	Admins can manage users (view, create, delete) through the dashboard.
•	Admins can manage items (view, create, delete) through the dashboard.
•	
4.	Item Management:
•	Authenticated users can create new food items with name, description, and expiry date.
•	Items are stored in the database with a reference to the user who created them.
•	Users can view available items that are not expired and not selected by others.
•	Users can select an item, marking it as unavailable to others.

5.	Contact Form:
•	Users can fill out a contact form to send messages to the administrators.
•	Form includes fields for name, email, and message.
•	Submitted messages are stored in the database.

6.	Database Integration:
•	NeDB is used as the database to store user, item, and message data.
•	Each collection (users, items, messages) has its own data model and interactions.

7.	Security Measures:
•	CSRF protection is implemented using the csurf middleware.
•	Helmet middleware is used to add security headers to the application.
•	User passwords are hashed using bcrypt before storing in the database.




8.	Error Handling:
•	Errors during user registration, login, and item creation are handled gracefully.
•	Appropriate error messages are displayed to the user.

9.	Logging:
•	Winston is used for logging errors and application events.
•	Logs are stored in separate files for easier monitoring and debugging.

10.	Responsive Web Design:
•	The application is built using HTML, CSS, and JavaScript.
•	Pages are styled to provide a user-friendly interface.

These are the main features implemented in the Food Sharing Application so far. The application allows users to register, login, create and select food items, and contact administrators. Admins have additional privileges to manage users and items. The application incorporates security measures, error handling, logging, and responsive design to enhance the user experience and maintain data integrity.
