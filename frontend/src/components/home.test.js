// user.test.js

import React from "react";
import { render, fireEvent, queryByTitle, screen, queryByText, waitFor, getByText } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Homepage from "./home";
import { VerticalLinearStepper } from "./forms/authentication/Stepper.jsx"
import AddressForm from "./ui-components/forms/AddressForm";


describe('User Registration', () => {
  const registerFunction = jest.fn()
  const { queryByTestId, queryByPlaceholderText, getByText
  } = render(<VerticalLinearStepper handleUserRegistration={registerFunction} />)
  const firstName = queryByPlaceholderText('first-name')
  const lastNameInput = queryByPlaceholderText("last-name")
  const emailInput = queryByPlaceholderText("email")
  const usernameInput = queryByPlaceholderText("username")
  const password1Input = queryByPlaceholderText("password-1")
  const password2Input = queryByPlaceholderText("password-2")
  const registerButton = queryByTestId('register')
  const street = queryByPlaceholderText("street")
  const suburb = queryByPlaceholderText("suburb")
  const city = queryByPlaceholderText("city")
  const province = queryByPlaceholderText("province")
  const national_id = queryByPlaceholderText("national-id")
  const list = Array.of(
    [firstName,
      lastNameInput,
      emailInput,
      usernameInput,
      password1Input,
      password2Input,
      registerButton]
  )
  list.forEach(e => expect(e).toBeTruthy())
  it('registers user given valid data', async () => {
    fireEvent.change(firstName, { target: { value: "Komborerai" } })
    fireEvent.change(lastNameInput, { target: { value: "Chikweshe" } })
    fireEvent.change(emailInput, { target: { value: "kchikweshe@gmail.com" } })
    fireEvent.change(usernameInput, { target: { value: "kchikweshe" } })
    fireEvent.change(password1Input, { target: { value: "!@#123kombo" } })
    fireEvent.change(password2Input, { target: { value: "!@#123kombo" } })

    fireEvent.click(registerButton)
    expect(registerFunction).toHaveBeenCalled()
    act(() => {
      render(<AddressForm />, null);
    })
    fireEvent.change(street, { target: { value: "9 Quendon Road" } })
    fireEvent.change(suburb, { target: { value: "Strathaven" } })
    fireEvent.change(city, { target: { value: "Harare" } })
    fireEvent.change(province, { target: { value: "Harare" } })
    fireEvent.click(registerButton)
    expect(registerFunction).toHaveBeenCalled()
    // fireEvent.change(national_id, { target: { value: "63-1506262Z25" } })


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
  it('displays username once firstname and lastname are present', () => {
    fireEvent.change(firstName, { target: { value: "Komborerai" } })
    fireEvent.change(lastNameInput, { target: { value: "Chikweshe" } })

    expect(usernameInput.value).toBe("kchikweshe")


  })


})