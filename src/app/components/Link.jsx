import Link from "next/link";
import React from "react";

const Linker = ({ text, link, styles = "", css, disabled }) => {
  if (disabled) {
    return (
      <button
        disabled
        className={`text-white bg-gray-400 border-gray-400 border-2 font-medium py-3 mt-6 w-full text-[18px] text-center capitalize ${styles}`}
      >
        {text}
      </button>
    );
  }

  return (
    <Link
      href={link}
      style={css}
      className={`text-white bg-primary transition-all duration-300 hover:bg-white hover:text-primary border-primary border-2 font-medium py-3 mt-6 w-full text-[18px] text-center capitalize ${styles}`}
    >
      {text}
    </Link>
  );
};

export default Linker;
