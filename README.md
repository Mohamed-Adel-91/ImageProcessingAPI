# ImageProcessingAPI

# scripts

- 1 - npm install : `npm i`
- 2 - npm run build : `npx tsc`
- 3 - npm run test : `npm run build && npm run jasmine`
- 4 - npm run lint : `eslint . --ext .ts`
- 5 - npm run prettier : `prettier --config .prettierrc \"src/**/*.ts\" --write `
- 6 - npm run start : `nodemon src/index.ts` >> to start server

# listing on port

- The server will listen on port 3000

# Endpoint

http://localhost:3000/

- Expected query arguments are:
  -1- filename : with out extension of image
  -2- width : positive number < 1
  -3- height : positive number < 1

# To Resize images

http://localhost:3000/image?filename=fjord&width=200&height=200
