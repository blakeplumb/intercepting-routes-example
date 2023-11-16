"use client";

import { use } from "react";
import { useFormStatus } from "react-dom";

let promiseResolve = (x) => x;
const Loading = () => {
  const { pending } = useFormStatus();
  if (pending) {
    use(new Promise((resolve) => (promiseResolve = resolve)));
  } else {
    promiseResolve();
  }
};

export default Loading;
