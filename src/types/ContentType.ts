import { OfferAux } from "./OfferAux";

export type ContentType = {
  id: number;
  title: string;
  description: string;
  videoUri: string;
  offer: OfferAux;
};
