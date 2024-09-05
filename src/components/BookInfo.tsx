export type Review = {
  user: string;
  review: string;
  rating: number;
};

export type BookInfoProps = {
  title: string;
  author: string;
  isbn: string;
  rating: number;
  cover: string;
  year: number;
  reviews: Review[];
};

export default function BookInfo({
  title,
  author,
  isbn,
  rating,
  cover,
  year,
  reviews,
  onBack,
}: BookInfoProps & { onBack: () => void }) {
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
          src={cover}
          alt={title}
          className="w-full md:w-48 h-auto object-cover rounded-xl mb-4 md:mb-0"
        />
        <div className="md:ml-6 flex-1">
          <h1 className="text-3xl font-bold text-custom-dark mb-2">{title}</h1>
          <p className="text-custom-dark mb-1">by {author}</p>
          <p className="text-custom-dark mb-1">ISBN: {isbn}</p>
          <p className="text-custom-dark mb-1">Year: {year}</p>
          <p className="text-custom-dark mb-4">Rating: {rating} / 5</p>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-xl font-bold text-custom-dark mb-4">
          User Reviews
        </h2>
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review: Review, index: number) => (
              <div
                key={index}
                className="bg-custom-light p-4 rounded-xl border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark"
              >
                <p className="text-custom-dark font-semibold">{review.user}</p>
                <p className="text-custom-dark mt-1">
                  Rating: {review.rating} / 5
                </p>
                <p className="text-custom-dark mt-1">{review.review}</p>
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
