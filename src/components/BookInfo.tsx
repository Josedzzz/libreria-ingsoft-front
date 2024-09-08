import { useState, useEffect } from "react";

export type Review = {
  reviewer: string;
  comment: string;
};

export type BookInfoProps = {
  id: string;
  isbn: string;
  bookTitle: string;
  bookAuthor: string;
  averageRating: number;
  imageUrl: string;
  yearOfPublication: string;
  reviews: { reviewer: string; comment: string }[];
};

export default function BookInfo({
  id,
  bookTitle,
  bookAuthor,
  isbn,
  averageRating,
  imageUrl,
  yearOfPublication,
  reviews: initialReviews,
  onBack,
}: BookInfoProps & { onBack: () => void }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [newReview, setNewReview] = useState({
    user: "",
    review: "",
    rating: 0,
  });

  // State to handle the visibility of buttons
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check if userId exists in localStorage and update the state accordingly
    const userId = localStorage.getItem("userId");
    setIsUserLoggedIn(!!userId);
  }, []);

  const handleAddReview = () => {
    setShowReviewForm(true);
    setShowRatingForm(false); // Hide rating form if visible
  };

  const handleAddRating = () => {
    setShowRatingForm(true);
    setShowReviewForm(false); // Hide review form if visible
  };

  const handleReviewSubmit = async () => {
    if (!isUserLoggedIn) {
      alert("You need to be logged in to add a review.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      const reviewData = {
        reviewer: userId || "anonymous",
        comment: newReview.review,
      };

      const response = await fetch(`http://localhost:8080/books/${id}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        alert("Review submitted successfully!");
        window.location.reload(); // Reload the page to reflect changes
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review.");
    }
  };

  const handleRatingSubmit = async () => {
    if (!isUserLoggedIn) {
      alert("You need to be logged in to add a rating.");
      return;
    }

    if (newReview.rating < 1 || newReview.rating > 5) {
      alert("Rating must be between 1 and 5.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");

      const ratingData = {
        userId: userId || "anonymous",
        rating: newReview.rating,
      };

      const response = await fetch(`http://localhost:8080/books/${id}/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingData),
      });

      if (response.ok) {
        alert("Rating submitted successfully!");
        window.location.reload(); // Reload the page to reflect changes
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error("Failed to submit rating:", error);
      alert("Failed to submit rating.");
    }
  };

  return (
    <div className="bg-custom-white p-6 rounded-xl border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark flex flex-col items-start max-w-screen-lg mx-auto animate-fadeIn">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark rounded-xl bg-custom-yellow text-custom-dark hover:border-b-2 hover:border-r-2"
      >
        &larr; Back to Library
      </button>

      <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
        <img
          src={imageUrl}
          alt={bookTitle}
          className="w-full md:w-48 h-auto object-cover rounded-xl mb-4 md:mb-0"
        />
        <div className="md:ml-6 flex-1">
          <h1 className="text-3xl font-bold text-custom-dark mb-2">
            {bookTitle}
          </h1>
          <p className="text-custom-dark mb-1">by {bookAuthor}</p>
          <p className="text-custom-dark mb-1">ISBN: {isbn}</p>
          <p className="text-custom-dark mb-1">Year: {yearOfPublication}</p>
          <p className="text-custom-dark mb-4">Rating: {averageRating} / 5</p>
        </div>
      </div>

      {/* Conditionally render Add Review and Add Rating buttons */}
      {isUserLoggedIn && (
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleAddReview}
            className="px-4 py-2 border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark rounded-xl bg-custom-blue text-custom-white hover:border-b-2 hover:border-r-2"
          >
            Add Review
          </button>

          <button
            onClick={handleAddRating}
            className="px-4 py-2 border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark rounded-xl bg-custom-blue text-custom-white hover:border-b-2 hover-border-r-2"
          >
            Add Rating
          </button>
        </div>
      )}

      {showReviewForm && (
        <div className="mt-4 p-4 border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark rounded-xl bg-custom-light">
          <h3 className="text-lg font-bold text-custom-dark mb-4">
            Write your review
          </h3>
          <textarea
            placeholder="Your review"
            value={newReview.review}
            onChange={(e) =>
              setNewReview({ ...newReview, review: e.target.value })
            }
            className="mb-4 p-2 border rounded w-full"
          ></textarea>
          <button
            onClick={handleReviewSubmit}
            className="px-4 py-2 border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark rounded-xl bg-custom-blue text-custom-white hover:border-b-2 hover-border-r-2"
          >
            Submit Review
          </button>
        </div>
      )}

      {showRatingForm && (
        <div className="mt-4 p-4 border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark rounded-xl bg-custom-light">
          <h3 className="text-lg font-bold text-custom-dark mb-4">
            Rate this book
          </h3>
          <input
            type="number"
            placeholder="Rating (1-5)"
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: +e.target.value })
            }
            className="mb-4 p-2 border rounded w-full"
            max={5}
            min={1}
          />
          <button
            onClick={handleRatingSubmit}
            className="px-4 py-2 border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark rounded-xl bg-custom-blue text-custom-white hover:border-b-2 hover-border-r-2"
          >
            Submit Rating
          </button>
        </div>
      )}

      {/* Reviews now rendered after the buttons */}
      <div className="w-full mt-6">
        <h2 className="text-xl font-bold text-custom-dark mb-4">
          User Reviews
        </h2>
        <div className="space-y-4">
          {initialReviews.length > 0 ? (
            initialReviews.map((review, index) => (
              <div
                key={index}
                className="bg-custom-light p-4 rounded-xl border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark"
              >
                <p className="text-custom-dark font-semibold">
                  {review.reviewer}
                </p>
                <p className="text-custom-dark mt-1">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-custom-dark">No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
