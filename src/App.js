import jsonData from "./employees.json"
import { useState } from "react"
import Table from "./Components/Table"
import Chart from "./Components/Chart";
import Form from "./Components/Form";

function App() {

  const [employees, setEmployees] = useState(jsonData);
  const [isSubmitted, setIsSubmitted] = useState(true);

  const onSubmit = (data) => {
    setIsSubmitted(prev => !prev);
    // update employees info
    setEmployees(prevArray => {
      const temp = {
        id: employees.length,
        ...data
      }
      return [...prevArray, temp]
    })
  }

  return (
    <section className={"application"}>
      <h1>Corporate Employees</h1>

      {/* show button for adding new employer or form */}
      {isSubmitted ?
        <button onClick={() => { setIsSubmitted(prev => !prev); }}>Add employee</button>
        :
        <Form isSubmitted={isSubmitted} onSubmit={onSubmit}/>
      }

      <Table values={employees} />
      <Chart values={employees} />
    </section>
  );
}

export default App;
