import React, { useEffect, useState } from 'react'
import {Table} from 'react-bootstrap';
import '../App.css';



export default function StudentList() {
  const[studentName,setstudentName]=useState("");
  const[dob,setdob]=useState("");
  const[studentNameErr,setstudentNameErr]=useState(false)
  const[dobErr,setdobErr]=useState(false)

function submit(e){
  if((studentName.length<3 || studentName=="")||(dob.length<3||dob=="")){
      alert("Please correct the values!")
  }else{
      alert("All good!! Thank You for submitted");
  }
      e.preventDefault();
  }
  
  function studentNameHandler(e){
      let item=e.target.value;
      if(item.length<3){
          setstudentNameErr(true)
      }
      else{
          setstudentNameErr(false)

      }
      setstudentName(item)


      // console.log (e.target.value)
  }
  function dobHandler(e){
      let item=e.target.value;
      if(item.length<3){
          setdobErr(true)
      }
      else{
          setdobErr(false)

      }
      setdob(item)
   

  }
  //validation
    const [data, setData] = useState([]);
    const[records,setRecords]=useState([]);

    useEffect(() => {
      getData();
    }, [])

    function getData(){
        fetch('http://localhost:3030/students').then((result) => {
        result.json().then((resp) => {
          // console.log("result",resp)
          setData(resp)
          setRecords(resp)
  
        })
      })
    }
    
    
    function DeletestudentName(studentId){
        fetch(`http://localhost:3030/students${studentId}`,{
            method:"DELETE",

        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp);
                getData();
            })

        })
    }
    
  
  
     
    const Filter=(e)=>{
      setRecords(data.filter(f=>f.studentName.toLowerCase().includes(e.target.value)))

    }
  return (

    <div>
      <h1 className='head'>Student Directories</h1>
          <form onSubmit={submit}>
            <input type="text" placeholder='Student Name' onChange={studentNameHandler} />
           
            {studentNameErr?<span></span>:""}
           
            <input type="text" placeholder='DOB' onChange={dobHandler}/>
            
            
            <input type='text' placeholder='Gender'/>
            <input type='text' placeholder='Father Name'/>
            <input type='text' placeholder='Mother Name'/>
            <input type='text' placeholder='Email Id'/>
            <input type='text' placeholder='Phone Number'/>
            <input type='text' placeholder='Address'/>
          
            {/* <button type='submit'>Submit</button> */}
        </form>
    
      
      <div className='btn'> <button type="button" class="btn btn-success mt-4" >+Add Student</button></div>
      <nav class="navbar bg-body-tertiary">
       <div class="container-fluid">
       <form class="d-flex" role="search">
      <input class="form-control me-2 text-center " type="search" placeholder="Search" aria-label="Search" onChange={Filter}/>
    
   

    </form>
  </div>

</nav>

    
      <Table striped border={2}>
        <tbody>
          <tr>
            <td>Id</td>
            <td>Student Name</td>
            <td>DOB</td>
            <td>Gender</td>
            <td>Father Name</td>
            <td>Mother Name</td>
            <td>Email Id</td>
            <td>Phone Number</td>
            <td>Address</td>
            <td>Actions</td>

          
          </tr>
          {
            records.map((item, i) => {
              return (
                <tr key={i}>
                  
                <td>{item.studentId} </td>
                <td>{item.studentName}</td>
                <td>{item.dateOfBirth}</td>
                <td>{item.gender}</td>
                <td>{item.fatherName}</td>
                <td>{item.motherName}</td>
                <td>{item.emailId}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.address}</td>
                <td><button onClick={()=>DeletestudentName(item.studentId)} type="button"  class="btn btn-danger">Delete</button></td>

               
              </tr>
              );
             

            })

          }
        </tbody>
      </Table>
      


    </div>
  )
}