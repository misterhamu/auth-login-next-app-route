
"use client"
import React from "react";
import { useAuth } from "../context/authContext";
import Link from "next/link";


type Props = {};

export default function Navbar({}: Props) {
  const { user, logout } = useAuth();
  if(!!user == false){
    return <></>
  }
  return (
    <>
      <div className="flex flex-row justify-between p-3 bg-red-300">
        <div className="flex gap-6">
        <Link href={"/"}>Test Login</Link>
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>about</Link>
        <Link href={"/login"}>login</Link>
        </div>
        {user && <p>Logged In {user}</p>}
        {!!user && (
          <button
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
}
