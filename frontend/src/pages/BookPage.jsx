import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  return (
    <div className="book-preview">
      {book && (
        <div>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Publisher: {book.publisher}</p>
          <p>Genre: {book.genre}</p>
          <p>Available: {book.availability.isAvailable ? "Yes" : "No"}</p>
          <p>
            Due Date:{" "}
            {book.availability.dueDate
              ? new Date(book.availability.dueDate).toLocaleDateString()
              : "—"}
          </p>
          <p>Borrower: {book.availability.borrower || "—"}</p>
          <button onClick={() => navigate("/")}>Back</button>
        </div>
      )}
    </div>
  );
};

export default BookPage;
