import jsonData from "./employees.json"
import { useState } from "react"
import { useForm } from "react-hook-form";
import Table from "./Components/Table"
import Chart from "./Components/Chart";

function App() {

  const [employees, setEmployees] = useState(jsonData);
  const { register, formState: { errors }, reset, handleSubmit } = useForm();
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

    // reset form  
    reset();
  }



  const localForm = <form
    className={`newEmployer ${isSubmitted ? 'hidden' : ''}`}
    onSubmit={handleSubmit(onSubmit)}
  >
    <label className={errors.name?.type == "required" ? "warning" : ''}>
      <span>This is required</span>
      <input placeholder="Name"
        {...register("name", { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i })} />
    </label>

    <label className={errors.jobTitle?.type == "required" ? "warning" : ''}>
      <span>This is required</span>
      <input placeholder="Job title"
        {...register("jobTitle", { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i })} />
    </label>

    <label className={errors.tenure?.type == "required" ? "warning" : ''}>
      <span>This is required and value should be from 0 to 99</span>
      <input
        placeholder="Tenure"
        type="number"
        {...register("tenure", { required: true, min: 1, max: 99 })} />
    </label>

    <label className={errors.tenure?.type == "required" ? "warning" : ''}>
      <span>This is required </span>
      <select {...register("gender", { required: true, validate: value => value != '' })}>
        <option selected disabled value=''>Gender</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
      </select>
    </label>

    <input type="submit" />
  </form>;


  return (
    <section className={"application"}>
      <h1>Corporate Employees</h1>


      {/* show button for adding new employer or form */}
      {isSubmitted ?
        <button onClick={() => { setIsSubmitted(prev => !prev); }}>Add employee</button>
        :
        localForm
      }

      <Table values={employees} />
      <Chart values={employees} />
    </section>
  );
}

export default App;
