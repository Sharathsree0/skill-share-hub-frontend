import {z} from 'zod'

export const regSchema = z.object({
  name:z.string().min(4,"Name is too short!").trim(),
  email : z.string().min(1,"Email Required!").email("Enter a valid email."),
  password : z
  .string()
  .regex(/[A-Z]/,"1 UpperCase Needed")
  .regex(/[a-z]/,"1 LowerCase Needed")
  .regex(/[1-9]/,"1 Number Needed")
  .min(8,"8 characters Needed"),
  confirmPassword : z.string().min(8,"Confirm your password.")
}).
refine((data)=>data.confirmPassword === data.password,{
  message : "Passwords do not match",
  path : ["confirmPassword"]
});

export const logSchema = z.object({
  email:z
  .string()
  .min(1,"Email is required.")
  .email("Enter a valid email."),
  password : z
  .string()
  .regex(/[A-Z]/,"1 UpperCase Needed")
  .regex(/[a-z]/,"1 LowerCase Needed")
  .regex(/[1-9]/,"1 Number Needed")
  .min(8,"8 characters Needed")
});

export type LogFormData = z.infer<typeof logSchema>
export type RegFormData = z.infer<typeof regSchema>