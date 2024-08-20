import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Form from './components/form/Form';
import MetadataDisplay from './components/form/MetadataDisplay';
import UrlList from './components/form/UrlList';

// Test 1: Adding a new URL input field
test('should add a new URL input field when "Add URL" button is clicked', () => {
  const urls = ['https://test1.com', 'https://test2.com', 'https://test3.com']
  const mockAddUrl = jest.fn(() => {
    urls.push('');
  });
  const { rerender } = render(<Form urls={urls} onChange={jest.fn()} onAddUrl={mockAddUrl} onRemoveUrl={jest.fn()} onSubmit={jest.fn()} error={null} />);

  const addButton = screen.getByText(/Add URL/i);
  fireEvent.click(addButton);

  rerender(<Form urls={urls} onChange={jest.fn()} onAddUrl={mockAddUrl} onRemoveUrl={jest.fn()} onSubmit={jest.fn()} error={null} />);

  const inputs = screen.getAllByPlaceholderText(/URL/i);
  expect(inputs.length).toBe(4);
});


// Test 2: Display error message for invalid URL
test('should display an error message when an invalid URL is submitted', () => {
  const invalidUrl = 'invalid-url';
  render(<Form urls={[invalidUrl]} onChange={jest.fn()} onAddUrl={jest.fn()} onRemoveUrl={jest.fn()} onSubmit={jest.fn()} error="One or more URLs are invalid." />);

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  const errorMessage = screen.getByText(/One or more URLs are invalid./i);
  expect(errorMessage).toBeInTheDocument();
});

// Test 3: Render metadata correctly
test('should render metadata correctly', () => {
  const metadata = [
    { title: 'Test Title', description: 'Test Description', image: 'test-image.jpg' },
  ];

  render(<MetadataDisplay metadata={metadata} />);

  const title = screen.getByText(/Test Title/i);
  const description = screen.getByText(/Test Description/i);
  const image = screen.getByAltText(/Thumbnail for Test Title/i);

  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(image).toBeInTheDocument();
});

// Test 4: Remove a URL input field
test('should remove a URL input field when "Remove" button is clicked', () => {
  const urls = ['https://test1.com', 'https://test2.com', 'https://test3.com', 'https://test4.com'];
  const mockRemove = jest.fn();

  render(<UrlList urls={urls} onChange={jest.fn()} onRemoveUrl={mockRemove} />);

  const removeButtons = screen.getAllByRole('button', { name: /Remove/i });
  fireEvent.click(removeButtons[0]);

  expect(mockRemove).toHaveBeenCalledWith(0);
});


// Test 5: Call onSubmit with valid URLs
test('should call onSubmit with valid URLs', () => {
  const mockSubmit = jest.fn();
  const validUrls = ['https://validurl1.com', 'https://validurl2.com'];

  render(<Form urls={validUrls} onChange={jest.fn()} onAddUrl={jest.fn()} onRemoveUrl={jest.fn()} onSubmit={mockSubmit} error={null} />);

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  expect(mockSubmit).toHaveBeenCalled();
});
