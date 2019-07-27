"use strict";

const GigyaApi = require("node-gigya-api");
const MyRenaultApi = require("node-my-renault-api");

const generateJSON = async (username, password) => {
  const gigyaApi = new GigyaApi();
  const loginToken = await gigyaApi.fetchLoginToken(username, password);
  gigyaApi.setLoginToken(loginToken);

  const myRenault = new MyRenaultApi(gigyaApi, "SE");
  await myRenault.refreshGigyaJWTToken();

  const person = await myRenault.fetchPerson();
  const [{ accountId }] = person.accounts;

  const myAccount = myRenault.selectAccount(accountId);

  const vehicles = await myAccount.fetchVehicles();
  const [{ vin }] = vehicles.vehicleLinks;

  console.log(JSON.stringify({ loginToken, vin, accountId }));
};

generateJSON(process.argv[2], process.argv[3]);
