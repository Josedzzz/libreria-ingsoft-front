type BookCardProps = {
  title: string;
  author: string;
  isbn: string;
  rating: number;
  cover: string;
  year: number; // Añadido el año de publicación
};

export default function BookCard({
  title,
  author,
  isbn,
  rating,
  cover,
  year, // Añadido el año de publicación
}: BookCardProps) {
  return (
    <div className="bg-custom-white p-4 rounded-xl border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark flex flex-col items-start hover:border-b-2 hover:border-r-2 animate-fadeIn">
      <img
        src={cover}
        alt={title}
        className="w-full h-48 object-cover mb-4 rounded-xl"
      />
      <div className="w-full">
        <h2 className="text-xl font-bold text-custom-dark mb-2">{title}</h2>
        <p className="text-custom-dark mb-1">by {author}</p>
        <p className="text-custom-dark mb-1">ISBN: {isbn}</p>
        <p className="text-custom-dark mb-1">Year: {year}</p>{" "}
        <p className="text-custom-dark">Rating: {rating} / 5</p>
      </div>
    </div>
  );
}
