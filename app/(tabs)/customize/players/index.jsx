import ScreenContainer from "@/components/layouts/ScreenContainer";
import AppBar from "@/components/molcecules/AppBar";
import ParticipantForm from "@/components/molcecules/ParticipantWrapper";

import { useState } from "react";

export const PlayersScreen = () => {
  return (
    <ScreenContainer>
      <ParticipantForm participantType="individual" />
    </ScreenContainer>
  );
};

export default PlayersScreen;
