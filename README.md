# Recycle Where application

## Introduction
Recycle Where is a categorizing recyclable wastes application based on the input images from users.
The process is powered by machine learning.
This repository consists of the back-end of the application. The front-end, which is build on iOS, could be found via this [link](). 
The original version of the application is completed as a project for students in Mobile Development major of the Metropolia UAS in 2018.

## Installation
To run the project: 
* Clone the project
    ```
    $ git clone https://github.com/ErkHal/MAD-project-imageServer
    ```
* Install required modules
    ```
    $ npm install
    ```
* Deploy to your host

## Features
The user could use the application to send an image of the unkown waste to the server to get back the information of what sort the wastes are.
More features, such as the instruction of processing the wastes and routes to the nearest recycling center, could be added in further versions.

## Technology
The project is implemented on the base of
* **Xcode 9** - **Swift 4**
* **NodeJS**
* **ExpressJS**
* **Body-parser**
* **PathJS**
* **Cookie-parser**
* **MorganJS**
  
## API
* **POST** - upload image of a category to the server
```
{baseURL}/images/*{category}*
```
* **GET** - get all image(s) from a category
```
{baseURL}/images/*{category}*
```
* **GET** - get all categories
```
{baseURL}/categories/
```
* **GET** - get all users
```
{baseURL}/users/
```
