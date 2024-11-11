import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { BookContext } from '../bookcontext'; 

export default function BookDetail({ route }) {
  const { book } = route.params;  
  const { borrowedBooks, borrowBook } = useContext(BookContext); 

  const isBorrowed = borrowedBooks.length >= 3; 
  const isAlreadyBorrowed = borrowedBooks.some((borrowedBook) => borrowedBook.id === book.id); 

  const handleBorrowBook = (book) => {
    if (isAlreadyBorrowed) {
      Alert.alert(
        "Already Borrowed",
        `${book.bookName} has already been borrowed.`,
        [{ text: "OK" }]
      );
    } else if (isBorrowed) {
      Alert.alert(
        "Limit Reached",
        "You cannot borrow more than 3 books!!!",
        [{ text: "OK" }]
      );
    } else {
      const success = borrowBook(book); 
      if (success) {
        Alert.alert(
          "Book Borrowed",
          `${book.bookName} has been borrowed successfully.`,
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          "Error",
          "Something went wrong while borrowing the book. Please try again.",
          [{ text: "OK" }]
        );
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.bookDetail}>
        {book.coverImage ? (
          <Image source={{ uri: book.coverImage }} style={styles.coverImage} />
        ) : (
          <Text style={styles.noImageText}>No Image Available</Text>
        )}

        <Text style={styles.bookName}>{book.bookName}</Text>
        <Text style={styles.author}>Author: {book.author}</Text>
        <Text style={styles.rating}>Rating: {book.rating}</Text>
        <Text style={styles.summary}>Summary: {book.summary}</Text>

        <TouchableOpacity
          style={[styles.borrowButton, isBorrowed && styles.disabledButton, isAlreadyBorrowed && styles.disabledButton]}
          onPress={() => handleBorrowBook(book)}
          disabled={isBorrowed || isAlreadyBorrowed}
        >
          <Text style={[styles.buttonText, (isBorrowed || isAlreadyBorrowed) && styles.disabledButtonText]}>
            Borrow Book
          </Text>
        </TouchableOpacity>

        {isBorrowed && <Text style={styles.borrowLimitText}>You cannot borrow more than 3 books.</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#a1c6ea', 
    padding: 20,
  },
  bookDetail: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  coverImage: {
    width: 200,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, 
  },
  noImageText: {
    fontSize: 16,
    color: '#000',  
    textAlign: 'center',
    marginBottom: 20,
  },
  bookName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', 
    marginVertical: 10,
  },
  author: {
    fontSize: 18,
    color: '#000', 
    marginVertical: 5,
  },
  rating: {
    fontSize: 16,
    color: '#000', 
    marginVertical: 5,
  },
  summary: {
    fontSize: 14,
    color: '#000', 
    marginVertical: 5,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  borrowButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginVertical: 15,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, 
  },
  disabledButton: {
    backgroundColor: '#ccc', 
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledButtonText: {
    color: 'gray', 
  },
  borrowLimitText: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});
