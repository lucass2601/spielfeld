import ScreenContainer from "@/components/layouts/ScreenContainer";
import ParticipantWrapper from "@/components/molcecules/ParticipantWrapper";

export const PlayersScreen = () => {
  return (
    <ScreenContainer>
      <ParticipantWrapper participantType="individual" />
    </ScreenContainer>
  );
};

export default PlayersScreen;
