# Club

## Overview

This project is a microservices based backend system for managing clubs within a single college.
It is designed to be modular, scalable, and easy to extend.
The system provides features for managing clubs, users, events, and announcements, with an API gateway as the central entry point.

## Features

* User authentication and authorization (JWT-based)
* Role-based access control (Admin, Club Head, Student)
* Club creation and member management
* Event creation, RSVP, and attendance tracking
* Announcements and posts for clubs
* Optional file upload for club logos, posters, and certificates
* API Gateway for routing and central access point
* Dockerized services for easy deployment

## Microservices

1. **Gateway** – Routes incoming API requests to respective services.
2. **Auth Service** – Handles login, registration, and JWT token generation.
3. **User Service** – Manages user profiles and roles.
4. **Club Service** – Manages club information and memberships.
5. **Event Service** – Manages club events and attendance.
6. **Post Service** – Handles announcements and media posts.
7. **File Service** – Uploads and serves files (optional).
8. **Notification Service** – Sends email or in-app notifications (optional).