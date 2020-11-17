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
      let sql_userbank = `INSERT INTO user_bank (user_id,bank_name,acoount_type,branch,accountNo,fscode,isprimary_bank,bank_code) VALUES ('${inputData.user_id}', '${inputData.name}','${inputData.account_type}','${inputData.branch}','${inputData.accountno}','${inputData.ifsc}',0,'${inputData.bank_code}')`; 
     
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

/////////////////////////////////////////


Customer.getAllProducts =  (Req_array, result) => {
  // console.log("mm-line-374",Req_array)
   let AMC_CODE=Req_array.AMC_CODE; 
   let ASSET_CLASS=Req_array.ASSET_CLASS;
 
   let REINVEST_TAG=Req_array.REINVEST_TAG;
   let DIV_GW=Req_array.DIV_GW;
 
 
 
    console.log("m-- data is ",REINVEST_TAG);
 
 
   if (typeof ASSET_CLASS !== "undefined") {
     ASSET_CLASS=Req_array.ASSET_CLASS.toLowerCase();
   if(ASSET_CLASS==='equity'){
     ASSET_CLASS_text='EQ';
   }else if(ASSET_CLASS==='debt' || ASSET_CLASS==='income' || ASSET_CLASS==='cash'){
     ASSET_CLASS_text='DEBT';
   }else{
 
     ASSET_CLASS =undefined
   }
 
 }
 
  
 //SELECT * FROM `products` WHERE `PRODUCT_LONG_NAME` LIKE '%Div.%' or PRODUCT_LONG_NAME LIKE '%Dividend%' ORDER BY `PRODUCT_LONG_NAME` ASC
 
 let QS2='';
 if (typeof DIV_GW !== "undefined") {
        DIV_GW=Req_array.DIV_GW.toUpperCase();
 
 if(DIV_GW === "DIVIDEND"){
 
   QS2=  " and ( PRODUCT_LONG_NAME Like '%Div.%' or  PRODUCT_LONG_NAME Like '%Dividend%' ) "
 }else if(DIV_GW === "GROWTH"){
   QS2=  " and ( PRODUCT_LONG_NAME Like '%GW.%' or  PRODUCT_LONG_NAME Like '%Growth%' or  PRODUCT_LONG_NAME Like '%GW%' ) "
 }else{
   QS2=  "and 1=1"
 }
 }
 
 
 
 
 
 
 
 
 
 
 let QS1='';
 if (typeof REINVEST_TAG !== "undefined") {
 
 if(REINVEST_TAG === "Y"){
   QS1=  " and REINVEST_TAG='Y'"
 }else if(REINVEST_TAG === "Z" || REINVEST_TAG === "X" || REINVEST_TAG === "N" ){
   QS1=  " and REINVEST_TAG!='Y' "
 }else{
   QS1=  "and 1=1"
 }
 }
 
 
 
 
 
 
 
 
 
   // var x=ASSET_CLASS;
   let QS='';
   if (typeof ASSET_CLASS === "undefined") {
      QS=  "and 1=1"
   } else {    
     QS=  " and ASSET_CLASS Like '%"+`${ASSET_CLASS_text}`+"%' "
   }
 
  
 
 
  
  let cQS=`SELECT * FROM products where 1=1 and AMC_CODE='${AMC_CODE}' ${QS}  ${QS1} ${QS2}` 
 
   sql.query(cQS, (err, res) => {
     if (err) {
       console.log("error: ", err);
       result(null, err);
       return;
     }
 
     let datacnt= res.length;
 
 
     console.log("the product data are: ", res);
      mking={
       data_count:datacnt,
       data_result:res,
       data_query:cQS
 
      }
 
        result(null, mking);
   });
 };
 
 //////////////////////////////
 Customer.getAllnsebank = result => {
  sql.query("SELECT * FROM banks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("NSEBanksList: ", res);
    result(null, res);
  });
};

 /////////////////////////

   
Customer.findByIdusers = (customerId, result) => {
  console.log("sdfsdfsdf1111111");
  var hdh="SELECT * FROM users WHERE email ='"+`${customerId}`+"'";
  console.log(hdh);
  sql.query(hdh, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


/////////////////////////

Customer.getFatcamm_nov = (email, result) => {

  sql.query("SELECT * FROM users where email='"+`${email}`+"'", (err, res) => {    
    console.log("m- line 351 ")
    if (Array.isArray(res) && res.length) {
    if (res[0].hasOwnProperty('email')) {  
    let u_id=res[0].id;
    console.log("m- line 355 ",u_id)
    result(null, res);     }}
    else{     
     console.log("m- line 358 ")
     result(null, res);      
  }  
});

};
 
//////////////////////////////////////
  Customer.purchase_normal  = (email, result) => {
let sqlquery="SELECT * FROM users INNER JOIN user_bank ON users.id=user_bank.user_id where user_bank.isprimary_bank=1 and users.email='"+`${email}`+"'";
    
sql.query(sqlquery, (err, res) => {  
//sql.query("SELECT * FROM users where email='"+`${email}`+"'", (err, res) => {    
      console.log("m- line 351 ")
      if (Array.isArray(res) && res.length) {
      if (res[0].hasOwnProperty('email')) {  
      let u_id=res[0].id;
      console.log("m- line 355 ",u_id)
      result(null, res);     }}
      else{     
       console.log("m- line 358 ")
       result(null, res);      
    }  
  });
  
  };
module.exports = Customer;
