<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Twitter Replicate</h3>

  <p align="center">
    A social media site which implements Twitter's 2022 design with the ability to create an account, read, and share posts!
    <br />
    <a href="https://github.com/unrulypeach/twitter-replica"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://helpful-sunshine-6b3e67.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/unrulypeach/twitter-replica/issues">Report Bug</a>
    ·
    <a href="https://github.com/unrulypeach/twitter-replica/issues">Request Feature</a>
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
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

I made this project to test my React skills because it is the first time I'm connecting my React project to an authentication (Firebase) and backend as a service (Firestore). I also decided to implement Typescript into this project to run compile time type checks to assist with finding bugs. In hindsight, I realized using Typescript for the first time on such a big project was quite difficult, especially with the implementation of the Firebase SDK in my code. Overall, this project was very fulfilling, and I hope to be able to add more features and potentially add my own backend to it as I learn Node.js and Express. 


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Typescript][Typescript.ts]][Typescript-url]
* [![Tailwind CSS][tailwindcss]][Tailwindcss-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

You will need to create an account with [Firebase](https://firebase.google.com/) to be able authenticate users and to use Firestore, Firebase's NoSQL database. 

### Installation

1. Get a free API Key at [https://firebase.google.com/](https://firebase.google.com/)
2. Clone the repo
   ```sh
   git clone https://github.com/unrulypeach/twitter-replica.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `src/configs/firebase-config.ts`
   ```js
   const firebaseConfig = {
    apiKey: ENTER_YOUR_API,
    authDomain: ENTER_YOUR_API,
    projectId: ENTER_YOUR_API,
    storageBucket: ENTER_YOUR_API,
    messagingSenderId: ENTER_YOUR_API,
    appId: ENTER_YOUR_API,
   };
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* An assignment from [The Odin Project](https://www.theodinproject.com/) (outdated, no longer apart of their curriculum) to practice React and connecting to a BAAS. Thank you [The Odin Project](https://www.theodinproject.com/) for giving me the resources to learn React and create this project!


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwindcss]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwindcss-url]: https://tailwindcss.com/
[Typescript.ts]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://typescriptlang.org