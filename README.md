## Getting Started

### Requirements
This application requires an account with [Discogs](https://www.discogs.com/) and an registered Application so that you can get a Consumer Key and Consumer Secret.  You local machine will also require node to run the application.

### Installation
1. First make sure you are using the proper version of node.  Included in the repo is a `.nvmrc` file to load up the proper version of node using node version manager.  If you do not have node version manager installed, this application was developed using `v20.13.1`.  If you do use node version manager, from the project root directory execute the following command

```bash
nvm use
```

2. Create a .env.local file to store the following environment variables

```bash
DISCOGS_CONSUMER_KEY=XXXXXXX
DISCOGS_CONSUMER_SECRET=XXXXXXXX
API_URL=https://api.discogs.com
```

3.  Run the following command to install all the necessary node libraries.

```bash
npm install
# or
yarn install
```

### Running the application
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

### Testing
Run the following command to run the test cases

```bash
npm test
```
