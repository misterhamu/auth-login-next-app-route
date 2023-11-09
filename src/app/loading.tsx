import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <>
      <div className="absolute z-10 bg-red-400 w-[100vw] h-[100vh]">
        <div className="flex h-screen">
          <div className="m-auto">
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    </>
  );
}
