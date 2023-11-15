import { PEOPLE } from "@/utils/tags";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const createPerson = async (formData) => {
  "use server";

  const res = await fetch("http://localhost:3000/api/people", {
    method: "POST",
    body: JSON.stringify({ name: formData.get("name") }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to create person");
  }

  revalidateTag(PEOPLE);
  redirect(".");
};

const CreatePersonForm = () => {
  return (
    <>
      <h2>Add Person</h2>
      <form action={createPerson}>
        <p>
          <label htmlFor="name-input">name</label>
          <input id="name-input" name="name" required type="text" />
        </p>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreatePersonForm;
