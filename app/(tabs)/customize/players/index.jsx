import ScreenContainer from "@/components/layouts/ScreenContainer";
import ParticipantWrapper from "@/components/molcecules/ParticipantWrapper";

export const PlayersScreen = () => {
  return (
    <ScreenContainer>
      <ParticipantWrapper participantType="players" />
    </ScreenContainer>
  );
};

export default PlayersScreen;
