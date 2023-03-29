![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Ruby](https://img.shields.io/badge/ruby-%23CC342D.svg?style=for-the-badge&logo=ruby&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Rails](https://img.shields.io/badge/rails-%23CC0000.svg?style=for-the-badge&logo=ruby-on-rails&logoColor=white)

![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## 🤖 System Logic

The following diagram shows the process and general logic of my case study design. For exhibition of tools and viability, I have
1. Pack my case study code by [docker](https://www.docker.com/) and deployed it on the cloud platform [fly.io](https://fly.io/)
2. Connect to [AWS RDS for MySQL](https://aws.amazon.com/rds/mysql/?nc1=h_ls) for storing the data
![System Logic](https://user-images.githubusercontent.com/92981525/228330474-c94e7ae1-d71e-4d4d-b7dc-832191143947.png)

## :hammer_and_wrench: Tools and Technologies

- Hub: GitHub Actions
- Framework: NodeJS
- Language: Javascript
- Backend: Express
- Package Updates: npm-check-updates
- Linting: ESLint
- Cloud Deployment: AWS EC2 / flyio
- Database: AWS RDS
- Design & Componenets library: [MD5 Bookstrap & React](https://mdbootstrap.com/docs/react/) 

## :rocket: Repository Setup

- Install [NodeJS/NPM](https://nodejs.org/en/download/)
- Install packages
  - Run `npm install` in the repo root directory
- Install [Docker](https://docs.docker.com/get-docker/)
- Install tools
  - Run `npm install -g npm-check-updates` for dependencies checker

## ✈️ Local Deployment

```bash
# Start the express API server with 
- npm run server 

# This starts the backend server at http://localhost:3001

# Start the React front end site with 
- npm start

# This startsthe frontend website at http://localhost:3000.
```

## :ship: Docker

- Build react app
  - run `npm run build`
- View existing docker images
  - run `docker ps`
- Build docker image:
  - run `docker build -t name/<unique tag>:latest`
  - or unique name `name/<unique tag>`
- See the current image in this machine:
  - docker images
- Run docker image (expose backend port of 3000 to container 80) :
  - run `docker run -p 80:3000 name/<unique tag>:latest`
- Stop docker image:
  - run `docker ps` to find the ID of the container you want to stop
  - run `docker stop <container id>` to stop the container

## 🖥  Quick Exhibition
<img src="https://user-images.githubusercontent.com/92981525/228604851-86b417bf-164e-45b7-b4cd-a9cac1968a34.png" width="500" height="500"> <img src="https://user-images.githubusercontent.com/92981525/228604871-4233421b-17df-4fd4-aaf3-23e7d18c9323.png" width="500" height="300">

##  :floppy_disk: Databases Schema

For this case study, I designed and deployed a simple database schema with

1. userId: auto generated by the server, I use date() method (in millis) to generate unique numberic id
2. username: input by the user
3. phone: input by the user

```bash
--------------------------------
| userId   | BigInt      |  PK |
--------------------------------
| username | Varchar(40) |  NN |
--------------------------------
| Phone    | Varchar(25) |  NN |
--------------------------------
```

##  :school: Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

React documentation could be checked out here [React documentation](https://reactjs.org/).
