# Viet Blog

> By [@vietvanba](https://www.linkedin.com/in/vietvanba/)

The purpose of this project is to self-learn how to create a blog website and practice my skills, integrating some new technology, framework,...\
This repository has been merged from two different repositories owned by me

> [Backend_BlogViet](https://github.com/vietvanba/Backend_BlogViet) <br/>  [Frontend_BlogViet](https://github.com/vietvanba/Frontend_BlogViet)

List of technical skills in project:

Frontend:

> - React (Nodejs v18.8.0)
> - TypeScript
> - HTML, CSS, SCSS,
> - Framer Motion

Backend:

> - Java (Java 17)
> - Spring Boot
> - Spring validation
> - Spring Security (JWT)
> - Spring Cloud Api Gateway
> - Microservices
> - MailSender

Webserver:

> - Nginx

Database:

> - Postgres (14)

Containerized:

> - Docker

## How to run

### Step 1: Set up .env file

#### 1.1 Set up .env for Backend

1. Copy .env file in directory `./1. EnvExample./Backend` to `./Backend` then replace your details

```env
JWT_SECRET=6249585ab12c6e87a183e49c8737f1c605b0c5cd664961f9333a3027d00f148e #Your secret key
JWT_EXPIRATION=86400000 # the expiration time
ALLOWED_ORIGINS=* # Setting up CORS
ALLOW_CREDENTIALS=false # Setting up CORS
JDBC_DATABASE_URL=jdbc:postgresql://postgres:5432/ #Set up your database url
JDBC_DATABASE_USERNAME=user #Set up your database username
JDBC_DATABASE_PASSWORD=password #Set up your database password
AUTH_SERVICE_DATABASE_NAME=account
MAIL_SERVICE_DATABASE_NAME=mail
QUESTION_SERVICE_DATABASE_NAME=question
LOCATION_SERVICE_DATABASE_NAME=location
MAIL_USERNAME=mail@gmail.com # Set up your maill account for mail service
MAIL_PASSWORD=password # Set up your maill password for mail service
TZ=Asia/Ho_Chi_Minh # Set up your time zone
AUTH_SERVICE_NAME=auth-service #auth service name. Please note this environment same as the service name that config in docker-compose file
MAIL_SERVICE_NAME=mail-service #mail service name. Please note this environment same as the service name that config in docker-compose file
QUESTION_SERVICE_NAME=question-service #question service name. Please note this environment same as the service name that config in docker-compose file
LOCATION_SERVICE_NAME=location-service #location service name. Please note this environment same as the service name that config in docker-compose file
```

2. Copy sql.env file in directory `./1. EnvExample./Backend` to `./Backend` then replace your details

```env
POSTGRES_DB=account #set up your database name for postgres container
POSTGRES_USER=user #set up your username for postgres container
POSTGRES_PASSWORD=password #set up your password for postgres container
```

#### 1.2 Set up .env for Frontend

1. Copy .env file in directory `./1. EnvExample./Frontend` to `./Frontend` then replace your details

```env
VITE_API_URL='http://localhost' # Set up your domain
```

### Step 2: Go to root directory and run the command line below to build and run the project

```docker
docker-compose up -d --build # if this command not working. Please try run it with administrator or sudo command
```

## Website demo

> VanBaViet Blog: [vanbaviet.com](https://vanbaviet.com)
