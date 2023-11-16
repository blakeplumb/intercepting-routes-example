"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { updatePersonById, deletePersonById } from "./actions";

const UpdatePersonFormButtons = ({ personId }) => {
  const [current, setCurrent] = useState("submit");
  const router = useRouter();
  const { pending } = useFormStatus();
  const updateWithId = updatePersonById.bind(null, personId);
  const deleteWithId = deletePersonById.bind(null, personId);

  return (
    <>
      <button
        formAction={updateWithId}
        type="submit"
        onClick={() => setCurrent("submit")}
        disabled={pending}
      >
        {pending && current === "submit" ? "Submitting" : "Submit"}
      </button>
      <button
        formAction={deleteWithId}
        type="submit"
        onClick={() => setCurrent("delete")}
        disabled={pending}
      >
        {pending && current === "delete" ? "Deleting" : "Delete"}
      </button>
      <button onClick={router.back} type="button" disabled={pending}>
        Cancel
      </button>
    </>
  );
};

export default UpdatePersonFormButtons;
