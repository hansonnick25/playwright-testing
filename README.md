# PlaywrightTesting# oci-test-automation-webapp-ui-playwright

To install, open a Terminal and navigate to the directory where you cloned this repository.  Once there, run the following command:

npm install

**NOTE: This is only in the README.md file because this is a demo repo. In an actual project you would store these in a more secure manner.

Other setup required: 

Install dotenv using the following command:
npm install dotenv --save

Create a .env file in the base directory, paste the following: 

UI_USERNAME=standard_user
UI_PASSWORD=secret_sauce
UI_BASE_URL=https://www.saucedemo.com

Create a storage-state.json file in the base directory, paste the following: 

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

To execute Playwright tests, enter the following command from your Terminal window while in this directory:

npm run test:e2e

To view the HTML report of your most recent Playwright execution, enter the following command from your Terminal window while in this directory:

npm run show-report