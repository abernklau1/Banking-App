<img src="client/public/logo.png" width="400"/>

# Century Bank
This app is a banking web app that allows users to create a profile and from there manage bank accounts. Users can create new loan accounts, oay them off and transfer money between their main accounts. User's accounts can be found on the Accounts page of the dashboard. If the user has more than 3 loan accounts pagination is invoked. and the search bar can be used to isolate specific accounts by name. 

## Overview
This was a massive learning experience as it was my first project that I completed on my own and not alongside a course. It really helped get a full understanding of react state and context as well as exactly how async function work. This was also a big learning experience for web design and styling of elements. The biggest challenge I have always had when building small web projects was the stying aspect. In this project I was able to practice styling with css and fully understand the different CSS properties and implement small features like a sidebar and a search bar.

<img src="client/public/home-page.png" width="500"/>

## Technologies
This was my first project done completely on my own after learning web development from The Complete 2022 Web Development Bootcamp by Dr. Angela Yu and MERN Stack Course 2022 by John Smilga. 

The technologies within this project include:
<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-original-wordmark.svg" title="MongoDB" alt="MongoDB" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" title="Express" alt="Express" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-plain-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
</div>

## Installation
This project's dependencies can be found in the BankAppDependencies.txt file. These are all the packages used to create this project, just install using npm: ``` npm i <packageName> ``` once you have cloned the project. I found that when cloning a project using react there was a bug whenever I made a change on the client side: ```ERROR in Plugin "react" was conflicted between "package.json » eslint-config-react-app```. This is due to a casing problem -- on windows specifically -- in which one of the directories that the node_modules is looking for is of a different case. A quick but impermanent solution is to resave (ctl + s) your package.json on the client side but the problem persists so the other option is to find the specific folder through File Explorer or cd using the terminal into the project folder with the exact casing.

## Where to view
A working build of this app can be found here <a href="https://century-bank.herokuapp.com">Century Bank</a>

## License
© 2022 Andrew Bernklau
