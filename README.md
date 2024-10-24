# Ecommerce 🛍️ Backend API Documentation

Welcome to my E-Commerce Backend repository. This README serves as a comprehensive guide to the project's structure, setup instructions, features, API endpoints, additional information, resources

## Contents 

- [Production Link](#production-link)
- [Postman Documentation](#postman-documentation)
- [Tech Stack And Tools](#tech-stack-and-tools)
- [Features](#features)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [RESTful API Design](#restful-api-design)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Resources](#resources)


### Production Link
You can access the production version of the application at the following link: [Production Link](https://e-commerce-seven-umber.vercel.app/)
### Postman Documentation

You can access the Postman documentation for the API at the following link: [Postman Documentation](https://documenter.getpostman.com/view/26200257/2sAY4rF5hx)


## Tech Stack And Tools✨

- **`Node.js`:** A JavaScript runtime built on Chrome's V8 JavaScript engine, used for building scalable network applications.
- **`Express.js`:** A fast, unopinionated, minimalist web framework for Node.js, used for building APIs and web applications.
- **`MongoDB`:** A NoSQL database used for storing data in a flexible, JSON-like format.
- **`Mongoose`:** An Object Data Modeling (ODM) library for MongoDB and Node.js, used to model application data and interact with the database.

- **`Redis`:** An in-memory data store used as a database and cache to improve application performance and speed up data access.

- **`Vercel`:** A cloud platform for deploying web applications, offering automatic scaling, previews, and global CDN for improved performance.
- **`Stripe`:** A payment gateway used to facilitate secure online payments between customers and Admin.
- **`Multer`:** A middleware used to handle file uploads in Node.js applications, used to upload images and files to the server.
- **`Cloudinary`:** A cloud-based service for managing and storing images and videos, offering APIs for uploading, compressing, and optimizing media. It enhances media processing and supports fast distribution via a Content Delivery Network (CDN).
- **`Nodemailer`:** A module used to send emails from the application to users for account verification, order confirmation, and other events.

- **`Morgan`:** An HTTP request logger middleware used to log HTTP requests and responses for debugging and monitoring.
- **`PDFKit`:** A JavaScript library for creating PDF documents in Node.js, allowing developers to generate dynamic PDFs with customizable content and layouts.
- **`rateLimit`:** A middleware used in web applications to limit the number of requests a user can make to an API within a specified time period, helping to prevent abuse and ensure fair usage of resources.


## Features

### Core Features 
- **`User Authentication`:** Authenticates users using JWT (JSON Web Tokens).
- **`Redis Integration`:** Redis is utilized for caching frequently accessed data and optimizing query performance, ensuring optimal scalability and responsiveness of the application. Implemented cart with Redis server for faster data retrieval.

- **`Sales Analysis`:** Provides the total order amount within a user-defined period and generates daily reports of the orders along with their total prices.

- **`Product Management`:** Allows Admin to create, update, and delete products.

- **`Product Listing`:** Displays products with details such as name, price, description, and images.
- **`Shopping Cart`:** Enables customers to add products to a cart, view the cart, and proceed to checkout.
- **`Order Management`:** Allows Admin to manage orders, view order details, and update order status.
- **`Payment Gateway Integration`:** Integrates with Stripe for secure online payments between customers and Admin.
- **`User Profile`:** Allows users to manage their profiles, update personal information, and view order history.
- **`Search and Filter`:** Enables customers to search for products based on keywords, categories, and other criteria.
- **`Product Reviews`:** Allows customers to leave reviews and ratings for products.
- **`Order Tracking`:** Enables customers to track the status of their orders.
## Additional Features

- **`Email Confirmation Cleanup`:** Deletes unconfirmed emails from the database after a period of 15 to 30 days.

- **`Email Notifications`:** Sends automated email notifications to users for account verification, order confirmation, and other events.
- **`Wishlist Functionality`:** Users can add any product to their wishlist and make changes to their wishlist as needed. If a product is out of stock and a user wishes to purchase it, the user's ID is added to the wishlist associated with that product.

- **`Logging and Monitoring`:** Includes logging functionality using Winston and Morgan to track application behavior and performance.
- **`Error Handling`:** Implements error handling mechanisms to catch and handle exceptions gracefully, providing informative error messages to users.
- **`API Documentation`:** Provides comprehensive documentation for APIs using tools like Swagger to facilitate code maintenance and collaboration.
- **`Code Version Control`:** Utilizes version control systems such as Git to track code changes.
- **`Environment Configuration`:** Utilizes environment variables to manage configuration settings and sensitive information, ensuring security and flexibility.
- **`Best Practices & Clean Code`:** Follows best practices and clean code principles to ensure code quality, maintainability, and scalability.


## Architecture

The backend follows a modular, scalable, and maintainable architecture, Express.js, and MongoDB. The architecture is designed to ensure code reusability, separation of concerns, and scalability to accommodate future growth and changes in the application's requirements.


## Database Schema📊

The database used for ecommerce is MongoDB, a NoSQL database that stores data in a flexible, JSON-like format.

The database schema for ecommerce consists of the following collections:

- **Users:** Stores user information such as name, email, password, and wishlist products.
- **Products:** Stores product information such as name, price, description, images, and wishlist users.
- **Orders:** Stores order information such as customer details, product details, order status, and payment details.
- **Reviews:** Stores review information such as product ID, customer ID, rating, comment, and timestamps.
- **Carts:** Stores cart information such as user ID, product ID, quantity, and total cart price.
- **Categories:** Stores category information such as name, description, and subcategories.
- **Subcategories:** Stores subcategory information such as name, description, and parent category.
- **Brands:** Stores brand information such as name, description, and products.
- **Coupons:** Stores coupon information such as name, expiration date, discount amount, and usage limit.

## RESTful API Design📐

The API design for ecommerce follows RESTful principles, with clear and predictable URL structures, HTTP methods, and status codes. The API endpoints are organized into resource-based routes, with each route corresponding to a specific resource or entity in the system. The API design includes the following key features:

- **Resource-Based Routes:** Organizes API endpoints into resource-based routes such as /users, /products, and /orders.
- **CRUD Operations:** Implements Create, Read, Update, and Delete operations for all resources using HTTP methods such as GET, POST, PUT, PATCH, and DELETE.
- **Sales Analysis:** Provides the total order amount within a user-defined period and generates daily reports of the orders along with their total prices
- **Pagination and Filtering:** Supports pagination and filtering for listing resources.
- **Search and Sorting:** Allows users to search for resources based on keywords, categories, and other criteria, enhancing resource discovery.
- **Error Handling:** Provides informative error messages, status codes, and error responses to help clients understand and handle errors effectively.


## Project Structure📁



```plaintext
C:.
|   .Dockerignore
|   .env
|   .gitignore
|   Dockerfile
|   index.js
|   invoice.pdf
|   logo.jpg
|   package-lock.json
|   package.json
|   vercel.json
|
+---.vercel
|   |   project.json
|   |   README.txt
|   |
|   \---cache
\---SRC
    |   initApp.js
    |
    +---DB
    |   |   connection.js
    |   |
    |   \---models
    |           brand.mode.js
    |           cart.model.js
    |           category.model.js
    |           coupon.model.js
    |           order.model.js
    |           product.model.js
    |           review.model.js
    |           subcategory.model.js
    |           user.model.js
    |
    +---middleware
    |       authorization.js
    |       clearCache.js
    |       rateLimit.js
    |       validation.js
    |
    +---modules
    |   +---auth
    |   |   |   auth.endpoint.js
    |   |   |   auth.router.js
    |   |   |   validationSchema.js
    |   |   |
    |   |   \---controller
    |   |           auth.js
    |   |
    |   +---Brand
    |   |   |   Brand.endPoint.js
    |   |   |   Brand.router.js
    |   |   |   validationSchema.js
    |   |   |
    |   |   \---controller
    |   |           Brand.js
    |   |
    |   +---Cart
    |   |   |   Cart.endPoint.js
    |   |   |   Cart.router.js
    |   |   |   validationSchema.js
    |   |   |
    |   |   \---controller
    |   |           Cart.js
    |   |
    |   +---Category
    |   |   |   category.endPoint.js
    |   |   |   category.router.js
    |   |   |   validationSchema.js
    |   |   |
    |   |   \---controller
    |   |           category.js
    |   |
    |   +---Coupon
    |   |   |   coupon.endPoint.js
    |   |   |   coupon.router.js
    |   |   |   validationSchema.js
    |   |   |
    |   |   \---controller
    |   |           coupon.js
    |   |
    |   +---Order
    |   |   |   order.endPoint.js
    |   |   |   order.router.js
    |   |   |   validationSchema.js
    |   |   |
    |   |   \---controller
    |   |           order.js
    |   |
    |   +---Product
    |   |   |   product.endPoint.js
    |   |   |   product.router.js
    |   |   |   validationSchema.js
    |   |   |
    |   |   \---controller
    |   |           product.js
    |   |
    |   +---Review
    |   |   |   review.endPoint.js
    |   |   |   review.router.js
    |   |   |   validationSchema.js
    |   |   |
    |   |   \---controller
    |   |           review.js
    |   |
    |   +---sales.analysis
    |   |   |   salesReport.endPoint.js
    |   |   |   salesReport.router.js
    |   |   |   validationSchema.js
    |   |   |
    |   |   \---controller
    |   |           salesReport.js
    |   |
    |   +---SubCategory
    |   |   |   subcategory.endPoint.js
    |   |   |   subcategory.router.js
    |   |   |   validationSchema.js
    |   |   |
    |   |   \---controller
    |   |           subcategory.js
    |   |
    |   \---User
    |       |   user.endPoint.js
    |       |   user.router.js
    |       |   validationSchema.js
    |       |
    |       \---controller
    |               user.js
    |
    \---utils
            ApiFeatures.js
            cacheManager.js
            Cloudinary.js
            errorHandling.js
            Generate&verifyToken.js
            Hash&compare.js
            Multer.js
            payment.js
            pdf.js
            removeUnverifiedEmails.js
            salesAnalysisHelpers.js
            sendEmail.js
```


## Environment Variables🌐


Create a `.env` file in the root directory and add the following environment variables:

```plaintext
#============DATABASE======#
DB_CONNECTION='xxxxxxxxxxxx'
#===================redis Settings===============#
REDIS_PASS="xxxxx"
REDIS_HOST='xxxxxx'
REDIS_PORT=xxxxx
#==================== Cloudinary Settings==============
cloud_name='xxxxxxxxx'
api_key= 'xxxxxxxxxxx'
api_secret="xxxxxxxxx"

#=============== Email Settings=================#
Email="xxxx"
EMAIL_PASSWORD="xxxxxx"
signature_token="saly 3la el naby"
SGNEmail="xxxx"
#================ APP ENVIRONMENT ===========#
MOOD="xxxxxxx"
APP_NAME="xxxxx"
# ============= send email ==============  #

gmail= "xxxxxxxxx"
gmailPass= "xxxxx"

# ============  AUTHENTICATION      ===============  #

Bearer_Key="xxxxxx"
signatureToken="xxxxxx"
SALT_ROUND=xxxxx
#============#
FR_URL="xxxxxx"

APP_NAME="xxxxx"

#============ stripe Settings ===========#
STRIPE_KEY="xxxxxxxx"
CANCEL_URL="xxxxxx"
SUCCESS_URL="xxxxxxx"
endpointSecret="xxxxxx"
```


## Getting Started


### Prerequisites📋

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)
- **Redis** (Make sure the Redis server is running)

### Installation

1. **Clone the Repository**

   Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/MomenAbdrabo/E-commerce.git

   cd e-commerce-backend
   ```
2. Install Dependencies

Install the required Node.js dependencies by running:
```
npm install

```
3. Create a config.env file in the root directory and add the following environment variables:
```
#============DATABASE======#
DB_CONNECTION='xxxxxxxxxxxx'
#===================redis Settings===============#
REDIS_PASS="xxxxx"
REDIS_HOST='xxxxxx'
REDIS_PORT=xxxxx
#==================== Cloudinary Settings==============
cloud_name='xxxxxxxxx'
api_key= 'xxxxxxxxxxx'
api_secret="xxxxxxxxx"

#=============== Email Settings=================#
Email="xxxx"
EMAIL_PASSWORD="xxxxxx"
signature_token="saly 3la el naby"
SGNEmail="xxxx"
#================ APP ENVIRONMENT ===========#
MOOD="xxxxxxx"
APP_NAME="xxxxx"
# ============= send email ==============  #

gmail= "xxxxxxxxx"
gmailPass= "xxxxx"

# ============  AUTHENTICATION      ===============  #

Bearer_Key="xxxxxx"
signatureToken="xxxxxx"
SALT_ROUND=xxxxx
#============#
FR_URL="xxxxxx"

APP_NAME="xxxxx"

#============ stripe Settings ===========#
STRIPE_KEY="xxxxxxxx"
CANCEL_URL="xxxxxx"
SUCCESS_URL="xxxxxxx"
endpointSecret="xxxxxx"

```
4. Running the Application
```
npm run dev

```
## Resources


- [Express.js Documentation](https://expressjs.com/)
- [Redis Documentation](https://redis.io/documentation)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Stripe Documentation](https://stripe.com/docs)
- [JWT Documentation](https://jwt.io/introduction/)
- [Multer Documentation](https://www.npmjs.com/package/multer)
- [Redis Integration with Node.js](https://redis.io/docs/getting-started/client-libraries/#nodejs)
- [Docker Documentation](https://docs.docker.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
