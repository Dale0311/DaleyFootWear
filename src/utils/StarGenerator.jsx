import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function StarGenerator({ num }) {
  let stars = [];
  for (let index = 1; index <= 5; index++) {
    if (index <= num) {
      stars.push(<AiFillStar key={index} />);
    } else {
      stars.push(<AiOutlineStar key={index} />);
    }
  }
  return (
    <div className="flex items-center space-x-2">
      <div className="flex text-[#FFBC1C]">{stars}</div>
      <span>&Up</span>
    </div>
  );
}

export default StarGenerator;
