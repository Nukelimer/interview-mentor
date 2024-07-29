import React from "react";
import { MdError } from "react-icons/md";

const ToastIM = ({ text }) => {
  return (
    <div className="fixed flex gap-3 top-0 w-full bg-red-500 text-white text-sm p-4 rounded shadow-lg">
      <MdError color="white" size={40} /> {text}
    </div>
  );
};

export default ToastIM;
