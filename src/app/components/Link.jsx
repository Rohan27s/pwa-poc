import Link from "next/link";
import React from "react";

const Linker = ({ text, link, styles = "", css, disabled }) => {
  if (disabled) {
    return (
      <button
        disabled
        className={`bg-gray-400 text-white border-gray-400 border-2 font-medium py-3 mt-6 w-full text-[18px] text-center ${styles}`}
      >
        {text}
      </button>
    );
  }

  return (
    <Link
      href={link}
      style={css}
      className={`bg-primary transition-all duration-300 hover:bg-white text-white hover:text-primary border-primary border-2 font-medium py-3 mt-6 w-full text-[18px] text-center ${styles}`}
    >
      {text}
    </Link>
  );
};

export default Linker;
