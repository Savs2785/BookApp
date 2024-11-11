import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore'; 

export default function BookList({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const getBooks = async () => {
      try {
        const booksCollection = collection(db, 'bookscollection'); 
        const querySnapshot = await getDocs(booksCollection); 

        if (querySnapshot.empty) {
          console.log("No books found in the database.");
        }


        const booksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBooks(booksData);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    getBooks();
    navigation.setOptions({ headerShown: false });

  }, [navigation]);

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>; 
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer} 
        renderItem={({ item }) => {

         return (
            <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { book: item })}>
              <View style={styles.bookItem}>
                {/* Book Cover */}
                <Image
                  source={{ uri: item.coverImage }} 
                  style={styles.coverImage}
                />
                <View style={styles.bookDetails}>
                  <Text style={styles.bookName}>{item.bookName || "No Title"}</Text>
                  <Text style={styles.authorName}>{item.author || "Unknown Author"}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#a1c6ea', 
    paddingTop: 20, 
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  flatListContainer: {
    paddingBottom: 20, 
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#d3e2f2', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coverImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: 'cover',
  },
  bookDetails: {
    flex: 1,
  },
  bookName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  authorName: {
    fontSize: 14,
    color: '#555',
  },
});
