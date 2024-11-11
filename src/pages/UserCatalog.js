import React, { useEffect, useState } from 'react';
import { fetchBooks, rentBook } from '../services/api';
import styled from 'styled-components';

const CatalogContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const BookList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BookItem = styled.li`
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BookTitle = styled.h2`
  font-size: 1.2em;
  margin: 0;
`;

const RentButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#4CAF50')};
  color: white;
  border: none;
  padding: 10px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#45a049')};
  }
`;

const UserCatalog = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const fetchedBooks = await fetchBooks();
                console.log('Fetched Books:', fetchedBooks);
                setBooks(fetchedBooks.content);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch books:", error);
                setError("Failed to load books");
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    const handleRentBook = async (bookId) => {
        try {
            await rentBook(bookId);
            alert("Livro alugado com sucesso!");
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === bookId ? { ...book, disponivel: false } : book
                )
            );
        } catch (error) {
            console.error("Failed to rent book:", error);
            alert("Failed to rent book");
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <CatalogContainer>
            <h1>Catálogo de Livros</h1>
            <BookList>
                {books.length > 0 ? (
                    books.map((book) => (
                        <BookItem key={book.id}>
                            <div>
                                <BookTitle>{book.titulo}</BookTitle>
                                <p>Autor: {book.autor}</p>
                            </div>
                            <RentButton
                                onClick={() => handleRentBook(book.id)}
                                disabled={!book.disponivel}
                            >
                                {book.disponivel ? 'Alugar' : 'Indisponível'}
                            </RentButton>
                        </BookItem>
                    ))
                ) : (
                    <p>Nenhum livro disponível no momento.</p>
                )}
            </BookList>
        </CatalogContainer>
    );
};

export default UserCatalog;
