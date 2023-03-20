import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Form.css";

export default function Form() {
  const schema = yup.object().shape({
    fullName: yup.string().required("Your Full Name is Required!"), // this will enformce that string is fullname & required
    email: yup
      .string()
      .email("Please enter a valid email!")
      .required("Your email is req!"),
    age: yup.number().positive().integer().min(18).required(), // age is number - can be float (integer), should be positive, we are taking people above 18 years of age - 18+
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], null, "Passwords dont match!") // should be equal to passoword
      .required(),
  });

  // to determine that our form should use the schema we defined in yup - we use @hookform/resolvers

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // handle submit will take a function as an input which will execute after all the functionalities that
  // handle submit has to take care of

  // register fucn will tell react-hook-form which of the inputs will be part of the va;idation
  // once you use register we can see our inputs in the "data" attribute
  // what you pass inside the register is the keys to recognise the inputs

  // yup will handle all form validations
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Full Name"
        {...register("fullName")}
      ></input>
      <p>{errors.fullName?.message}</p>
      <input type="text" placeholder="Email" {...register("email")}></input>
      <p>{errors.email?.message}</p>
      <input type="number" placeholder="age" {...register("age")}></input>
      <p>{errors.age?.message}</p>
      <input
        type="password"
        placeholder="password"
        {...register("password")}
      ></input>
      <p>{errors.password?.message}</p>
      <input
        type="password"
        placeholder="confirm password"
        {...register("confirmPassword")}
      ></input>
      <p>{errors.confirmPassword?.message}</p>
      <input type="submit" />
    </form>
  );
}
