"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";


type Props = {};

export default function LoginPage({}: Props) {
  const {login, user} = useAuth();
  const router = useRouter();
  if(!!user){
    router.replace("/");
  }
  return (
    <div>
      <h2>Login Page</h2>
      <div>
        <button
          className="bg-red-400 p-3"
          onClick={()=>{login()}}
        >
          Login
        </button>
      </div>
    </div>
  );
}
