import { ContentType } from './ContentType';

export type OfferType = {
    id: number;
    name: string;
    imgUri: string;
    description: string;
    edition: string;
    startMoment: string;
    endMoment: string;
    contents: ContentType[];
}