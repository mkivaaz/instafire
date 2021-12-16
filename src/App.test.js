import { render, screen } from '@testing-library/react';
import App from './App';
import UserLogin from './UserLogin';

test('renders learn react link', () => {
  render(<UserLogin />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
