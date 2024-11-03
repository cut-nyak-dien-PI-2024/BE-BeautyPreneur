# Beauty Preneur API

This is a RESTful API built with **Node.js** and **Express.js**. Authentication is handled using **JWT (JSON Web Tokens)**.

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
