import React, { createContext, useState } from 'react';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const borrowBook = (book) => {
    const isBookAlreadyBorrowed = borrowedBooks.some((borrowedBook) => borrowedBook.id === book.id);
    if (isBookAlreadyBorrowed) {
      return false; 
    }

    if (borrowedBooks.length < 3) {
      setBorrowedBooks([...borrowedBooks, book]);
      return true; 
    }
    return false; 
  };

  const returnBook = (bookId) => {
    setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId));
  };

  return (
    <BookContext.Provider value={{ borrowedBooks, borrowBook, returnBook }}>
      {children}
    </BookContext.Provider>
  );
};
