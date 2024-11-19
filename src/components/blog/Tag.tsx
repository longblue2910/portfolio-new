import React from "react";

interface TagProps {
  tag: string;
}

const Tag = ({ tag }: TagProps) => {
  return (
    <div className="inline-block px-3 py-1 border-[0.5px] cursor-pointer border-gray-300 text-gray-700 font-semibold text-xs hover:bg-slate-100 transition-all ease-linear">
      {tag}
    </div>
  );
};

export default Tag;
