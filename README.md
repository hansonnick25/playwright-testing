# PlaywrightTesting

Installation Instructions:

1. Install node.js from the following site: https://nodejs.org/en/download
2. After node.js installation restart your computer (on Windows)
3. Open a terminal and type in npm install
4. Install dotenv using the following command: npm install dotenv --save
5. Install Playwright using the directions from this website: https://playwright.dev/docs/intro
6. Create a .env file in the base directory, paste the following:
   UI_USERNAME=standard_user
   UI_PASSWORD=secret_sauce
   UI_BASE_URL=https://www.saucedemo.com
7. Create a storage-state.json file in the base directory, paste the following:
   {
   "cookies": [
   {
   "name": "session-username",
   "value": "standard_user",
   "domain": "www.saucedemo.com",
   "path": "/",
   "expires": 0,
   "httpOnly": false,
   "secure": false,
   "sameSite": "Lax"
   }
   ],
   "origins": []
   }

Execution Instructions:

1. Enter the following command from your Terminal window while in this directory:
   npm run test:e2e
2. To view the HTML report of your most recent Playwright execution, enter the following command from your Terminal window while in this directory:
   npm run show-report
