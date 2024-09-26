import { useMemo, useState } from "react";

interface FibonacciProp {
  length: number;
}

function Fibonacci({ length }: FibonacciProp) {
  const numbers = useMemo(() => {
    console.log("Calculating Fibonacci sequence...");
    const result = [1, 1];
    for (let i = 2; i < length; i++) {
      result[i] = result[i - 1] + result[i - 2];
    }
    return result;
  }, [length]);

  return (
    <p>
      {length} numbers of the Fibonacci sequence: {numbers.join(", ")}
    </p>
  );
}
//   const numbers = (() => {
//     console.log('Calculating Fibonacci sequence...');
//     const result = [1, 1];
//     for (let i = 2; i < length; i++) {
//       result[i] = result[i - 1] + result[i - 2];
//     }
//     return result;
//   })();

//   return <p>{length} numbers of the Fibonacci sequence: {numbers.join(', ')}</p>;
// }


function UseMemoApp() {
  const [length, setLength] = useState(5);

  return (
    <div>
      <input
        type="number"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />
      <Fibonacci length={length} />
    </div>
  );
}

export default UseMemoApp;
