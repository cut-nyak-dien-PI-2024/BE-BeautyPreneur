# Beauty Preneur API

This is a RESTful API for beautypreneur website built with **Node.js** and **Express.js**. Authentication is handled using **JWT (JSON Web Tokens)**. there are 25 endpoints. Link ERD :  https://app.eraser.io/workspace/PZsy1H1EMTLIsINWZ7df

---

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Authentication](#authentication)
    - [Register](#register)
    - [Login](#login)
    - [Verify Email](#verify-email)
    - [Forgot Password](#forgot-password)
    - [Reset Password](#reset-password)
3. [USER](#user)
    - [Create USER](#create-user)
    - [Get Current User](#get-current-user)
    - [Get USER List](#get-all-user)
    - [Get Single USER](#get-single-user)
    - [Update USER](#update-user)
    - [Delete USER](#delete-user)
    - [Delete All USER](#delete-all-user)
4. [MAKEUP BUDGET](#makeup-budget)
    - [Create Data](#create-data)
    - [Get Data List](#get-all-data)
    - [Get Single Data](#get-single-data)
    - [Update Data](#update-data)
    - [Delete Data](#delete-data)
    - [Delete All Data](#delete-all-data)
5. [MAKEUP PACKAGE](#makeup-package)
    - [Create Data](#create-data-package)
    - [Get Product Makeup Data](#get-product-makeup-package)
    - [Get Data List](#get-all-data-package)
    - [Get Single Data](#get-single-data-package)
    - [Update Data](#update-data-package)
    - [Delete Data](#delete-data-package)
    - [Delete All Data](#delete-all-data-package)
6. [COURSES](#courses)
    - [Create Course (Admin Login Required)](#create-course)
    - [Get Data List Courses](#get-all-course)
    - [Get Single Data Course (Login Required)](#get-single-course)
    - [Delete Data(Admin Login Required)](#delete-course)
7. [Order](#orders)
    - [Create Order (Login Required)](#create-order)
    - [Confirmation Payment (Login Required)](#confirmation-order)
    - [Update Payment Status (Admin Login Required)](#update-payment)

---

## Installation & Setup

### Prerequisites

- **Node.js** and **npm** installed on your machine
- A **MongoDB** database (or any other database) for storing user, course and makeup budget list

### Steps

1. **Clone the Repository**  
   Clone the project to your local machine:

   ```bash
   git clone https://github.com/cut-nyak-dien-PI-2024/BE-BeautyPreneur.git
   ```

2. **Install Dependencies**  
   Clone the project to your local machine:

   ```bash
       npm install
   ```

3. **Environment Variables**  
   Create a .env file in the root of the project and set the following environment variables:

   ```bash
      JWT_KEY=your_JWT_KEY
      DB_URL=mongodb://localhost:27017/beautypreneur
      MAIL =your_email
      PASS_MAIL =your_email_password
   ```

4. **Run the Application**  
   Start the development server:

   ```bash
      npm start
   ```

5. **Access API**  
   The API will be running at:

   ```bash
     http://localhost:3000/makeup-budget
   ```

## Authentication

### Register

- Endpoint: POST /auth/regis
- Description: Registers a new user.

  Request Body :

  ```bash
     {
        "email": "",
        "password": "",
        "name":"",
        "role":"admin",
        "noTelephone":""
     }

  ```

  Response Body :
  - Status Code : 201

  ```bash
    {
    "message": "akun berhasil dibuat, silahkan cek email untuk verifikasi akun"
    }
  ```

  Error Response :
  - Status Code : 400

  ```bash
    {
        "message": "Email sudah terdaftar"
    }

  ```

### Verify Email

- Endpoint: POST /auth/verify-email
- Description: Registers a new user.

  Request Body :

  ```bash
     {
        "otp":0000
     }

  ```

  Response Body :
  - Status Code : 200

  ```bash
    {
    "message": "berhasil verifikasi akun"
    }
  ```

  Error Response :
  - Status Code : 400

  ```bash
    {
        "message": "Kode OTP tidak ditemukan"
    }

  ```

### Forgot Password

- Endpoint: POST /auth/forgot-password
- Description: send email to reset password and change password.

  Request Body :

  ```bash
    {
    "email":"windi.azmy@gmail.com"
    }
  ```

  Response Body :
  - Status Code : 200

  ```bash
    {
    "message": "berhasil verifikasi akun"
    }
  ```

  Error Response :
  - Status Code : 400

  ```bash
    {
        "message": "Kode OTP tidak ditemukan"
    }

  ```

### Reset Password

- Endpoint: POST /auth/reset-password
- Description: send email to reset password and change password.

  Request Body :

  ```bash
    {
    "otp":93697,
    "newpassword":"berrlue"
    }
  ```

  Response Body :
  - Status Code : 200

  ```bash
    {
    "message": "berhasil"
    }
  ```

  Error Response :
  - Status Code : 400

  ```bash
    {
        "message": "Kode OTP tidak ditemukan"
    }

  ```

### Login

- Endpoint: POST /auth/login
- Description: Login

  Request Body :

  ```bash
     {
        "email": "<example@example.com>",
        "password": "password123"
     }

  ```

  Response Body :
  - Status Code : 200

  ```bash
    {
    "message": "berhasil login",
    "access_token": ""
    }
  ```

  Error Response :
  - Status Code : 404

  ```bash
    {
        "message": "tidak ada email yg didaftarkan"
    }
  ```

  - Status Code : 401

  ```bash
    {
        "message": "password yg diberikan salah"
    }
  ```

## User

### Get All User

- Endpoint: GET /users
- Description: get all data users

  Response Body :
  - Status Code : 200

  ```bash
    {
          "message": "Data berhasil ditemukan",
          "data":[]
    }
  ```

### Get Current User

- Endpoint: GET /auth/currentUser
- Description: get all data users
- Headers: Authorization: Bearer <JWT_TOKEN>

  Response Body :
  - Status Code : 200

  ```bash
    {
          "user":{}
    }
  ```

  - Status Code : 401

  ```bash
    {
        message: "login ulang karena token sudah expired"
        err:{}
    }
  ```

### Create User

- Endpoint: POST /users
- Description: create 1 data users
- Headers: Authorization: Bearer <JWT_TOKEN>

  Request Body :

  ```bash
    {

        "email": "",
        "password": "",
        "name":"",
        "noTelephone":""
    }
  ```

  Response Body :
  - Status Code : 200

  ```bash
    {
          "message": "Data berhasil ditambahkan"
    }
  ```

### Get Single User

- Endpoint: GET /users/{id}
- Description: get single data

  Response Body :
  - Status Code : 200

  ```bash
    {
       message: "1 Data berhasil ditemukan",
       data:{}
    }
  ```

  Error Response :
  - Status Code : 404

  ```bash
    {
         message: "Data tidak ditemukan"
    }
  ```

### Update User

- Endpoint: PUT /users/{id}
- Description: edit 1 data
- Headers: Authorization: Bearer <JWT_TOKEN>

  Request Body :

  ```bash
    {
     "name":""
    }

  ```

  Response Body :
  - Status Code : 200

  ```bash
    {
       message: "Data berhasil diubah",
       data:{}
    }
  ```

  Error Response :
  - Status Code : 404

  ```bash
    {
        message: "Data tidak ditemukan"
    }
  ```

  - Status Code : 401

  ```bash
    {
        message: "Masukkan token dlu"
    }
  ```

### Delete User

- Endpoint: DEL /users/{id}
- Description: delete 1 data
- Headers: Authorization: Bearer <JWT_TOKEN>

  Response Body :
  - Status Code : 200

  ```bash
    {
        message: "Data berhasil dihapus"
    }
  ```

  Error Response :
  - Status Code : 404

  ```bash
    {
        message: "Data tidak ditemukan"
    }
  ```

  - Status Code : 500

  ```bash
    {
        message: "Terjadi kesalahan saat menghapus data",
        error:""
    }
  ```

### Delete ALL USER

- Endpoint: DEL /users
- Description: delete all data
- Headers: Authorization: Bearer <JWT_TOKEN>

  Response Body :
  - Status Code : 200

  ```bash
    {
       message: "Semua data berhasil dihapus"
    }
  ```

## Makeup Budget

### Get All Data

- Endpoint: GET /makeup-budget
- Description: get all data

  Response Body :
  - Status Code : 200

  ```bash
    {
          "message": "Data berhasil ditemukan",
          "data":[]
    }
  ```

### Create Data

- Endpoint: POST /makeup-budget
- Description: create 1 data data
- Headers: Authorization: Bearer <JWT_TOKEN>

  Request Body :

  ```bash
      {
        "product_name": "",
        "image_url": "",
        "price": 0,
        "product_link": ""
      }
  ```

  Response Body :
  - Status Code : 200

  ```bash
    {
          "message": "Data berhasil ditambahkan"
    }
  ```

### Get Single Data

- Endpoint: GET /makeup-budget/{id}
- Description: get single data

  Response Body :
  - Status Code : 200

  ```bash
    {
       message: "1 Data berhasil ditemukan",
       data:{}
    }
  ```

  Error Response :
  - Status Code : 404

  ```bash
    {
         message: "Data tidak ditemukan"
    }
  ```

### Update Data

- Endpoint: PUT /makeup-budget/{id}
- Description: edit 1 data
- Headers: Authorization: Bearer <JWT_TOKEN>

  Request Body :

  ```bash
    {
     "product_name":""
    }

  ```

  Response Body :
  - Status Code : 200

  ```bash
    {
       message: "Data berhasil diubah",
       data:{}
    }
  ```

  Error Response :
  - Status Code : 404

  ```bash
    {
        message: "Data tidak ditemukan"
    }
  ```

  - Status Code : 401

  ```bash
    {
        message: "Masukkan token dlu"
    }
  ```

### Delete Data

- Endpoint: DEL /makeup-budget/{id}
- Description: delete 1 data
- Headers: Authorization: Bearer <JWT_TOKEN>

  Response Body :
  - Status Code : 200

  ```bash
    {
        message: "Data berhasil dihapus"
    }
  ```

  Error Response :
  - Status Code : 404

  ```bash
    {
        message: "Data tidak ditemukan"
    }
  ```

  - Status Code : 500

  ```bash
    {
        message: "Terjadi kesalahan saat menghapus data",
        error:""
    }
  ```

### Delete ALL Data

- Endpoint: DEL /makeup-budget
- Description: delete all data
- Headers: Authorization: Bearer <JWT_TOKEN>

  Response Body :
  - Status Code : 200

  ```bash
    {
       message: "Semua data berhasil dihapus"
    }
  ```

## Makeup Package

### Get All Data Package

- Endpoint: GET /makeup-package
- Description: get all data

  Response Body :
  - Status Code : 200

  ```bash
    {
          "message": "Data berhasil ditemukan",
          "data":[]
    }
  ```

### Get Product Makeup Package

- Endpoint: GET /makeup-package/get-product-makeup-package
- Description: get all data

  Request Body :

  ```bash
  {
    data:[]
  }
  ```

  Response Body :
  - Status Code : 200

  ```bash
    {
          "message": "Data berhasil ditemukan",
          "data":[]
    }
  ```

### Create Data Package

- Endpoint: POST /makeup-package
- Description: create 1 data data
- Headers: Authorization: Bearer <JWT_TOKEN>

  Request Body :

  ```bash
      {
         “name": "Paket Glow Up Sehari hari",
          "image_url": "https://i.imgur.com/F1gdue3.jpg",
          "total_price": 453325,
          "total_products": 5,
          "data": []
      }
  ```

  Response Body :
  - Status Code : 200

  ```bash
    {
          "message": "Data berhasil ditambahkan"
    }
  ```

### Get Single Data Package

- Endpoint: GET /makeup-package/{id}
- Description: get single data

  Response Body :
  - Status Code : 200

  ```bash
    {
       message: "1 Data berhasil ditemukan",
       data:{}
    }
  ```

  Error Response :
  - Status Code : 404

  ```bash
    {
         message: "Data tidak ditemukan"
    }
  ```

### Update Data Package

- Endpoint: PUT /makeup-package/{id}
- Description: edit 1 data
- Headers: Authorization: Bearer <JWT_TOKEN>

  Request Body :

  ```bash
    {
     "product_name":""
    }

  ```

  Response Body :
  - Status Code : 200

  ```bash
    {
       message: "Data berhasil diubah",
       data:{}
    }
  ```

  Error Response :
  - Status Code : 404

  ```bash
    {
        message: "Data tidak ditemukan"
    }
  ```

  - Status Code : 401

  ```bash
    {
        message: "Masukkan token dlu"
    }
  ```

### Delete Data Package

- Endpoint: DEL /makeup-package/{id}
- Description: delete 1 data
- Headers: Authorization: Bearer <JWT_TOKEN>

  Response Body :
  - Status Code : 200

  ```bash
    {
        message: "Data berhasil dihapus"
    }
  ```

  Error Response :
  - Status Code : 404

  ```bash
    {
        message: "Data tidak ditemukan"
    }
  ```

  - Status Code : 500

  ```bash
    {
        message: "Terjadi kesalahan saat menghapus data",
        error:""
    }
  ```

### Delete ALL Data Package

- Endpoint: DEL /makeup-package
- Description: delete all data
- Headers: Authorization: Bearer <JWT_TOKEN>

  Response Body :
  - Status Code : 200

  ```bash
    {
       message: "Semua data berhasil dihapus"
    }
  ```


## Courses

### Get All Course

- Endpoint: GET /courses?q=&page=1&perPage=10&level=&cityName
- Description: get all courses

  Request Body :

  ```bash
       "query": [
        {
         "key": "q",
         "value": ""
        },
        {
         "key": "page",
         "value": "1"
        },
        {
         "key": "perPage",
         "value": "10"
        },
        {
         "key": "level",
         "value": ""
        },
        {
         "key": "cityName",
         "value": ""
        }
       ]
  ```

  Response Body :
  - Status Code : 200

  ```bash
    {
          "message": "Data berhasil ditemukan",
          "data":[]
    }
  ```

### Create Course

- Endpoint: POST /courses
- Description: create 1 data course
- Headers: Authorization: Bearer <JWT_TOKEN>

  Request Body :

  ```bash
      {
        "name": "Makeup Basics",
        "short_description": "An introductory course on makeup application techniques",
        "description": "Learn the fundamentals of makeup application, including techniques for a natural look and more dramatic styles",
        "materials":"Makeup brushes, foundation, eyeshadow, lipstick",
        "cover_image_url": "https://placehold.co/600x400?text=Makeup+Course+Cover",
        "level":"Pemula",
        "mentor_name":"Elsa Carroll",
        "mentor_image_url":"https://placehold.co/100x100?text=Mentor+Image",
        "city_name":"Jakarta",
        "location_address":"456 Beauty Street, Jakarta",
        "location_latitude":"-6.2",
        "location_longitude":" 106.816666",
        "start_time":"2024-01-10T10:00:00.000Z",
        "end_time":"2024-01-10T15:00:00.000Z",
        "currency":"IDR",
        "fee":"2250000",
        "max_participants":"20",
        "portfolio":[
          {
            "name":"Bridal Makeup",
            "image_url":"https://placehold.co/300x200?text=Bridal+Makeup"
          },
             {
            "name":"Party Makeup",
            "image_url":"https://placehold.co/300x200?text=Party+Makeup"
          },
        ]
      }
  ```

  Response Body :
  - Status Code : 200

  ```bash
    {
          "message": "Data berhasil ditambahkan"
    }
  ```

### Get Single Course

- Endpoint: GET /courses/${slug}
- Description: get single data

  Response Body :
  - Status Code : 200

  ```bash
    {
       message: "1 Data berhasil ditemukan",
       data:{}
    }
  ```

  Error Response :
  - Status Code : 404

  ```bash
    {
         message: "Data tidak ditemukan"
    }
  ```
  
### Delete Course

- Endpoint: DEL /courses/${slug}
- Description: delete 1 data
- Headers: Authorization: Bearer <JWT_TOKEN>

  Response Body :
  - Status Code : 200

  ```bash
    {
        message: "Data berhasil dihapus"
    }
  ```

  Error Response :
  - Status Code : 404

  ```bash
    {
        message: "Data tidak ditemukan"
    }
  ```

  - Status Code : 500

  ```bash
    {
        message: "Terjadi kesalahan saat menghapus data",
        error:""
    }
  ```

## Orders

### Create Order

- Endpoint: POST /courses
- Description: create 1 data order
- Headers: Authorization: Bearer <JWT_TOKEN>

  Response Body :
  - Status Code : 200

  ```bash
    {
          "message": "Data berhasil ditambahkan"
    }
  ```

### Confirmation Order

- Endpoint: PUT courses/digital-marketing-essentials-1-new-york/order/67264f34115167ab595d4086/confirm
- Description: confirmation order
- Headers: Authorization: Bearer <JWT_TOKEN>

  Request Body :

  ```bash
    {
        "confirmedAmount":"",
        "bankFrom":"BCA",
        "bankTo":"Mandiri",
        "notes":"sudah di trasnfer ya atas nama xyz"
      }
  ```

### Update Payment

- Endpoint: PUT courses/digital-marketing-essentials-1-new-york/order/67264f34115167ab595d4086/status
- Description: update payment
- Headers: Authorization: Bearer <JWT_TOKEN>

  Request Body :

  ```bash
    {
        "confirmedAmount":"",
        "bankFrom":"BCA",
        "bankTo":"Mandiri",
        "notes":"sudah di trasnfer ya atas nama xyz"
      }
  ```
