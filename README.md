# Task Management System - Role-Based Access (Admin, Manager, User)

## Overview
A task management web application built with **Node.js** that provides role-based access control. Admin and managers can assign, view, update, and delete tasks, while individual users can only perform CRUD operations on their own tasks.

## Features
- **Role-Based Access Control**:
  - **Admin**: Can assign, view, update, and delete any task.
  - **Manager**: Can assign tasks to users and manage tasks.
  - **User**: Can perform CRUD operations on their own tasks.
  
- **Task Management**: Users can add, update, and delete tasks assigned to them.

- **Authentication**: Users log in and are assigned a role (Admin, Manager, or User) to access different functionalities.

- **Database**: MongoDB for storing user and task data.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Other**: Mongoose (MongoDB ODM)


