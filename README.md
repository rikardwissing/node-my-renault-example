# node-my-renault-example

Example of how to interface with the My Renault API.
Created using the documentation James Muscat provided here: https://muscatoxblog.blogspot.com/2019/07/delving-into-renaults-new-api.html

## How to

1. Start of by creating an .env file. You'll need to figure out how to find the api keys yourself.

´´´
GIGYA_API_ROOT = https://accounts.eu1.gigya.com
GIGYA_API_KEY = x

MY_RENAULT_ROOT = https://api-wired-prod-1-euw1.wrd-aws.com/commerce/v1
MY_RENAULT_API_KEY = x
´´´

2. Generate a store.json by running `node generate-store-json.js my-renault-username my-renault-password > store.json`.
3. Run the example `node index.js`
