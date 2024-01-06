<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h2 align="center">Twitter Replicate</h3>

  <p align="center">
    A social media site which implements Twitter's 2022 design with the ability to create an account, read, and share posts!
    <br />
    <a href="https://github.com/unrulypeach/twitter-replica/tree/node_refactor"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/unrulypeach/twit-rep-api"><strong>Explore the API »</strong></a>
    <br />
    <a href="https://twitter-replica-orpin.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/unrulypeach/twitter-replica/tree/node_refactor/issues">Report Bug</a>
    ·
    <a href="https://github.com/unrulypeach/twitter-replica/tree/node_refactor/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- I made this project to test my React skills because it is the first time I'm connecting my React project to an authentication (Firebase) and backend as a service (Firestore). I also decided to implement Typescript into this project to run compile time type checks to assist with finding bugs. In hindsight, I realized using Typescript for the first time on such a big project was quite difficult, especially with the implementation of the Firebase SDK in my code. Overall, this project was very fulfilling, and I hope to be able to add more features and potentially add my own backend to it as I learn Node.js and Express. -->

This project was created to apply React theory into a demonstrable project. The project's backend was originally managed with Firebase, a baas, which dealt with the database, storage, and user authentication. The project was then migrated from using Firebase into a full-stack project that fetches from an API created with Node.js and Express ([View the API docs here](https://github.com/unrulypeach/twit-rep-api)).

#### Features

- Authentication with JSON web tokens
- Persisten authentication with refresh tokens
- Login information hashed with salt before saving
- Backend integration with API calls and secured with authorization

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][React.js]][React-url]
- [![Typescript][Typescript.ts]][Typescript-url]
- [![Tailwind CSS][tailwindcss]][Tailwindcss-url]
- [![Axios][Axios]][Axios-url]
- [![React Router][React-Router]][React-Router-url]
- [![Express][Express.js]][Express-url]
- [![JWT][JSON-Web-Tokens]][JSON-Web-Tokens-url]
- [![MongoDB]][MongoDB-url]
- [![Mongoose][Mongoose]][Mongoose-url]
- [![Firebase][Firebase]][Firebase-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

You will need to create an account with [MongoDB](https://www.mongodb.com/) to store user authentication data, as well as user content. You will also need to run the [API service](https://github.com/unrulypeach/twit-rep-api) to get the app up and running.

_Note_
The app currently still uses Firebase storage to store images, this is so that the free tier offered on MongoDB is not potentially overused from saving files.

### Installation

1. Get a free API Key at [https://www.mongodb.com/](https://www.mongodb.com/) and [https://firebase.google.com/](https://firebase.google.com/)
2. Clone the repo

   ```sh
   git clone https://github.com/unrulypeach/twitter-replica.git
   ```

   <br/>

   _currently the content is on branch node_refactor_
   2.1 switch branches

   ```sh
   git checkout node_refactor
   ```

3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API URL in `/twitter-replicate-vite/src/api/axios.ts`
   ```js
   const BASE_URL = 'ENTER_YOUR_API_URL';
   ```
5. Enter your API in `src/configs/firebase-config.ts`
   ```js
   const firebaseConfig = {
     apiKey: 'ENTER_YOUR_API',
     authDomain: 'ENTER_YOUR_API',
     projectId: 'ENTER_YOUR_API',
     storageBucket: 'ENTER_YOUR_API',
     messagingSenderId: 'ENTER_YOUR_API',
     appId: 'ENTER_YOUR_API',
   };
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TODO -->
<!-- ROADMAP -->

## Roadmap

#### Bugs

- [ ] On homepage, when a comment deletes orig post still shows comment count
- [ ] On reply submit, does not refresh replies with new reply

#### Future implmentation

- [ ] Add AbortController to Axios methods
- [ ] User list
  - [ ] Likes list
  - [ ] Following list
  - [ ] Follower list
- [ ] Reply popout input
- [ ] Retweet

See the [open issues](https://github.com/unrulypeach/twitter-replica/tree/node_refactor/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- An assignment from [The Odin Project](https://www.theodinproject.com/) to practice React and creating and connecting to an API. Thank you [The Odin Project](https://www.theodinproject.com/) for giving me the resources to be able to create this project!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwindcss]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwindcss-url]: https://tailwindcss.com/
[Typescript.ts]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://typescriptlang.org
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express
[Express-url]: https://expressjs.com/
[React-Router]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[React-Router-url]: https://reactrouter.com/en/main
[JSON-Web-Tokens]: https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink
[JSON-Web-Tokens-url]: https://jwt.io/
[Axios]: https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios
[Axios-url]: https://axios-http.com/
[Mongoose]: https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose
[Mongoose-url]: https://mongoosejs.com/
[Firebase]: https://img.shields.io/badge/Firebase-4c4c4c?style=for-the-badge&logo=firebase
[Firebase-url]: https://firebase.google.com/
