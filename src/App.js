import jsonData from "./employees.json"
import Table from "./Components/Table"
import { useState } from "react"
import Chart from "./Components/Chart";

function App() {

  const [employees, setEmployees] = useState(jsonData);
  const [newEmployer, setNewEmployer] = useState ({});
  const [isSubmitted, setIsSubmitted] = useState(true);


  const handleChange = (e) => {
    const title = e.target.name;
    const value = e.target.value;
    setNewEmployer (prev => ({...prev, [title]: value}));
  }

  const handleSubmit = (e) => {

    // update employees info
    setEmployees (prevArray => {
      const temp = {
        id: employees.length,
        ...newEmployer  
      }
      return [...prevArray, temp] 
    })

    // delete temporary employer  
    setNewEmployer({})

    //set isSubmitted for hidding the form 
    setIsSubmitted (prev => !prev)

    e.preventDefault();
  }

 
  
  return (
    <section className={"application"}>
      <h1>Corporate Employees</h1>


      {/* show button for adding new employer or form */}
      {isSubmitted ? 
        <button onClick={()=>{ setIsSubmitted(prev => !prev); }}>Add employee</button> : null}


        <form className={`newEmployer ${isSubmitted ? 'hidden': ''}`}>
              <label>
                Name
                <input type="text" name="name" onChange = {handleChange} />
              </label>
              
              <label>
                Job title
                <input type="text" name="jobTitle" onChange = {handleChange} />
              </label>

              <label>
                Tenure
                <input type="number" name="tenure" onChange = {handleChange} />
              </label>

              <label>
                Gender
                <select name="gender" onChange = {handleChange}>
                  <option>Gender</option>
                  <option value="Male">Male</option>  
                  <option value="Female">Female</option>
                </select>
              </label>

              <input type="submit" value="submit" onClick = {handleSubmit} />
        </form>

      <Table values = {employees} />
      <Chart values = {employees} />
    </section>
  );
}

export default App;
