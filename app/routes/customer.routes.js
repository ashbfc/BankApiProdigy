module.exports = app => {
  const customers = require("../controllers/customer.controller.js");
 
    // By Ashish Ji 
    app.post("/addBankDetail", customers.addBankDetail);
    app.post("/bankDetails", customers.showDetails);   //customers ->contrller, showDetails->method
};
