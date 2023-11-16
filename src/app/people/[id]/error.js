"use client";

const UpdatePersonError = ({ reset }) => {
  return (
    <div>
      There was an error updating the person.{" "}
      <button type="button" onClick={reset}>
        Try Again
      </button>
    </div>
  );
};

export default UpdatePersonError;
