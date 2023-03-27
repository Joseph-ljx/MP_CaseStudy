## EC2 Running

## Tools and Technologies

- Hub: GitHub Actions
- Framework: NodeJS
- Language: Javascript
- Backend: Express
- Package Updates: npm-check-updates
- Linting: ESLint
- Deployment AWS EC2 / flyio
- Database AWS RDS

## Repository Setup

- Install [NodeJS/NPM](https://nodejs.org/en/download/)
- Install packages
  - Run `npm install` in the repo root directory
- Install [Docker](https://docs.docker.com/get-docker/)
- Install tools
  - Run `npm install -g npm-check-updates` for dependencies checker

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

React documentation could be checked out here [React documentation](https://reactjs.org/).

### Local development

Start the express API server with `npm run server`. This starts the backend server at http://localhost:3000.

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- The page will reload if you make edits. You may see some lint error in the console log.

Start the React front end site with `npm start`. This startsthe frontend website at http://localhost:3001.

- Open [http://localhost:3001](http://localhost:3001) to view it in the browser.
- You may see some lint error in the console log.
- For the frontend React framework, I adopt a componenets library called md5 boostrap. Thanks for its beautiful designs, I could have a brief and useful scheme for my case study. More information about this library could be found at [MD5 Bookstrap & React](https://mdbootstrap.com/docs/react/) 

### Docker

- Build react app
  - run `npm run build`
- View existing docker images
  - run `docker ps`
- Build docker image:
  - run `docker build -t ljx02263/ediss-a1:latest`
  - or unique name `ljx02263/<unique tag>`
- See the current image in this machine:
  - docker images
- Run docker image (expose backend port of 3000 to container 80) :
  - run `docker run -p 80:3000 ljx02263/MP_CaseStudy:latest`
- Stop docker image:
  - run `docker ps` to find the ID of the container you want to stop
  - run `docker stop <container id>` to stop the container
