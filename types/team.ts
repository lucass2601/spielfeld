import { Player } from "@/types/player";

export type Team = {
  id: string;
  name: string;
  imageUri: string | null;
  roster: Player[];
};
