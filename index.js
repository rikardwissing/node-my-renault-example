"use strict";

try {
  require("./store.json");
} catch (err) {
  console.log(
    "Could not find store.json. Generate one by running generate-store-json with your login details"
  );
  process.exit();
}

const GigyaApi = require("node-gigya-api");
const MyRenaultApi = require("node-my-renault-api");
const { loginToken, accountId, vin } = require("./store.json");

const run = async () => {
  const gigyaApi = new GigyaApi(loginToken);
  const myRenault = new MyRenaultApi(gigyaApi);
  await myRenault.refreshTokens(accountId);

  const myCar = myRenault.selectCar(vin);

  const gets = {
    batteryStatus: await myCar.fetchBatteryStatus(),
    hvacStatus: await myCar.fetchHVACStatus(),
    charges: await myCar.fetchCharges(),
    dailyChargeHistory: await myCar.fetchDailyChargeHistory(),
    monthlyChargeHistory: await myCar.fetchMonthlyChargeHistory(),
    hvacSessions: await myCar.fetchHVACSessions(),
    dailyHVACHistory: await myCar.fetchDailyHVACHistory(),
    monthlyHVACHistory: await myCar.fetchMonthlyHVACHistory(),
    cockpit: await myCar.fetchCockpit()
  };

  // const startPreconditioning = await myCar.startPreconditioning(18);
  // const stopPreconditioning = await myCar.stopPreconditioning();

  console.log(JSON.stringify(gets));
};

run();
