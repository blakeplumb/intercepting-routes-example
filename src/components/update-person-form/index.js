import { PEOPLE } from "@/utils/tags";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const cancel = async () => {
  "use server";
  redirect("/");
};

const updatePersonById = (id) => async (formData) => {
  "use server";

  const res = await fetch(`http://localhost:3000/api/people/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name: formData.get("name") }),
  });

  if (!res.ok) {
    throw new Error("Failed to patch person");
  }

  revalidateTag(PEOPLE);
  redirect("/");
};

const deletePersonById = (id) => async () => {
  "use server";

  const res = await fetch(`http://localhost:3000/api/people/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete person");
  }

  revalidateTag(PEOPLE);
  redirect("/");
};

const getPersonById = async (id) => {
  const res = await fetch(`http://localhost:3000/api/people/${id}`, {
    next: { tags: [PEOPLE] },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch person");
  }

  return res.json();
};

const UpdatePersonForm = async ({ id }) => {
  const {
    data: { name },
  } = await getPersonById(id);

  return (
    <>
      <h2>Update Person</h2>
      <form>
        <p>
          <label htmlFor="name-input">name</label>
          <input
            id="name-input"
            defaultValue={name}
            name="name"
            required
            type="text"
          />
        </p>
        <button formAction={updatePersonById(id)}>Submit</button>
        <button formAction={deletePersonById(id)}>Delete</button>
        <button formAction={cancel}>Cancel</button>
      </form>
    </>
  );
};

export default UpdatePersonForm;
