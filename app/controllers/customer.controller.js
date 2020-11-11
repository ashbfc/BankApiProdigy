const Customer = require("../models/customer.model.js");


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
  } if(req.body.branch===undefined || req.body.branch==''){
    
    ash_data.branch=" branch: feild is required";
    errflag=1;
   // console.log(" branch: feild is required");

  } if(req.body.ifsc===undefined || req.body.ifsc==''){
    ash_data.ifsc=" ifsc: feild is required";
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

