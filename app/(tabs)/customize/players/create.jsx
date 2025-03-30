import ScreenContainer from "@/components/layouts/ScreenContainer";
import ParticipantForm from "@/components/molcecules/ParticipantForm";

const CreatePlayerScreen = () => {
  return (
    <ScreenContainer>
      <ParticipantForm type="players" />
    </ScreenContainer>
  );
};

export default CreatePlayerScreen;
