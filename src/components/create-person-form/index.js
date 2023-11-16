import FormButtons from "./FormButtons";

const CreatePersonForm = () => {
  return (
    <>
      <h2>Add Person</h2>
      <form>
        <p>
          <label htmlFor="name-input">name</label>
          <input id="name-input" name="name" required type="text" />
        </p>
        <FormButtons />
      </form>
    </>
  );
};

export default CreatePersonForm;
