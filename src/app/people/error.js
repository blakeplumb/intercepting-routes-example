"use client";

const CreatePersonError = ({ reset }) => {
  return (
    <div>
      There was an error creating the person.{" "}
      <button type="button" onClick={reset}>
        Try Again
      </button>
    </div>
  );
};

export default CreatePersonError;
