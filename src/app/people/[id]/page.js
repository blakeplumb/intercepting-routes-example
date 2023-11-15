import UpdatePersonForm from "@/components/update-person-form";

const UpdatePerson = async ({ params: { id } }) => {
  return <UpdatePersonForm id={id} />;
};

export default UpdatePerson;
