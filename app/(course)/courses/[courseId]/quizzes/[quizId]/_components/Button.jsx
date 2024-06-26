import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      className="bg-[#9F50AC] select-none font-bold h-[45px] min-w-[120px] rounded-[10px] text-white"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
