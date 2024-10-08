# translense-task

install the packages by using this command: npm install
run the application by using this command: npm start
open your postman and use this url http://localhost:8080/ and end-point
 
 endpoints are 
 http://localhost:8080/api/users/submit-business ==> post method
 {
  "businessName": "",
  "email": " ",
  "mobileNumber": "",
  "address": ""
}

 http://localhost:8080/api/users/submit-owner ==> payload: 
{
  "fullName": "",
  "email": " ",
  "mobileNumber": "",
  "address": ""
}

 http://localhost:8080/api/users/send-otp ==> payload: 
{
  "email": "",
  "userType": ""
}