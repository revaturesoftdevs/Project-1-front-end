/* Login as an employee*/
function employeeLogin(){

    // construct a java script object whose properties match the bookpojo object's properties
        // of the back end application
    let newEmp = {
        emp_id: 0,
        emp_username: document.getElementById("userName").value,
        emp_password: document.getElementById("passwordEmp").value,
        emp_firstName: "",
        emp_lastName: "",       
	    mgr_id:""	
	
    }
   
    console.log(newEmp);
    fetch("http://localhost:7474/loginEmp", {
        method: 'post',
        body: JSON.stringify(newEmp) // converts JS object to JSON 
    })
   
    .then(response => response.json())
    .then(responseJson => {
        console.log(responseJson)
        if(responseJson.emp_id!=0){
            window.location.replace("/empbasic.html");
        }
       else{
           alert("login failed");
       }
       //sessionStorage.setItem("user",JSON.stringify(newMngr));
       
    });
    
    
}

/*Manager login */

function mngrLogin(){

    // construct a java script object whose properties match the bookpojo object's properties
        // of the back end application
    let newMngr = {
        mgr_id: 0,
        mgr_username: document.getElementById("userName1").value,
        mgr_password: document.getElementById("password1").value,
        mgr_firstName: "",
        mgr_lastName: ""        
    }   
    //sessionStorage.setItem("user",JSON.stringify(newMngr));
   // console.log(newMngr);
    fetch("http://localhost:7474/LoginManager", {
        method: 'post',
        body: JSON.stringify(newMngr) // converts JS object to JSON 
    })
   
    .then(response => response.json())
    .then(responseJson => {
        //console.log(responseJson)
        if(responseJson.mgr_id!=0){
            console.log(responseJson);
            window.location.replace("/managerbasic.html");
        }
       else{
           alert("login failed");
       }
       //sessionStorage.setItem("user",JSON.stringify(newMngr));
       
    });
    
    
}
        
       // let retriveInfo=JSON.parse(sessionStorage.getItem("user"));
        //console.log(retriveInfo);

// function mngrLogin(){
//     console.log(mngrId);
//     fetch("http://localhost:7474/LoginManager/"+mngrId,)
//     .then(response=>{
//         console.log(response);
//         if(mngrId!=0){
//             window.location.replace("/managerbasic.html");
//         }
//        else{
//            alert("login failed");
//        }
//     })

// }
/********************************************************************* */
/*pending reimbursements */
function pendingreim(mngrId){
    //console.log(mngrId);
    fetch("http://localhost:7474/PendingReimbursements/"+mngrId,)
    //fetch("http://localhost:7474/PendingReimbursements/mngrId")
    .then(response=>response.json()
    ).then(responseJason=>{
        //console.log(responsejason);
    let pendingreq=`<table class="table-stripped">
                    <thead>
                        <tr>
                            <th>Reimbursement Id</th>
                            <th>Employee Id</th>
                            <th>Manager Id</th>
                            <th> Reimbursement Description</th>
                            <thReimbursement Amount</th>
                            <th>Reimbursement Status</th>
                        </tr>
                    </thead>
                    <tbody>`;
                    for(let req of responseJason){
                        pendingreq +=`<tr>
                                        <td>${req.rId}</td>
                                        <td>${req.eId}</td>
                                        <td>${req.mId}</td>
                                        <td>${req.reimDesc}</td>
                                        <td>${req.reimAmount}</td>
                                        <td>${req.reimStatus}</td>
                                    </tr>`;
                    }
                    pendingreq +=`</tbody></table>`;
                    document.getElementById("profileInfo").innerHTML=pendingreq;
    })

    
}



/******************************************************************** */
/* Resolved ones */

function resolvedReim(mngrId){
    //console.log(mngrId);
    fetch("http://localhost:7474/ResolvedReimbursements/"+mngrId,)
    //fetch("http://localhost:7474/PendingReimbursements/mngrId")
    .then(response=>response.json()
    ).then(responseJason=>{
        //console.log(responsejason);
    let resolvedReq=`<table class="table-stripped">
                    <thead>
                        <tr>
                            <th>Reimbursement Id</th>
                            <th>Employee Id</th>
                            <th>Manager Id</th>
                            <th> Reimbursement Description</th>
                            <thReimbursement Amount</th>
                            <th>Reimbursement Status</th>
                        </tr>
                    </thead>
                    <tbody>`;
                    for(let req of responseJason){
                       resolvedReq +=`<tr>
                                        <td>${req.rId}</td>
                                        <td>${req.eId}</td>
                                        <td>${req.mId}</td>
                                        <td>${req.reimDesc}</td>
                                        <td>${req.reimAmount}</td>
                                        <td>${req.reimStatus}</td>
                                    </tr>`;
                    }
                    resolvedReq  +=`</tbody></table>`;
                    document.getElementById("profileInfo").innerHTML=resolvedReq ;
    })

    
}


/******************************************************************* */
/* Fetch All employees */
function getAllEmployees(){
    
   // console.log("data printed on the console....");                            
    fetch("http://localhost:7474/AllEmployees/{mid}")
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
            let empTableData = `<table class="table table-striped">
                            <thead>
                            <tr>
                            <th>Employee Id</th>
                            <th>Manager Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>UserName</th>
                            </tr>
                            </thead>
                            <tbody>`;
            for(let emp of responseJson){
                empTableData += `<tr>
                            <td>${emp.EmpId}</td>
                            <td>${emp.MngrId}</td>
                            <td>${emp.EmpFirstName}</td>
                            <td>${emp.EmpLastName}</td>
                            <td>${emp.EmpUserName}</td>
                                  </tr>`;
            }
            empTableData += `</tbody></table>`;
            document.getElementById("profileInfo").innerHTML = empTableData;
        })
        .catch(error => console.log(error));
}



/****************************************************************** */
/*****Manager Profile *******/
function mngrProfile(){

}
/***************************************************************** */
/*************Manager Profile update******************** */

function managerupdate(){}
/**************************************************************** */
/* Fetch an employee details */
function empprofile(empId){

    fetch("http://localhost:7474/profile/"+empId)
    .then(response=>response.json())
    .then(responseJason=>{
        console.log(responseJason);
        let profileform=`<table class="table-stripped">
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Manager Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>UserName</th>
                    <th>Password</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>`;
            for(let emp of responseJason){
                profileform +=`<tr>
                            <td>${emp.EmpId}</td>
                            <td>${emp.MngrId}</td>
                            <td>${emp.EmpFirstName}</td>
                            <td>${emp.EmpLastName}</td>
                            <td>${emp.EmpUserName}</td>
                            <td>${emp.EmpPassword}</td>
                            <td><button 
                            type="button" 
                            class="btn btn-danger"
                            onclick="updateProfile(${emp.EmpUserName}, ${emp.EmpPassword})">Update Profile</button></td>

                </tr>`;
            }
            profileform +=`</tbody></table>`;
            document.getElementById("profileInfo")=profileform;
    })
    .catch(error=>console.error(error));
   
    
}
/* update Profile */
function updateProfileForm(){
    let updateForm= `<div class="container">
    <form>
        <div class="mb-3 mt-3">
            <label for="eUserName" class="form-label">User Name</label>
            <input type="text" class="form-control" id="eUserName" placeholder="Enter user name" name="EmpUserName">
        </div>
        <div class="mb-3 mt-3">
            <label for="ePassword" class="form-label">Existing Password:</label>
            <input type="text" class="form-control" id="ePassword" placeholder="Enter existing password" name="EmpPassword">
        </div>
        <div class="mb-3 mt-3">
            <label for="newPassword" class="form-label">New Password:</label>
            <input type="text" class="form-control" id="newPassword" placeholder="Enter new password" name="empNewPassword">
        </div>
        
        <button type="button" class="btn btn-primary" onclick="updateProfile()">Update  </button>
    </form>
</div>
`;
document.getElementById("profileInfo").innerHTML= updateForm;
}



function updateProfile(){
    let updateInfo= {
        EmpUserName: document.getElementById("eUserName").value,
        EmpPassword: document.getElementById("ePassword").value,
        empNewPassword: document.getElementById("newPassword").value,
        
    }
    fetch("http://localhost:7474/updateemp",{
        method:'put',// update profile
        body: JSON.stringify(updateInfo)
    })
    .then(response=>empprofile(empId));
}



