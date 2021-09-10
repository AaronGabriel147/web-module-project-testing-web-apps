import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import { ErrorMessage } from 'react-hook-form';

test('renders without errors', () => {
    render(<ContactForm />)
});



test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const formTitle = screen.queryByText('Contact Form'); // (/contact form/i) for case insensitivity.
    expect(formTitle).toBeInTheDocument();                // Tests to see if in document
    expect(formTitle).toBeTruthy();
    expect(formTitle).toHaveTextContent(/contact form/i)
});




test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstNameField = screen.getByLabelText(/first name*/i)
    // console.log(firstNameField)
    userEvent.type(firstNameField, "123");

    // const errorMessages = await screen.findAllByTestId('error');
    // expect(errorMessages).toHaveLength(1);   

    
    screen.debug(); // shows you everything in the DOM that the test can see inside render(<ContactForm />)
});

// test('renders THREE error messages if user enters no values into any fields.', async () => {
//     render(<ContactForm />)
// });

// test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
//     render(<ContactForm />)
// });

// test('renders "email must be a valid email address" if an invalid email is entered', async () => {
//     render(<ContactForm />)
// });

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
//     render(<ContactForm />)
// });

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
//     render(<ContactForm />)
// });

// test('renders all fields text when all fields are submitted.', async () => {
//     render(<ContactForm />)
// });