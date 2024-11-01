import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import Form from './components/form/Form';
import UrlList from './components/form/UrlList';
import UrlInput from './components/form/UrlInput';
import MetadataDisplay from './components/form/MetadataDisplay';

// Test 1: Navigation between Home and About pages
test('should navigate between Home and About pages correctly', async () => {
  render(<App />);

  // Verify Home page content is displayed by default
  await waitFor(() => expect(screen.getByText(/Enter the URLs you want to fetch metadata for/i)).toBeInTheDocument());

  // Navigate to About page
  const aboutLink = screen.getByText(/About/i);
  fireEvent.click(aboutLink);

  // Verify About page is displayed
  await waitFor(() => expect(screen.getByText(/This application allows you to fetch metadata/i)).toBeInTheDocument());

  // Navigate back to Home page
  const homeLink = screen.getByRole('link', { name: /Home/i });
  fireEvent.click(homeLink);

  // Verify Home page content is displayed again
  await waitFor(() => expect(screen.getByText(/Enter the URLs you want to fetch metadata for/i)).toBeInTheDocument());
});

// Test 2: Add URL input field
test('should add and remove URL input fields', () => {
  let urls = ['https://test1.com'];

  const mockOnAddUrl = jest.fn(() => {
    urls.push('https://test2.com');
  });

  const mockOnRemoveUrl = jest.fn((index) => {
    if (urls.length > 3) {
      urls.splice(index, 1);
    }
  });

  render(
    <Form
      urls={urls}
      onChange={jest.fn()}
      onAddUrl={mockOnAddUrl}
      onRemoveUrl={mockOnRemoveUrl}
      onSubmit={jest.fn()}
      error={null}
      isLoading={false}
      invalidUrls={[]}
      onReset={jest.fn()}
    />
  );

  // Click "Add URL" button
  fireEvent.click(screen.getByTitle(/Add URL/i));
  expect(mockOnAddUrl).toHaveBeenCalled();
  expect(urls.length).toBe(2);
});

// Test 3: Edit metadata
// test('should edit a current metadata', () => {
//   const metadata = [
//     {
//       title: 'Original Title',
//       description: 'Original Description',
//       image: 'https://example.com/original-image.jpg',
//     },
//   ];

//   const editedMetadata = {};

//   const mockOnEditMetadata = jest.fn((index, field, value) => {
//     editedMetadata[index] = {
//       ...editedMetadata[index],
//       [field]: value,
//     };
//   });

//   const mockToggleEditMode = jest.fn((index) => {
//     editedMetadata[index] = editedMetadata[index] || {};
//   });

//   const mockResetMetadata = jest.fn((index) => {
//     delete editedMetadata[index];
//   });

//   const isEditing = { 0: true };

//   render(
//     <MetadataDisplay
//       metadata={metadata}
//       editedMetadata={editedMetadata}
//       onEditMetadata={mockOnEditMetadata}
//       isEditing={isEditing}
//       toggleEditMode={mockToggleEditMode}
//       resetMetadata={mockResetMetadata}
//     />
//   );

//   // Simulate editing the title
//   const titleInput = screen.getByDisplayValue('Original Title');
//   fireEvent.change(titleInput, { target: { value: 'Edited Title' } });
//   expect(mockOnEditMetadata).toHaveBeenCalledWith(0, 'title', 'Edited Title');

//   // Simulate editing the description
//   const descriptionTextarea = screen.getByDisplayValue('Original Description');
//   fireEvent.change(descriptionTextarea, { target: { value: 'Edited Description' } });
//   expect(mockOnEditMetadata).toHaveBeenCalledWith(0, 'description', 'Edited Description');

//   // Simulate editing the image URL
//   const imageInput = screen.getByDisplayValue('https://example.com/original-image.jpg');
//   fireEvent.change(imageInput, { target: { value: 'https://example.com/edited-image.jpg' } });
//   expect(mockOnEditMetadata).toHaveBeenCalledWith(0, 'image', 'https://example.com/edited-image.jpg');
// });

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
