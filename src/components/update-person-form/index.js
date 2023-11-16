import { PEOPLE } from "@/utils/tags";
import FormButtons from "./FormButtons";

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
        <FormButtons personId={id} />
      </form>
    </>
  );
};

export default UpdatePersonForm;
