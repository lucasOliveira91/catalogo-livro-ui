import { render, screen } from '@testing-library/react';
import UserCatalog from '../pages/UserCatalog';

test('exibe catálogo de livros', () => {
    render(<UserCatalog />);
    const catalogTitle = screen.getByText(/Catalog/i);
    expect(catalogTitle).toBeInTheDocument();
});
