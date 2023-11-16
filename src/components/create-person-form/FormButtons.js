"use client";

import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { createPerson } from "./actions";

const CreatePersonFormButtons = () => {
  const router = useRouter();
  const { pending } = useFormStatus();

  return (
    <>
      <button formAction={createPerson} type="submit" disabled={pending}>
        {pending ? "Submitting" : "Submit"}
      </button>
      <button onClick={router.back} type="button" disabled={pending}>
        Cancel
      </button>
    </>
  );
};

export default CreatePersonFormButtons;
