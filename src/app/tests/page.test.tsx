// import { render } from '@testing-library/react';
// import { useQuery } from 'react-query'; // Import useQuery
// import axios from 'axios';

// // Mock the useQuery hook
// jest.mock('react-query', () => ({
//   useQuery: jest.fn(),
// }));

// // Mock axios.get method
// jest.mock('axios');

// describe('Weather Component', () => {
//   it('should render loading state', () => {
//     // Mock loading state
//     (useQuery as jest.Mock).mockReturnValueOnce({
//       isLoading: true,
//       error: null,
//       data: null,
//     });

//     // Render your component
//     const { getByText } = render(<YourComponent />);

//     // Assert that loading state is rendered
//     expect(getByText('Loading...')).toBeInTheDocument();
//   });

//   it('should render data', async () => {
//     // Mock data
//     const mockData = {
//       /* Your mocked data here */
//     };

//     // Mock successful data retrieval
//     (useQuery as jest.Mock).mockReturnValueOnce({
//       isLoading: false,
//       error: null,
//       data: mockData,
//     });

//     // Render your component
//     const { getByText } = render(<YourComponent />);

//     // Assert that your component renders data correctly
//     expect(getByText('Your Data')).toBeInTheDocument();
//   });

//   it('should handle error state', () => {
//     // Mock error state
//     (useQuery as jest.Mock).mockReturnValueOnce({
//       isLoading: false,
//       error: 'Error message',
//       data: null,
//     });

//     // Render your component
//     const { getByText } = render(<YourComponent />);

//     // Assert that error message is rendered
//     expect(getByText('Error message')).toBeInTheDocument();
//   });
// });
