import { useState } from "react";
import type { LogFormData } from "../validations";
import OtpInput from "./OtpInput";

export default function Forgot(
  {form , sendOtp}:
  {form:LogFormData,sendOtp:()=>void}
){
  const [time,setTime] = useState(30);
  const [otp,setOtp] = useState<string[]>(new Array(6).fill(""));

  return(
    <div>
      <h1>Reset Password</h1>
      <p>Enter the code send to {form.email} to reset your password</p>
      <OtpInput otp={otp} setOtp={setOtp} />
    </div>
  )
}