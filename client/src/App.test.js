import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import Form from './components/form/Form';
import UrlList from './components/form/UrlList';
import UrlInput from './components/form/UrlInput';
import MetadataDisplay from './components/form/MetadataDisplay';

// Test 1: Navigation between Home and About pages
test('should navigate between Home and About pages correctly', () => {
  render(<App />);
  
  // Verify Home page is displayed by default
  expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  
  // Navigate to About page
  const aboutLink = screen.getByText(/About/i);
  fireEvent.click(aboutLink);
  
  // Verify About page is displayed
  expect(screen.getByText(/About Page/i)).toBeInTheDocument();
  
  // Navigate back to Home page
  const homeLink = screen.getByText(/Home/i);
  fireEvent.click(homeLink);
  
  // Verify Home page is displayed again
  expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
});

// Test 2: Adding and removing URL input fields
test('should add and remove URL input fields', () => {
  const urls = ['https://test1.com', 'https://test2.com'];
  const mockOnAddUrl = jest.fn(() => urls.push(''));
  const mockOnRemoveUrl = jest.fn((index) => urls.splice(index, 1));
  
  render(<Form urls={urls} onChange={jest.fn()} onAddUrl={mockOnAddUrl} onRemoveUrl={mockOnRemoveUrl} onSubmit={jest.fn()} error={null} isLoading={false} invalidUrls={[]} onReset={jest.fn()} />);
  
  // Click "Add URL" button
  fireEvent.click(screen.getByTitle(/Add URL/i));
  expect(mockOnAddUrl).toHaveBeenCalled();
  expect(urls.length).toBe(3);
  
  // Click "Remove" button on the first input field
  const removeButton = screen.getAllByTitle(/Remove URL/i)[0];
  fireEvent.click(removeButton);
  expect(mockOnRemoveUrl).toHaveBeenCalledWith(0);
  expect(urls.length).toBe(2);
});

// Test 3: Copy URL to clipboard
test('should copy URL to clipboard when copy button is clicked', async () => {
  const mockNavigatorClipboard = {
    writeText: jest.fn(),
  };
  Object.assign(navigator, {
    clipboard: mockNavigatorClipboard,
  });

  render(<UrlInput index={0} value="https://test.com" onChange={jest.fn()} onRemoveUrl={jest.fn()} showRemoveButton={true} isInvalid={false} />);

  // Click the copy button
  fireEvent.click(screen.getByTitle(/Copy URL/i));
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('https://test.com');

  // Wait for the toast message to appear
  await waitFor(() => {
    expect(screen.getByText(/Copied to clipboard!/i)).toBeInTheDocument();
  });
});

// Test 4: Display invalid URL message
test('should display an invalid URL message when the input is invalid, waiting up to 5 seconds', async () => {
  render(<UrlInput index={0} value="invalid-url" onChange={jest.fn()} onRemoveUrl={jest.fn()} showRemoveButton={true} isInvalid={true} />);

  // Wait for the invalid message to appear, with a maximum wait time of 5 seconds
  await waitFor(() => {
    expect(screen.getByText(/Invalid URL/i)).toBeInTheDocument();
  }, { timeout: 5000 });
});

// Test 5: Form submission with valid URLs
test('should call onSubmit with valid URLs', () => {
  const validUrls = ['https://validurl1.com', 'https://validurl2.com'];
  const mockOnSubmit = jest.fn();

  render(<Form urls={validUrls} onChange={jest.fn()} onAddUrl={jest.fn()} onRemoveUrl={jest.fn()} onSubmit={mockOnSubmit} error={null} isLoading={false} invalidUrls={[]} onReset={jest.fn()} />);

  // Click the submit button
  fireEvent.click(screen.getByTitle(/Submit URLs/i));
  expect(mockOnSubmit).toHaveBeenCalled();
});
