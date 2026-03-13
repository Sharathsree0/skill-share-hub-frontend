import { useAppSelector } from "../../shared/hooks/redux";
import Navbar from "../navbar/Navbar";
import {WalletBalance, WalletTransaction} from './components/index'

export default function Wallet (){
  const {user} = useAppSelector(state => state.user)
  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 min-h-screen">
     <Navbar />
     <main className="my-20 mx-15">
       <div>
        <div>{user?.name}'s Wallet</div>
        <div>View Course</div>
       </div>
       <div className="flex items-start justify-center gap-10">
         <WalletBalance />
         <WalletTransaction />
       </div>
     </main>
    </div>
  )
}