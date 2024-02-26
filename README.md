# Weather App

This app shows the current 5 day forecast for your IP location. You can view this site [online](https://screenmedia-weather-app-a7c88dc07f31.herokuapp.com/)

## Getting started

Fork + clone this repo and run `npm install` in the root directory of the repo.

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:5173/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Cypresss](https://github.com/cypress-io/cypress-documentation).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Cypresss](https://github.com/cypress-io/cypress-documentation).


## Assumptions
- OpenWeatherMap will be called client side, this exposes the API key and could be possibly abused in some capacity by a bad actor. A way to prevent this would be to grab weather data via the web server, with the server having more strict rate limits & other protections in place, this would also not expose the API as it would be protected by the client/server boundary
- That there should be component testing & e2e testing.
- That the user will not know their longitude or latitude, and will need an IP based system or a location based system to know their location. The system will use the IP as a base for its location.
- That the website should be available for both desktop and mobile.

## Technologies used and why
- Cypress for its E2E & component testing. This is because I find it to be a very powerful and commonly used tool, it is easy to use, very reliable as well as tests content within actual browsers, with the option to test across multiple browsers & devices.
- Vite instead of webpack for its speed and its deep integration with vue.js. It allows me to build & generate vue.js applications much faster than webpack does.
- The IP Geolocation API (non commercial version) (https://ipapi.co/json/) to quickly gather a rough location for use.
- Node.js for its simple but fast backend hosting ability.
- Vue.js 3 for its elegant and optimized design, while also being able to be easy to maintain and upgrade even by non Vue.js users since it has similar functionality to Angular & React.
- TailwindCSS for its fast but customisable approach to CSS framework design. Allows me to make a website quickly without having to touch any CSS, while still following good design principles. It is also highly optimized only providing css classes that I have used in the app.
- Pinia for scalable state management for Vue.js

## Improvements I could of added
- Add graphs for better readability.
- Add the ability to see current temperature and weather for the current hour. 
- Add the ability to ask user for their location and then grab weather information based on that.
- Add more weather information such as pressure and wind direction.
- Add more testing for per 3 hour data.
- Expanded menus for hourly data.
- More secure way of getting weather data instead of exposing my own API key.

