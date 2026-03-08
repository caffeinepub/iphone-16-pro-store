import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Review } from "../backend.d";
import { useActor } from "./useActor";

export function useAggregateRating() {
  const { actor, isFetching } = useActor();
  return useQuery<number>({
    queryKey: ["aggregateRating"],
    queryFn: async () => {
      if (!actor) return 0;
      return actor.getAggregateRating();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitReview() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      rating,
      comment,
    }: {
      name: string;
      rating: number;
      comment: string;
    }) => {
      if (!actor) throw new Error("No actor");
      await actor.submitReview(name, BigInt(rating), comment);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reviews"] });
      qc.invalidateQueries({ queryKey: ["aggregateRating"] });
    },
  });
}

export function useSubmitOffer() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      contact,
      price,
    }: {
      name: string;
      contact: string;
      price: number;
    }) => {
      if (!actor) throw new Error("No actor");
      await actor.submitOffer(name, contact, BigInt(price));
    },
  });
}
