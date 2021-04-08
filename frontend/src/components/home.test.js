// user.test.js

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Homepage from "./home";
import { VerticalLinearStepper } from "./forms/authentication/Stepper.jsx"




describe('User Registration', () => {
  const registerFunction = jest.fn()
  const { queryByTestId, queryByPlaceholderText } = render(<VerticalLinearStepper handleUserRegistration={registerFunction} />)
  const firstName = queryByPlaceholderText("first-name")
  const lastNameInput = queryByPlaceholderText("last-name")
  const emailInput = queryByPlaceholderText("email")
  const usernameInput = queryByPlaceholderText("username")
  const password1Input = queryByPlaceholderText("password1")
  const password2Input = queryByPlaceholderText("password2")
  const registerButton = queryByTestId('register')


  it('registers user given valid data', () => {
    let value = "Komborerai"
    fireEvent.change(firstName, { target: { value: "Komborerai" } })
    fireEvent.change(lastNameInput, { target: { value: "Chikweshe" } })
    fireEvent.change(emailInput, { target: { value: "kombogc@gmail.com" } })
    fireEvent.change(usernameInput, { target: { value: "kchikweshe" } })
    fireEvent.change(password1Input, { target: { value: "!@#123kombo" } })
    fireEvent.change(password2Input, { target: { value: "!@#123kombo" } })

    fireEvent.click(registerButton)
    expect(registerFunction).toHaveBeenCalled()
  })

  it('does not trigger register user given mismatched passwords', () => {
    fireEvent.change(firstName, { target: { value: "Komborerai" } })
    fireEvent.change(lastNameInput, { target: { value: "Chikweshe" } })
    fireEvent.change(emailInput, { target: { value: "kombogc@gmail.com" } })
    fireEvent.change(usernameInput, { target: { value: "kchikweshe" } })
    fireEvent.change(password1Input, { target: { value: "!@#123komb" } })
    fireEvent.change(password2Input, { target: { value: "!@#123kombo" } })

    fireEvent.click(registerButton)
    expect(registerFunction).not.toHaveBeenCalled()
  })

})