import React, { useEffect, useState } from 'react';
import api from '../services/api';
import styled from 'styled-components';

const AdminContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Form = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
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

const AdminPanel = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newBook, setNewBook] = useState({ titulo: '', autor: '' });
    const [editBook, setEditBook] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get('/livros');
                setBooks(response.data.content);
            } catch (error) {
                console.error('Erro ao buscar livros:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
    };

    const handleAddBook = async () => {
        try {
            const response = await api.post('/livros', newBook);
            setBooks([...books, response.data]);
            setNewBook({ titulo: '', autor: '' });
        } catch (error) {
            console.error('Erro ao adicionar livro:', error);
            alert('Erro ao adicionar livro.');
        }
    };

    const handleEditBook = (book) => {
        setEditBook(book);
    };

    const handleUpdateBook = async () => {
        try {
            const response = await api.put(`/livros/${editBook.id}`, editBook);
            setBooks((prevBooks) =>
                prevBooks.map((book) => (book.id === editBook.id ? response.data : book))
            );
            setEditBook(null);
        } catch (error) {
            console.error('Erro ao atualizar livro:', error);
            alert('Erro ao atualizar livro.');
        }
    };

    const handleDeleteBook = async (bookId) => {
        try {
            await api.delete(`/livros/${bookId}`);
            setBooks(books.filter((book) => book.id !== bookId));
        } catch (error) {
            console.error('Erro ao deletar livro:', error);
            alert('Erro ao deletar livro.');
        }
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <AdminContainer>
            <h1>Painel Administrativo</h1>

            <Form>
                <Input
                    type="text"
                    name="titulo"
                    placeholder="Título"
                    value={newBook.titulo}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="autor"
                    placeholder="Autor"
                    value={newBook.autor}
                    onChange={handleInputChange}
                />
                <Button onClick={handleAddBook}>Adicionar Livro</Button>
            </Form>

            {editBook && (
                <Form>
                    <Input
                        type="text"
                        name="titulo"
                        placeholder="Título"
                        value={editBook.titulo}
                        onChange={(e) =>
                            setEditBook((prevBook) => ({ ...prevBook, titulo: e.target.value }))
                        }
                    />
                    <Input
                        type="text"
                        name="autor"
                        placeholder="Autor"
                        value={editBook.autor}
                        onChange={(e) =>
                            setEditBook((prevBook) => ({ ...prevBook, autor: e.target.value }))
                        }
                    />
                    <Button onClick={handleUpdateBook}>Atualizar Livro</Button>
                    <Button onClick={() => setEditBook(null)}>Cancelar</Button>
                </Form>
            )}

            <h2>Lista de Livros</h2>
            <BookList>
                {books.map((book) => (
                    <BookItem key={book.id}>
                        <div>
                            <h3>{book.titulo}</h3>
                            <p>Autor: {book.autor}</p>
                        </div>
                        <div>
                            <Button onClick={() => handleEditBook(book)}>Editar</Button>
                            <Button onClick={() => handleDeleteBook(book.id)}>Excluir</Button>
                        </div>
                    </BookItem>
                ))}
            </BookList>
        </AdminContainer>
    );
};

export default AdminPanel;
