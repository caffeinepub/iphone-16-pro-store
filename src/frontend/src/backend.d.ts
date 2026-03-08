import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Offer {
    contact: string;
    date: Time;
    name: string;
    price: bigint;
}
export interface Review {
    date: Time;
    name: string;
    comment: string;
    rating: bigint;
}
export interface backendInterface {
    getAggregateRating(): Promise<number>;
    getAllOffers(): Promise<Array<Offer>>;
    getAllReviews(): Promise<Array<Review>>;
    submitOffer(name: string, contact: string, price: bigint): Promise<void>;
    submitReview(name: string, rating: bigint, comment: string): Promise<void>;
}
