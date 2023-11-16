import { PEOPLE } from "@/utils/tags";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import Loading from "./Loading";

const cancel = async () => {
  "use server";

  redirect("/");
};

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
  redirect("/");
};

const CreatePersonForm = () => {
  return (
    <>
      <h2>Add Person</h2>
      <form>
        <p>
          <label htmlFor="name-input">name</label>
          <input id="name-input" name="name" required type="text" />
        </p>
        <button formAction={createPerson}>Submit</button>
        <button formAction={cancel} formNoValidate>
          Cancel
        </button>
        <Loading />
      </form>
    </>
  );
};

export default CreatePersonForm;
