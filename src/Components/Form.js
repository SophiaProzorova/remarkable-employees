import { useForm } from "react-hook-form";

export default function Form(props) {
    const { isSubmitted, onSubmit } = props;
    const { register, formState: { errors }, reset, handleSubmit } = useForm();

    return <form
        aria-label='form'
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
            <select defaultValue='' {...register("gender", { required: true, validate: value => value != '' })}>
                <option disabled value=''>Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
            </select>
        </label>

        <input type="submit" id="submitForm" />
    </form>;
}