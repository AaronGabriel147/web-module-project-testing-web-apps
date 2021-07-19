import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

// first we use a selector and apply it to a new variable. Then we do thing to it. 

test('renders without errors', () => {
    render(<ContactForm />)
});

// If the text is the only text of it's kind we can query for the specific test. getByText or queryByText
test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const formTitle = screen.queryByText(/contact form/i); // i means insensitive
    // console.log(formTitle);
    // assertions are expects
    expect(formTitle).toBeInTheDocument();
    expect(formTitle).toBeTruthy();
    expect(formTitle).toHaveTextContent(/contact fOrM/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstNameField = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameField, "123");
    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
    // console.log(firstNameField);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);
    await waitFor(() => {
        const errorMessages = screen.queryAllByTestId("error");
        expect(errorMessages).toHaveLength(3);
        // console.log(errorMessages);
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)

    const firstNameField = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameField, "Aaron");

    const lastNameField = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameField, "Gabriel");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errorMessages = await screen.getAllByTestId("error");
    expect(errorMessages).toHaveLength(1);
});

// I do not get a lot of this.

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