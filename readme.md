# Tech Tips Hub Backend 

## Live link:



## Key Features

- Authentication: The application is secured by JWT authentication method
- Authorization: Only authorized person can access the protected resources

### Models:

- User: name, email, role, password, status, profilePhoto, isVerified, followers, following
- Post: title, description, image, author, category, upvotes, downvotes, comments


### Endpoints:

1. Sign Up: (POST) /api/auth/register
2. Sign In: (POST) /api/auth/login
3. Forget Password: (POST) /api/auth/forget-password 
4. Reset Password: (POST) /api/auth/reset-password


# How to run the application locally

1. Clone the repository

```
https://github.com/Khairul-islam98/tech-tips-hub-backend.git
```

2. Project open

```
cd tech-tips-hub-backend
```

3. install the required packages

```
npm i
```

4. Add a .env file

```
NODE_ENV=development
PORT=5000
DATABASE_URL=
JWT_ACCESS_SECRET=
JWT_ACCESS_SECRET_EXPIRE=
BCRYPT_SALT_ROUND=
RESET_PASS_UI_LINK=
EMAIL_USER=
EMAIL_PASS=
```

5. Run the Application locally

```
npm run start:dev
```
