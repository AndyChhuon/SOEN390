# Condo Management App Description

SOEN 390 Project Winter 2024. Condo Management Application.

## Objective

Build a condo management application

## Team Members

- Amar Mahmoud (@Amar-Mahmoud)
- Andy Chhuon (@AndyChhuon)
- Camila-Paz Vejar-Rojas (@camilavejar)
- Gabriel Rodriguez (@TBD)
- Gulnoor Kaur (@gul2223)
- James Bitharas (@strikeyamato)
- Jonah (@darealstyl)
- Mark Tadros (@mark3737-tadros)
- Mohammad Usman (@0-ANONU-0)
- Nusrath Zaman (@nusrath-z)

## Technologies

**FERN Stack**

- Front-End (Client):

  - [React](https://reactnative.dev/)
  - [JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript)

- Back-End (Server):
  - [Express.JS](https://expressjs.com/)
  - [NodeJS](https://nodejs.org/en/)
  - [Firebase](https://firebase.google.com/)

## Coding Style

We are using ESLint and prettier for coding style and static analysis.
![image](https://github.com/AndyChhuon/SOEN390/assets/43625453/f47b623c-7bd0-4cdb-962d-293603f6f346)


## Setup

### Backend Setup

1. Clone this repo: `https://github.com/AndyChhuon/SOEN390.git`
2. CD into this repo and into condo-backend: `cd ./SOEN390/condo-backend`
3. Install dependencies: `npm install`
4. Add the .env file (under secrets channel on Slack) to the root folder (condo-backend)
5. Run the app: `npm run start:dev`

### Frontend Setup

1. Clone this repo: `https://github.com/AndyChhuon/SOEN390.git`
2. CD into this repo and into condo-management-app: `cd ./SOEN390/condo-management-app`
3. Install dependencies: `npm install`
4. Run the app: `npm start`
5. Scan the QR code on mobile to run the app
6. Optionally, press `w` in terminal to open the app on web


#### Backend: How to add end point

1. firebase.ts --> create baseline db data operations (update, set, push, etc)

2. Create service file (in firebase.ts folder)

2.1 add keys

2.2 add validate key function

2.3 add all functions

3. app.ts --> add post endpoint for each function created

4. useAuth.js --> add functions for the frontend here
