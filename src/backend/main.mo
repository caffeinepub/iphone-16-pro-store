import List "mo:core/List";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";

actor {
  type Review = {
    name : Text;
    rating : Nat;
    comment : Text;
    date : Time.Time;
  };

  type Offer = {
    name : Text;
    contact : Text;
    price : Nat;
    date : Time.Time;
  };

  let reviews = List.empty<Review>();
  let offers = List.empty<Offer>();

  public shared ({ caller }) func submitReview(name : Text, rating : Nat, comment : Text) : async () {
    if (rating < 1 or rating > 5) {
      return ();
    };
    let review = {
      name;
      rating;
      comment;
      date = Time.now();
    };
    reviews.add(review);
  };

  public shared ({ caller }) func submitOffer(name : Text, contact : Text, price : Nat) : async () {
    let offer = {
      name;
      contact;
      price;
      date = Time.now();
    };
    offers.add(offer);
  };

  public query ({ caller }) func getAllReviews() : async [Review] {
    reviews.toArray();
  };

  public query ({ caller }) func getAllOffers() : async [Offer] {
    offers.toArray();
  };

  public query ({ caller }) func getAggregateRating() : async Float {
    let total = reviews.toArray().foldLeft(
      0,
      func(acc, review) {
        acc + review.rating;
      },
    );
    if (reviews.size() == 0) {
      return 0.0;
    };
    total.toFloat() / reviews.size().toFloat();
  };
};
