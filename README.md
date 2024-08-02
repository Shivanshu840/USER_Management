
# User Management System

The User Management System is a comprehensive application designed to streamline the management of user accounts. This project provides a robust set of features to handle user registration, authentication, profile management, and more.

Key Features:

 - User Registration: Allows new users to create accounts with secure password hashing.
 - Login and Authentication: Provides secure user login with JWT-based token authentication.
- Profile Management: Enables users to view, update, and delete their profiles.

- This system is intended for developers and organizations looking to implement or enhance user management functionality within their applications.

Technologies Used:

- Backend: Express.js, bcrypt for password hashing, JWT for authentication.
- Database: MongoDB (or specify your database).
- Middleware: Custom middleware for authentication and authorization.



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL`

`PORT`

`KEY`



## Run Locally


Go to the project directory

```bash
  cd Backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node index.js
```


## Running Tests

To run tests, run the following command

```bash
  npm test
```


## API Reference

#### POST all items 

```http
  POST /register/signup
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The user's username |
| `useremail` | `string` | **Required**. The user's useremail |
| `password` | `string` | **Required**. The user's password |


#### POST all items in body

```http
  POST /register/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `useremail`      | `string` | **Required**. The user's useremail |
| `password`      | `string` | **Required**. The user's password |

#### GET all items 

```http
  GET /userprofile/profile
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required**. token for authentication |

#### PUT all items 
```http
  PUT /userprofile/profile-update
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required**. token for authentication |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userename`      | `string` | **Required**. The user's userename 
| `useremail`      | `string` | **Required**. The user's useremail |
| `password`      | `string` | **Required**. The user's password |

#### DELETE all items 

```http
  DELETE /userprofile/delete-profile
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required**. token for authentication |


## Documentation

[Documentation](https://linktodocumentation)

