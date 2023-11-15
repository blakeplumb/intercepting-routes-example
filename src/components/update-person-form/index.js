import { PEOPLE } from "@/utils/tags";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

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
  redirect("..");
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
  redirect("..");
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
      <form id="update-person-form" action={updatePersonById(id)}>
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
      </form>
      <button form="delete-person-form" type="submit">
        Delete
      </button>
      <button form="update-person-form" type="submit">
        Submit
      </button>
      <form id="delete-person-form" action={deletePersonById(id)}></form>
    </>
  );
};

export default UpdatePersonForm;
