import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import BookInfo, { BookInfoProps } from "./BookInfo";

interface Book {
  id: string;
  isbn: string;
  bookTitle: string;
  bookAuthor: string;
  averageRating: number;
  imageUrl: string;
  yearOfPublication: string;
  reviews: { reviewer: string; comment: string }[];
}

interface FetchBooksResponse {
  content: Book[];
  totalPages: number;
}

export default function Library() {
  const [searchTerm, setSearchTerm] = useState("");
  const [booksToDisplay, setBooksToDisplay] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookInfoProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async (searchTerm: string = "", page: number = 0) => {
    setLoading(true);
    try {
      const url = searchTerm
        ? `http://localhost:8080/books/search?keyword=${encodeURIComponent(
            searchTerm
          )}&page=${page}&size=20`
        : `http://localhost:8080/books?page=${page}&size=20`;
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error fetching books: ${response.status} - ${errorText}`
        );
      }
      const data: FetchBooksResponse = await response.json();
      console.log("Fetched books:", data);

      // Verifica que data.content sea un array
      if (Array.isArray(data.content)) {
        setBooksToDisplay(data.content);
        setTotalPages(data.totalPages || 1);
      } else {
        console.error("Unexpected data format:", data);
        setBooksToDisplay([]);
      }
    } catch (error) {
      console.error("Error fetching books", error);
      setBooksToDisplay([]); // Asegúrate de que sea un array vacío en caso de error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks("", page); // Fetch books when page changes
  }, [page]);

  const handleSearch = () => {
    fetchBooks(searchTerm);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
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

          {loading ? (
            <p>Loading books...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {booksToDisplay.length > 0 ? (
                  booksToDisplay.map((book) => (
                    <div
                      key={book.id}
                      onClick={() =>
                        setSelectedBook({
                          id: book.id,
                          isbn: book.isbn,
                          bookTitle: book.bookTitle,
                          bookAuthor: book.bookAuthor,
                          averageRating: book.averageRating,
                          imageUrl: book.imageUrl,
                          yearOfPublication: book.yearOfPublication,
                          reviews: book.reviews,
                        })
                      }
                    >
                      <BookCard
                        title={book.bookTitle}
                        author={book.bookAuthor}
                        isbn={book.isbn}
                        rating={book.averageRating}
                        cover={book.imageUrl}
                        year={parseInt(book.yearOfPublication, 10)}
                      />
                    </div>
                  ))
                ) : (
                  <p>No books found.</p>
                )}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePreviousPage}
                  disabled={page === 0}
                  className="p-2 border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark rounded-xl bg-custom-white hover:bg-custom-gray focus:outline-none hover:border-b-2 hover:border-r-2"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages - 1}
                  className="p-2 border-t-2 border-l-2 border-b-4 border-r-4 border-custom-dark rounded-xl bg-custom-white hover:bg-custom-gray focus:outline-none hover:border-b-2 hover:border-r-2"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
