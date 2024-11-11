import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { db } from '../firebase'; 
import { BookContext } from '../bookcontext';
import { doc, updateDoc } from 'firebase/firestore'; 

export default function Borrowed() {
  const { borrowedBooks, returnBook } = useContext(BookContext);

  const handleReturnBook = async (bookId) => {
    try {
      const bookRef = doc(db, 'bookscollection', bookId);

      await updateDoc(bookRef, {
        isBorrowed: false,
      });

      returnBook(bookId);

      Alert.alert(
        "Book Returned",
        "The book has been returned successfully.",
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error("Error returning book: ", error);
      Alert.alert(
        "Error",
        "Something went wrong while returning the book. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      {borrowedBooks.length === 0 ? (
        <Text style={styles.noBooksText}>No borrowed books</Text>
      ) : (
        <FlatList
          data={borrowedBooks}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Text style={styles.bookText}>{`${item.bookName} by ${item.author}`}</Text>

              <TouchableOpacity
                style={styles.returnButton}
                onPress={() => handleReturnBook(item.id)} 
              >
                <Text style={styles.buttonText}>Return Book</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f8ff', 
  },
  bookItem: {
    marginBottom: 15,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, 
  },
  bookText: {
    fontSize: 14, 
    color: '#000', 
    marginBottom: 15,
    fontWeight: '600',
  },
  noBooksText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    fontWeight: '500',
  },
  returnButton: {
    backgroundColor: '#4CAF50', 
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});
