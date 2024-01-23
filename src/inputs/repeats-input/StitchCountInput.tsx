import { useState, useRef, useEffect } from "react";

const StitchCountInput = (props: { startingCount: number }) => {
  const { startingCount } = props;
  const [count, setCount] = useState<number>(startingCount);
  // return (
  //   <input
  //     type="number"
  //     placeholder="# of stitches"
  //     className="input input-bordered h-6 w-full max-w-xs"
  //     value={startingCount}
  //   />
  return (
    <div className="inline-block align-middle box-border border h-full w-18 rounded text-xs ml-6">
      <button
        data-action="decrement"
        className="hover:bg-gray-200 h-full w-6 rounded cursor-pointer border-r"
        onClick={() => setCount(count - 1)}
      >
        <span className="text-center font-thin relative">-</span>
      </button>
      <input
        type="number"
        className="h-full w-12 text-xs text-center"
        value={count}
      ></input>
      <button
        data-action="decrement"
        className="hover:bg-gray-200 h-full w-6 rounded cursor-pointer border-l"
        onClick={() => setCount(count + 1)}
      >
        <span className="text-center font-thin relative">+</span>
      </button>
    </div>
  );
};

export default StitchCountInput;
