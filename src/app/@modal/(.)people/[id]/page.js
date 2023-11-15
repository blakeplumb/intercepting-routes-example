import Dialog from "@/components/dialog";
import UpdatePersonForm from "@/components/update-person-form";

const UpdatePersonModal = async ({ params: { id } }) => {
  return (
    <Dialog>
      <UpdatePersonForm id={id} />
    </Dialog>
  );
};

export default UpdatePersonModal;
