const Customer = require("../models/customer.model.js");
const substrings = require("../../node_modules/substrings");
// const substr = require("../../node_modules/substr");
//  const parser = require('../../node_modules/xml2json');
//onst https = require('../../node_modules/https');
var mysql = require('../../node_modules/mysql');
var jsonxml  = require('../../node_modules/xml2js');
var jsonxml  = require('../../node_modules/jsontoxml');
var convert = require('../../node_modules/xml-js');

const axios = require('../../node_modules/axios');

var fs = require('fs');
const { ECONNABORTED } = require("constants");

exports.showDetails = (req, res) => {
 //console.log(req.body)
// return;
let ash_data1=''
let errflag1=0
if(req.body.email===undefined || req.body.email==''){
  ash_data1=" email: feild is required";
  errflag1=1;
 // console.log(" email: feild is required");
}
if(errflag1===0){  
 Customer.findByemailide(req.body, (err, data)  => {
  res.send(data);
  return;     
 });       
  }else{    
  console.log(" vvvvvvvvvvvvvv v111111111111111111");
  res.json({ status:200, message:ash_data1,data11:"Validation Error" });
  return;
};
};

 
exports.addBankDetail = (req, res) => {
  // Validate request
  // console.log(req.body);
  // return;   

  let ash_data={}
  let errflag=0
  if (req.body.name===undefined || req.body.name==''){     
    
    ash_data.name=" name: feild is required";
    errflag=1;

   // console.log(" name: feild is required");        
  } if (req.body.accountno===undefined || req.body.accountno==''){
    
    ash_data.accountno=" accountno: feild is required";
    errflag=1;

   // console.log(" accountno: feild is required");
  }  if (req.body.account_type===undefined || req.body.account_type==''){
    
    ash_data.account_type=" account_type: feild is required";
    errflag=1;

   // console.log(" accountno: feild is required");
  } if(req.body.branch===undefined || req.body.branch==''){
    
    ash_data.branch=" branch: feild is required";
    errflag=1;
   // console.log(" branch: feild is required");

  } if(req.body.ifsc===undefined || req.body.ifsc==''){
    ash_data.ifsc=" ifsc: feild is required";
    errflag=1;
   
    //console.log(" ifsc: feild is required");
  
  } if(req.body.bank_code===undefined || req.body.bank_code==''){
    ash_data.bank_code=" bank_code: feild is required";
    errflag=1;
   
    //console.log(" ifsc: feild is required");
  } if(req.body.email===undefined || req.body.email==''){
    ash_data.email=" email: feild is required";
    errflag=1;
   // console.log(" email: feild is required");
  }


  if(errflag===0){  
    Customer.m_addBankDetail(req.body, (err, data) => {
    //  console.log(req.body.name);
    res.send(data);
    return;     
   });       
    }else{    
    console.log(" vvvvvvvvvvvvvv v111111111111111111");
    res.json({ status:200, message:ash_data,data11:"Validation Error" });
    return;
    // res.send(data); 
    }
 

};

////////////////////////////////

exports.findAllProducts=(req, res)=>{
  console.log("all products will be listed here")

  const postarray= { 
    
    AMC_CODE:req.body.AMC_CODE,
    ASSET_CLASS:req.body.ASSET_CLASS,
    REINVEST_TAG:req.body.REINVEST_TAG,
    DIV_GW:req.body.DIV_GW
  }

  Customer.getAllProducts(postarray,(err, data) => {



//  Customer.getAllProducts(req.params.ProductId,(err, data)=>{
    if(err)
    res.status(500).send({
      message:
      err.message || "Some error occured while"
    })

    else {
     // console.log(data)
         cking = {
          status:"200",
          message: "Successfully",
          data_count:data.data_count,
          data:data.data_result,
          data_query:data.data_query
         

         }


         res.send(cking)
      
    }

   //   console.log("Last - Line 1080",req.body.ProductId)
    // console.log("Last - Line 1080",req)
  })
}

////////////////////////////////////////////////////////////

exports.bankverify= (req, res) => {
  console.log("hi agam dear! kaise hosss?")
  
//  console.log("the form data is", req.body.beneficiaryName)

  let data=req.body;
//  console.log("the form data is", data.beneficiaryAccount)


if(data.beneficiaryAccount!="" && data.beneficiaryIFSC!="" && data.beneficiaryName!="" && data.beneficiaryMobile!=""){

  let json_data1={
    "merchantId": "5f819ad1ad96f68826a46c56",
    "inputData": {
        "service": "nonRoc",
        "type": "bankaccountverifications",
        "task": "bankTransfer",
        "data": {
            "images":'',
            "toVerifyData":'',
            "searchParam": {
                "beneficiaryAccount":data.beneficiaryAccount,
                "beneficiaryIFSC": data.beneficiaryIFSC,
                "beneficiaryName":data.beneficiaryName,
                "beneficiaryMobile":data.beneficiaryMobile
            }
        }
    }
}

console.log("SharukhKhan", json_data1.inputData.data.searchParam)

let json_data2={
  "email":"testing21@gmail.com"
}


// console.log(json_data.inputData.data);
let jik1 = 'https://multi-channel-preproduction.signzy.tech/api/onboardings/execute';
let jik2 = 'https://prodigy-agam.herokuapp.com/readFatca1';

   axios.post(jik1,
json_data1,
{headers:
  { 'Authorization' : 'kOy3FVBSuGpFprKdtIvQLEjuoopXAp7JSvlTTafA55VBcSuqhRLez0SBza8XRFQG',                
    'Content-Type': 'application/json'
   }
}).then(res2=>{

  var data1=res2.data.object
  console.log("782 agam the o/p is newagam",data1)

  const textc = {                  
    'status' : '200', 
    'message' : 'Successfully',
    'message_1':data1 };   
  res.send(textc)
  return


/*  agammess= {
    status:200,
    message_0:'Success',            
    message: "hi agam"  
  }
  return res.status(200).json(agammess)  */


  // return res.json({
  //   success: 0,
  //   message: "Record  Found"
  // })


});
}

else{

let nodata = {                  
  'status' : '200', 
  'message' : 'pls enter the required details',
   };   
res.send(nodata)
return 

}




}


  ////////////////////////////////////////////////////////////

  exports.bankverify2= (req, res) => {
    console.log("bank verify  controller 2")

    let data=req.body;
 console.log("the form data is", data.signzyId)

    if(data.signzyId!="" && data.amount!=""){


      let json_data1={
        "merchantId": "5f819ad1ad96f68826a46c56",
        "inputData": {
            "service": "nonRoc",
            "type": "bankaccountverifications",
            "task": "verifyAmount",
            "data": {
                "images": '',
                "toVerifyData": '',
                "searchParam": {
                    "amount": data.amount,
                    "signzyId": data.signzyId
                }
            }
        }
    }

    console.log("AmirKhan", json_data1.inputData.data.searchParam)

    let json_data2={
      "email":"testing21@gmail.com"
  }


    // console.log(json_data.inputData.data);
    let jik1 = 'https://multi-channel-preproduction.signzy.tech/api/onboardings/execute';
    let jik2 = 'https://prodigy-agam.herokuapp.com/readFatca1';

       axios.post(jik1,
            json_data1,
    {headers:
      {   'Authorization' : 'kOy3FVBSuGpFprKdtIvQLEjuoopXAp7JSvlTTafA55VBcSuqhRLez0SBza8XRFQG',             
          'Content-Type': 'application/json'}
    }).then(res3=>{

      var data1=res3.data.object
    console.log("782 agam the o/p  bank 2 is new-agam",data1)

   const textc = {                  
      'status' : '200', 
      'message' : 'Successfully',
      'message_1':data1 };   
    res.send(textc)
    return  




   //   console.log("agam the o/p  bank 2 is ");
    }).catch(err=>{console.log("the agam error bank 2 is ")});


    }else{

      let nodata2 = {                  
        'status' : '200', 
        'message' : 'pls enter the signzyId or amount',
         };   
      res.send(nodata2)
      return 

    }

  }//


  /////////////////////////////
  
exports.findOne1users = (req, res) => {
  Customer.findByIdusers(req.params.emailId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.emailId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.emailId
        });
      }
    } else {   
             
     //      {"id":1,"name":"ajay","user_id":"","email":"akmaurya31@gmail.com","pin":0,"phone":"9616118873","email_verified_at":null,"password":"$2y$10$PRNuNEtQfJoCnJ.yoM9y/uYHft5YfIUGKalyF3UqBUGBcpb6JvZDy","role":2,"profile_pic":null,"address":"Lucknow","locallity":"bfc","pincode":226010,"country":101,"state":"Utter paradesh","city":"Lucknow","date_of_birrth":"1995-03-03T00:00:00.000Z","father_name":"MrLalji Mauray","mother_name":"N","gender":"2","material_status":1,"birth_palce":"lucknow","occupation":3,"income_range":1,"resident_status":"1","othertaxpayer":null,"exposedPolitically":null,"taxIdentificationNo":"12346097653","taxcountry":null,"identificationType":"commercial","signature":"public/uploads/signature/159860911077579.jpg","remember_token":"rnAc63UZGO","created_at":"2020-07-30T06:28:32.000Z","updated_at":"2020-09-17T20:48:46.000Z","otp":0,"status":1,"pan_card":"dtyrrt","social_id":"","address_proof":null,"iin":"","ID_NUMBER":""}
   
      
      var dated=data.date_of_birrth;   
      
      var dd = String(dated.getDate()).padStart(2, '0');
      var mmm = String(dated.getMonth() + 1).padStart(2, '0');
      var yyyy = dated.getFullYear();
      
      var nefodate= dd + "-" + mmm + "-" + yyyy;
      var frmt_dob1 ={ "date_of_birth" : nefodate };      
      
      const assign_dob_in_data = Object.assign(data, frmt_dob1);    
      const textc = { 'message' : 'Successfully', 'status' : '200', 'data':data };   
      res.send(textc);    
    }
  });
};

//////////////////////////

// Retrieve all Customers from the database.
exports.getnsebank = (req, res) => {  
  Customer.getAllnsebank((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred w1111hile retrieving customers."
      });
    else { 
      
      const textc = { 'message' : 'Successfully', 'status' : '200', 'data':data };   
      res.send(textc);    
          
         // res.send(data); 
    
    }
  });
};


////////////////


exports.readFatca1_nov= (req, res) => {  

  const postarray= { email:req.body.email }

  Customer.getFatcamm_nov(postarray.email,(err, data) => {

    if(data!=null){        
      if (!Array.isArray(data) || !data.length) {                
     return res.json({
       success: 200,
       message: "Email Record not Found in user table"
     });
   }}
   
   let urs=data[0]
   let resdatemy=String(urs.date_of_birrth);        
   let xb=resdatemy.split(" ");     
   let mydob_xb=xb[2]+"-"+xb[1]+"-"+xb[3]
   let pep= (urs.exposedPolitically == '1') ? "N" : "Y";
   //console.log("res line 844",urs);
   //return

   
   let arrk={NMFIIService:{service_request:{
    appln_id:'MFS21399',
    password:'Account@2121',
    broker_code:'ARN-21399',
    pan:urs.pan_card,
    tax_status:'01',
    investor_name:urs.name,
    chkExempIndValid:'N',
    editor_id:'KGNANA',
    ubo_applicable_count:'2',
    iin:urs.iin,
    kyc:{
      app_income_code:urs.income_range,
      net_worth_sign:'+',
      net_worth:'5000',
      net_worth_date:'31-Jul-2015',
     // pep: testBoolean ? "attributeTwo" : "attributeTwoToo",
    //  pep: if(urs.exposedPolitically == '1') ? "N" : "Y",
       pep:pep,
      occ_code:urs.occupation,
      source_wealth:'03',
      corp_servs:'01'
    },
    Fatca:{
         dob:mydob_xb,   //timezone issue
         addr_type:"1",  //<--- from table doc address
         data_src:"E", //<---  from Phycial or Email
        log_name:urs.email,     //email id already dynamic
         country_of_birth:'IND', //<---
          place_birth: urs.city,
        tax_residency:NaN,  //<---
       country_tax_residency1:urs.taxcountry,  //<---
        tax_payer_identityno1:'PYBQI9229X',  //<---
         id1_type:'C',  //<---
        country_tax_residency2:'',
       tax_payer_identityno2:'',
        id2_type:'',
        country_tax_residency3:'',
        tax_payer_identityno3:'',
        id3_type:'',
        country_tax_residency4:'',
        tax_payer_identityno4:'',
        id4_type:'',
        ffi_drnfe:'',
        nffe_catg:'',
        nature_bus:'',
        act_nfe_subcat:'',
        stock_exchange:'',
        listed_company:'',
        us_person:'N',
        exemp_code:'',
        giin_applicable:'',
        giin:'',
        giin_exem_cat:'',
        sponcer_availability:'',
        sponcer_entity:'',
        giin_not_app:'',
        fatca_dec_received:'Y',
    },
    ubo:{
           ubo_add1:'df',
           ubo_add2:'ddd',
           ubo_add3:'dd',
           ubo_master_codes:'C04',
           ubo_pan_no:'THTHT1234P',
           ubo_name:'BDDD',
           ubo_country_tax_residency:'IND',
           ubo_cob:'TN',
           ubo_cocn:'IND',
           ubo_country:'IND',
          ubo_dob:'14-Jan-1988',
          ubo_father_nam:'JDFD',
          ubo_gender:'M',
          ubo_holding_perc:'100',
          ubo_occ_code:'3D',
          ubo_tel_no:'5151515',
          ubo_mobile:'9876543121',
          ubo_pincode:'123123',
          ubo_city:'SDF',
          ubo_state:'SDF',
         ubo_add_type:'1',
         ubo_id_type:'C',
         ubo_tin_no:'SADFD6265D'
    }//ubo  
  }//service_request
} //NMFIIService
}//else

let xml_agamji=jsonxml(arrk);

axios.post('https://uat.nsenmf.com/NMFIITrxnService/NMFTrxnService/FATCAKYCUBOREG',
        xml_agamji,
        {headers:
          {'Content-Type': 'text/xml'}
        }).then(res22=>{

          console.log("C- Output XML - Line 946", res22)
          let result1 = convert.xml2js(res22.data, {compact: true, spaces: 4});
          let fatcaresult=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code._text;
          let fatcaresult2=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;
     //  console.log("C- Output XML - Line 950", result1)
       //   console.log("C- Output XML - Line 951", fatcaresult)
        //  console.log("C- Output XML - Line 956", fatcaresult2)
		//console.log("i am cool 880");
		//var gi=typeof fatcaresult2[0].return_msg;
		//console.log("c- 881- ", gi);
		
		let newdata0= fatcaresult2[0];
		let newdata0_0= fatcaresult2[1];
		let adddata1="";
		let	adddata2="";
		
		if(typeof newdata0 !== "undefined"  || typeof newdata0_0 !== "undefined"){
		let newdata1= fatcaresult2[0].return_msg;
		let newdata2= fatcaresult2[1].return_msg;
		
		let newdata3= fatcaresult2[0].Status_Desc;
		let newdata4= fatcaresult2[1].Status_Desc;
		if( typeof newdata1 !== "undefined"  || typeof newdata2 !== "undefined"){
			adddata1= fatcaresult2[0].return_msg._text
			adddata2= fatcaresult2[1].return_msg._text
			
		}else if(typeof newdata3 !== "undefined"  || typeof newdata4 !== "undefined"){
			adddata1= fatcaresult2[0].Status_Desc._text
			adddata2= fatcaresult2[1].Status_Desc._text
		}else{
			adddata1="";
			adddata2="";
			
		}
		}
		
		
		
	
			//  console.log("C- Output XML - Line 958", fatcaresult2[0].return_msg._text)
			//  console.log("C- Output XML - Line 960", fatcaresult2[1].return_msg._text)
	
		  
          let agammess='';
		  
		  

          if(fatcaresult==0){    
            agammess= {
               status:200,
               message:'Successfully',            
               message_full: fatcaresult2  
             }
           }else{
             agammess= {
               status:200,
               message:'Successfully',
              // message_1: fatcaresult2,               
               data:  { "0": adddata1, "1": adddata2 },              
 			   message_third_api:'FAILED',
			   message_full:fatcaresult2,
              }
           }
           return res.status(200).json(agammess)
        }).catch(err=>{console.log(err)});
console.log("res last line 969");
  });
  }   

  //////////////////////////////////////////////////////////////
 // Customer.m_addBankDetail(req.body, (err, data) => {
  exports.purchase = (req, res) => {  
    console.log("purchase")
    const postarray= { email:req.body.email,
      sub_trxn_type:req.body.sub_trxn_type,
      trxn_acceptance:req.body.trxn_acceptance,
      payment_mode:req.body.payment_mode,
      instrm_amount:req.body.instrm_amount,
      debit_amount_type:req.body.debit_amount_type,
      Return_paymnt_flag:req.body.Return_paymnt_flag,
      Client_callback_url:req.body.Client_callback_url,
      ach_exist:req.body.ach_exist,
      amc:req.body.amc,
      product_code:req.body.product_code,
      reinvest:req.body.reinvest,
      amount:req.body.amount,
      input_ref_no:req.body.input_ref_no,
      perpetual_flag:req.body.perpetual_flag

    }
   // return;
   Customer.purchase_normal(postarray.email,(err, data) => {

    if(data!=null){        
      if (!Array.isArray(data) || !data.length) {                
     return res.json({
       success: 200,
       message: "Email Record not Found in user table"
     });
   }}
   
   let urs=data[0]
   let resdatemy=String(urs.date_of_birrth);   
    let resaccountNomy=urs.accountNo;
    console.log("res line 844",urs.bank_code);
    //return
   let xb=resdatemy.split(" ");     
   let mydob_xb=xb[2]+"-"+xb[1]+"-"+xb[3]
   let pep= (urs.exposedPolitically == '1') ? "N" : "Y";
   //console.log("res line 844",urs);
   //return
    //Customer.perchase_normal((err, data) => {
     
      let ash_arrk={NMFIIService:{
        service_request:{
        appln_id:'MFS21399',
        password:'Account@2121',
        broker_code:'ARN-21399',
        iin:urs.iin,
        sub_trxn_type:postarray.sub_trxn_type,
        poa: 'N',
        poa_bank_trxn_type: [],
        trxn_acceptance:postarray.trxn_acceptance,
        demat_user: 'N',
        dp_id: [],
        bank: urs.bank_code,
        ac_no: resaccountNomy,
        ifsc_code: urs.fscode,
        sub_broker_arn_code: [],
        sub_broker_code: [],
        euin_opted: 'N',
        euin: 'E073161',
        trxn_execution: [],
        remarks: [],
        payment_mode: postarray.payment_mode,
        billdesk_bank: urs.bank_code,
        instrm_bank:  urs.bank_code,
        instrm_ac_no: [],
        instrm_no: [],
        instrm_amount:postarray.instrm_amount,
        instrm_date: [],
        instrm_branch: [],
        instrm_charges: [],
        micr: [],
        rtgs_code: [],
        neft_ifsc: [],
        advisory_charge: [],
        dd_charge: [],
        cheque_deposit_mode: [],
        debit_amount_type: postarray.debit_amount_type,
        sip_micr_no: [],
        sip_bank: [],
        sip_branch: [],
        sip_acc_no: [],
        sip_ac_type: [],
        sip_ifsc_code: [],
        sip_paymech: [],
        umrn: [],
        ach_amt: [],
        ach_fromdate: [],
        ach_enddate: [],
        until_cancelled: [],
        Return_paymnt_flag: postarray.Return_paymnt_flag,
        Client_callback_url: postarray.Client_callback_url,
        Bank_holder_name: urs.name,
        Bank_holder_name1: [],
        Bank_holder_name2: [],
        iin_conf_flag: 'Y',
        trxn_initiator: 'O',
        trans_count: '1',
        utr_no: [],
        transfer_date: '15-Feb-2020',
        investor_auth_log: [],
        ach_exist: postarray.ach_exist,
        instrm_bank: urs.bank_code
        },
        childtrans: { 
        amc: postarray.amc,
        folio: [],
        product_code: postarray.product_code,
        ft_acc_no: [],
        reinvest: postarray.reinvest,
        amount: postarray.amount,
        sip_from_date: [],
        sip_end_date: [],
        sip_freq: [],
        sip_amount: [],
        sip_period_day: [],
        input_ref_no: postarray.input_ref_no,
        perpetual_flag: postarray.perpetual_flag,
        insurance_enabled: [],
        GOAL_BASED_SIP: [],
        GOAL_TYPE: [],
        GOAL_AMOUNT: [],
        FREEDOM_SIP: [],
        FREEDOM_TARGET_SCHEME: [],
        FREEDOM_TENURE: [],
        FREEDOM_SWP_AMOUNT: [],
        iin: [],
        sub_broker_arn_code: [],
        sub_broker_code: [],
        instrm_date: [],
        instrm_branch: [],
        instrm_charges: [],
        micr: [],
        rtgs_code: [],
        neft_ifsc: [],
        advisory_charge: [],
        dd_charge: [],
        cheque_deposit_mode: [],
        debit_amount_type: [],
        sip_micr_no: [],
        sip_bank: [],
        sip_branch: [],
        sip_acc_no: [],
        sip_ac_type: [],
        sip_ifsc_code: [],
        sip_paymech: [],
        umrn: [],
        ach_amt: [],
        ach_fromdate: [],
        ach_enddate: []
       }  
      }//service_request
    } //NMFIIService
    //else
    
    
     
     
   // console.log(ash_arrk);
    let ash_xml_agamji=jsonxml(ash_arrk);  
    //console.log(ash_xml_agamji);

    
    console.log(ash_xml_agamji);
    axios.post('https://uat.nsenmf.com/NMFIITrxnService/NMFTrxnService/PURCHASETRXN',
    ash_xml_agamji,
    {headers:
      {'Content-Type': 'text/xml'}
    }).then(res22=>{
     console.log("C- Output XML - Line 946", res22)  


     let result1 = convert.xml2js(res22.data, {compact: true, spaces: 4});
          let fatcaresult=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code._text;
          let fatcaresult2=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;
     //  console.log("C- Output XML - Line 950", result1)
       //   console.log("C- Output XML - Line 951", fatcaresult)
        //  console.log("C- Output XML - Line 956", fatcaresult2)
		//console.log("i am cool 880");
		//var gi=typeof fatcaresult2[0].return_msg;
		//console.log("c- 881- ", gi);
		
		let newdata0= fatcaresult2[0];
		let newdata0_0= fatcaresult2[1];
		let adddata1="";
		let	adddata2="";
		
		if(typeof newdata0 !== "undefined"  || typeof newdata0_0 !== "undefined"){
		let newdata1= fatcaresult2[0].return_msg;
		let newdata2= fatcaresult2[1].return_msg;
		
		let newdata3= fatcaresult2[0].Status_Desc;
		let newdata4= fatcaresult2[1].Status_Desc;
		if( typeof newdata1 !== "undefined"  || typeof newdata2 !== "undefined"){
			adddata1= fatcaresult2[0].return_msg._text
			adddata2= fatcaresult2[1].return_msg._text
			
		}else if(typeof newdata3 !== "undefined"  || typeof newdata4 !== "undefined"){
			adddata1= fatcaresult2[0].Status_Desc._text
			adddata2= fatcaresult2[1].Status_Desc._text
		}else{
			adddata1="";
			adddata2="";
			
		}
    }
    
    if(fatcaresult==0){    
    console.log("C- Output XML - Unique_No:", fatcaresult2.Unique_No._text)
    console.log("C- Output XML - Trxn_No:", fatcaresult2.Trxn_No._text)
		console.log("C- Output XML - Application_No:", fatcaresult2.Application_No._text)
    console.log("C- Output XML - Fund:", fatcaresult2.Fund._text)    
    console.log("C- Output XML - Scheme:", fatcaresult2.Scheme._text)
		console.log("C- Output XML - Scheme_Name:", fatcaresult2.Scheme_Name._text)
    console.log("C- Output XML - Amt:", fatcaresult2.Amt._text)
    console.log("C- Output XML - Amt:", fatcaresult2.Paymentlink._text)
		//	console.log("C- Output XML - Line 960", fatcaresult2[6].return_msg._text)
			//console.log("C- Output XML - Line 960", fatcaresult2[7].return_msg._text)
     ashdata1=fatcaresult2.Unique_No._text;
     ashdata2=fatcaresult2.Trxn_No._text;
     ashdata3=fatcaresult2.Application_No._text;
     ashdata4=fatcaresult2.Fund._text;
     ashdata5=fatcaresult2.Scheme._text;
     ashdata6=fatcaresult2.Scheme_Name._text;
     ashdata7=fatcaresult2.Amt._text;
    }
    else 
    { 
    //console.log("C- Output XML - Line 958", fatcaresult2[0].return_msg._text)
	  //console.log("C- Output XML - Line 960", fatcaresult2[1].return_msg._text)
    }


      let agmess='';  
		  
      if(fatcaresult==0){    
        agmess= {
           status:200,
           message:'Successfull',            
           data:  { "Unique_No ": ashdata1,"Trxn_No: ": ashdata2 ,"Application_No: ": ashdata3, "Fund: ": ashdata4,"Scheme: ": ashdata5, "Scheme_Name: ": ashdata6, "Amt: ": ashdata7,"Status_Desc ":"","Status_code ":"","Input_ref_no ":"","Paymentlink ":fatcaresult2.Paymentlink._text.substring(9,fatcaresult2.Paymentlink._text.length-4).InnerHtnl,},  
           message_full: fatcaresult2 ,
         }
       }else{
         agmess= {
           status:400,
           message:'Failed',
          // message_1: fatcaresult2,               
         // data:  { "0": ashdata1},
           //"1": ashdata2 ,"2": ashdata3, "3": ashdata4,"4": ashdata5, "5": ashdata6, "6": ashdata7},              
      //message_third_api:'FAILED',
     message_full:fatcaresult2,
          }
       }
       return res.status(200).json(agmess)
      }).catch(err=>{console.log(err)});
      console.log("res last line 829");



    });
  };
  
  
  ////////////////
