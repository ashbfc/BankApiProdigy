const sql = require("./db.js");
const Customer = function(customer) {
 
};


Customer.findByemailide = (mydata, result) => {
    let email=mydata.email;
    sql.query(`SELECT user_bank.* FROM user_bank INNER JOIN users on users.id=user_bank.user_id where users.email='${email}'`, (err, res) => {   
    console.log("customers: ", res);

    if (res.length) {
      console.log("Bank details found");
      result(null,{ status:200, message:"Bank details found successfully ",  data:res });
      return;
    }
    else{  
      console.log("Bank details not found"); 
      result(null,{ status:200, message:"Bank details not found ",  data:res });
  }
  });
};


 

Customer.m_addBankDetail = (inputData, result) => {

  console.log("m-line29", inputData);

   sql.query(`SELECT * FROM users WHERE email = '${inputData.email}'`, (err, res) => {
    if (res.length) {
      let my_user_id = res[0].id; 
      inputData.user_id=my_user_id; 
      console.log("Email found");
      let sql_userbank = `INSERT INTO user_bank (user_id,bank_name,acoount_type,branch,accountNo,fscode) VALUES ('${inputData.user_id}', '${inputData.name}','${inputData.account_type}','${inputData.branch}','${inputData.accountno}','${inputData.ifsc}')`; 
     
      sql.query(sql_userbank, function (err, resvv) {

         console.log("created customer: ",resvv);
         result(null,{ status:200, message:"Bank Details added ",  data:resvv });
         
       });
      return;
      }
      else{  
        console.log("Email not found"); 
        result(null,{ status:200, message:"Email not found in users table ." });
      }
 })
 };


module.exports = Customer;
