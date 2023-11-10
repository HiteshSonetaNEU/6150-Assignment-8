This is a simple Express.js API for managing user information in MongoDB. It provides endpoints for creating, updating, deleting, and retrieving user data.

Installation

Clone the repository:
git clone <repository-url>
cd <repository-directory>

Install dependencies:
npm install

Start the server:
npm start
The server will run on http://localhost:3000.

API Endpoints
1. Create User
Endpoint: POST /user/create
Params:
fullName (String): Full name of the user.
email (String): User's email address (must be a northeastern.edu domain).
password (String): User's password (length must be greater than or equal to 8 characters).

2. Edit User
Endpoint: PUT /user/edit
Params:
email (Query Parameter, String): User's email address.
fullName (String): Updated full name of the user.
password (String): Updated password for the user (length must be greater than or equal to 8 characters).

3. Delete User
Endpoint: DELETE /user/delete
Params:email (String): User's email address to be deleted.

email (String): User's email address to be deleted.

4. Get All Users
Endpoint: GET /user/getAll
Params: None

Error Handling
400 Bad Request: Invalid email or password.
404 Not Found: User with given email doesn't exist.
500 Internal Server Error: Error creating, updating, deleting, or retrieving users.