
# E-commerce Backend Project

## Description

This is a **backend eCommerce platform** built using **Node.js**, **Express**, and **MongoDB** (via **Mongoose**). It provides a robust API for managing products, users, orders, and payments, enabling you to build a fully functional online store. The project is designed with scalability in mind, offering core e-commerce features and providing extensibility for future enhancements.

## Features

- **User Authentication**: Register, login, and manage user sessions securely with JWT (JSON Web Tokens).
- **Product Management**: Add, update, delete, and list products.
- **Order Management**: Create, update, and track orders.
- **Shopping Cart**: Implement shopping cart functionality for users.
- **Payment Integration**: Integrate payment gateway (e.g., Stripe or PayPal).
- **Admin Dashboard**: Admin can manage users, products, and view orders.
- **Product Search**: Users can search products by category, price range, and name.
- **Reviews & Ratings**: Users can leave product reviews and ratings.

## Tech Stack

- **Backend**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Middleware**: bcryptjs (for password hashing), dotenv (for environment variables)
- **Testing**: Jest (for unit and integration tests)
- **API**: RESTful APIs
- **Payment**: Stripe 

## Installation

### Prerequisites

Before starting, make sure you have the following installed:

- **Node.js** (>= 14.x)
- **MongoDB** (or MongoDB Atlas for cloud database)
- **Postman** (for API testing) or any API testing tool

### Steps to Set Up

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ecommerce-backend.git
   cd ecommerce-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the root directory:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key (if using Stripe)
   ```

4. Run the development server:

   ```bash
   npm start
   ```

   The server will now be running on `http://localhost:3000`.


## Deployment

You can deploy this project on **Heroku**, **AWS**, or any other cloud provider. Make sure to set up the **environment variables** accordingly on the cloud platform for things like database URI and JWT secrets.

### Deploy on Heroku

1. Install the Heroku CLI (if you don't have it already).
2. Log in to Heroku:

   ```bash
   heroku login
   ```

3. Initialize a new git repository (if not done already):

   ```bash
   git init
   ```

4. Create a new Heroku app:

   ```bash
   heroku create ecommerce-backend
   ```

5. Push the project to Heroku:

   ```bash
   git push heroku master
   ```

6. Set up environment variables on Heroku:

   ```bash
   heroku config:set MONGO_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret_key
   ```

7. Open your deployed app:

   ```bash
   heroku open
   ```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.

