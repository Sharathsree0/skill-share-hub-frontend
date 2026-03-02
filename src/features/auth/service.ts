import api from "../../shared/services/axios";
import type { CredentialResponse } from "@react-oauth/google";

export const handleOauth = async(credentialResponse:CredentialResponse) =>{
  const credential = credentialResponse.credential;
  const {data} = await api.post("/auth/google",{credential});
  console.log(data)
}