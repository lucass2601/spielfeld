import ScreenContainer from "@/components/layouts/ScreenContainer";
import ParticipantForm from "@/components/molcecules/ParticipantForm";
import useTournamentStore from "@/store/useTournamentStore";

const Wizard_CreateParticipant = () => {
  const newTournament = useTournamentStore((state) => state.newTournament);

  return (
    <ScreenContainer>
      <ParticipantForm type={newTournament.participantType} />
    </ScreenContainer>
  );
};

export default Wizard_CreateParticipant;
