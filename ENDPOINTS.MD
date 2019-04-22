# API Endpoints

## User Authentication

> Base URL : /api/users

Method | Route | Input Parameters | Output JSON Expectation
--- | --- | --- | ---
POST | /register | userid, name, email, phone, password | New User object/Error Message
POST | /login | userid, password | Success + Token/Error Message
POST | /forgot | userid | Success/Error Message
GET | /resetpass | userid, token | New Password/Error Message

## Hotels

> Base URL : /api/hotels

Method | Route | Input Parameters | Output JSON Expectation | Access Level
--- | --- | --- | --- | ---
GET | / | offset (Optional), count (Optional), lat (Optional), lng (Optional) | Array of Hotels/Error Message | Admin/User/Guest
POST | / | name, description, stars, services, photos, currency, address, lng, lat | Added object/Error Message | Admin
GET | /:hotelId | None | Hotel object/Error Message | Admin/User/Guest
PUT | /:hotelId | name, description, stars, services, photos, currency, address, lng, lat | None (Success)/Error Message (Failure) | Admin
DELETE | /:hotelId | None | None (Success)/Error Message (Failure) | Admin

## Reviews

> Base URL : /api/hotels/:hotelId/reviews

Method | Route | Input Parameters | Output JSON Expectation | Access Level
--- | --- | --- | --- | ---
GET | / | None | Array of Reviews/Error Message | Admin/User/Guest
POST | / | name, rating, review | Added object/Error Message | Admin/User
GET | /:reviewId | None | Review object/Error Message | Admin/User/Guest
PUT | /:reviewId | name, rating, review | None (Success)/Error Message (Failure) | Admin/User
DELETE | /:reviewId | None | None (Success)/Error Message (Failure) | Admin/User
