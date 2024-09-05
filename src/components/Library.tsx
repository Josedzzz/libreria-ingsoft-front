import { useState } from "react";
import BookCard from "./BookCard";
import BookInfo, { BookInfoProps, Review } from "./BookInfo";

const booksData: (BookInfoProps & { reviews: Review[] })[] = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    rating: 4.5,
    cover: "/path/to/great-gatsby-cover.jpg",
    year: 1925,
    reviews: [
      {
        user: "Alice",
        review: "A classic novel with beautiful prose.",
        rating: 5,
      },
      {
        user: "Bob",
        review: "Fascinating look at the American Dream.",
        rating: 4,
      },
    ],
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780060935467",
    rating: 4.8,
    cover: "/path/to/mockingbird-cover.jpg",
    year: 1960,
    reviews: [
      {
        user: "Charlie",
        review: "An impactful story about justice and morality.",
        rating: 5,
      },
      { user: "David", review: "A powerful and moving read.", rating: 4 },
    ],
  },
  {
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    rating: 4.7,
    cover: "/path/to/1984-cover.jpg",
    year: 1949,
    reviews: [
      {
        user: "Eve",
        review: "A chilling depiction of a dystopian future.",
        rating: 5,
      },
      {
        user: "Frank",
        review: "Orwell's vision of totalitarianism is eerily relevant today.",
        rating: 4,
      },
    ],
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    isbn: "9780060850524",
    rating: 4.6,
    cover: "/path/to/brave-new-world-cover.jpg",
    year: 1932,
    reviews: [
      {
        user: "Grace",
        review: "A thought-provoking novel about a future society.",
        rating: 5,
      },
      {
        user: "Hank",
        review:
          "Huxley’s critique of consumerism and conformity is eye-opening.",
        rating: 4,
      },
    ],
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    isbn: "9781503280786",
    rating: 4.3,
    cover: "/path/to/moby-dick-cover.jpg",
    year: 1851,
    reviews: [
      {
        user: "Ivy",
        review: "A complex and rich narrative about obsession.",
        rating: 4,
      },
      {
        user: "Jack",
        review:
          "Melville’s detailed descriptions are both fascinating and overwhelming.",
        rating: 3,
      },
    ],
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "9780141439518",
    rating: 4.9,
    cover: "/path/to/pride-and-prejudice-cover.jpg",
    year: 1813,
    reviews: [
      {
        user: "Laura",
        review: "A timeless romance with sharp social commentary.",
        rating: 5,
      },
      {
        user: "Michael",
        review: "A delightful read with witty dialogue.",
        rating: 5,
      },
    ],
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "9780316769488",
    rating: 4.4,
    cover: "/path/to/catcher-in-the-rye-cover.jpg",
    year: 1951,
    reviews: [
      {
        user: "Nina",
        review: "A gripping portrayal of teenage angst.",
        rating: 4,
      },
      {
        user: "Oscar",
        review: "Salinger’s writing style is unique and engaging.",
        rating: 5,
      },
    ],
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "9780345339683",
    rating: 4.8,
    cover: "/path/to/the-hobbit-cover.jpg",
    year: 1937,
    reviews: [
      {
        user: "Paul",
        review: "A fantastical adventure that’s perfect for all ages.",
        rating: 5,
      },
      {
        user: "Quinn",
        review: "Tolkien’s world-building is incredible.",
        rating: 4,
      },
    ],
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    isbn: "9781451673319",
    rating: 4.5,
    cover: "/path/to/fahrenheit-451-cover.jpg",
    year: 1953,
    reviews: [
      {
        user: "Rita",
        review: "A powerful critique of censorship and conformity.",
        rating: 5,
      },
      {
        user: "Steve",
        review: "Bradbury’s vision of the future is hauntingly realistic.",
        rating: 4,
      },
    ],
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    isbn: "9780451526342",
    rating: 4.6,
    cover: "/path/to/animal-farm-cover.jpg",
    year: 1945,
    reviews: [
      {
        user: "Tina",
        review: "A brilliant allegory about power and corruption.",
        rating: 5,
      },
      {
        user: "Ursula",
        review: "Orwell’s satire is sharp and thought-provoking.",
        rating: 4,
      },
    ],
  },
  {
    title: "Les Misérables",
    author: "Victor Hugo",
    isbn: "9780451419439",
    rating: 4.7,
    cover: "/path/to/les-miserables-cover.jpg",
    year: 1862,
    reviews: [
      {
        user: "Vera",
        review: "A sweeping epic about redemption and justice.",
        rating: 5,
      },
      {
        user: "William",
        review: "Hugo’s storytelling is both grand and intimate.",
        rating: 4,
      },
    ],
  },
  {
    title: "The Odyssey",
    author: "Homer",
    isbn: "9780143039952",
    rating: 4.6,
    cover: "/path/to/the-odyssey-cover.jpg",
    year: -800,
    reviews: [
      {
        user: "Xena",
        review: "A classic epic that’s still captivating today.",
        rating: 5,
      },
      {
        user: "Yannis",
        review: "The adventure and mythological elements are timeless.",
        rating: 4,
      },
    ],
  },
];

export default function Library() {
  const [searchTerm, setSearchTerm] = useState("");
  const [booksToDisplay, setBooksToDisplay] =
    useState<(BookInfoProps & { reviews: Review[] })[]>(booksData);
  const [selectedBook, setSelectedBook] = useState<BookInfoProps | null>(null);

  const handleSearch = () => {
    const filteredBooks = booksData.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBooksToDisplay(filteredBooks);
  };

  return (
    <div className="flex-1 bg-custom-rose p-8 overflow-y-auto h-screen">
      {selectedBook ? (
        <BookInfo {...selectedBook} onBack={() => setSelectedBook(null)} />
      ) : (
        <>
          <div className="flex items-center mb-6">
            <input
              type="text"
              placeholder="Search for books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-yellow"
            />
            <button
              onClick={handleSearch}
              className="ml-2 p-2 border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark rounded-xl bg-custom-white hover:bg-custom-gray focus:outline-none hover:border-b-2 hover:border-r-2"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {booksToDisplay.length > 0 ? (
              booksToDisplay.map((book) => (
                <div key={book.isbn} onClick={() => setSelectedBook(book)}>
                  <BookCard
                    title={book.title}
                    author={book.author}
                    isbn={book.isbn}
                    rating={book.rating}
                    cover={book.cover}
                    year={book.year}
                  />
                </div>
              ))
            ) : (
              <p>No books found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
