import React from "react";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  InputRightElement,
  Button,
  InputGroup,
  Container,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const isError = credentials.email === "";
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      console.log(json);
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
    console.log(json);
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <Center h="90vh">
      <Container maxW="md">
        <form onSubmit={handlesubmit}>
          <FormControl isInvalid={isError}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            {!isError ? (
              <FormHelperText>
                Enter your registered Profolio email to sign in
              </FormHelperText>
            ) : (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
            <FormLabel my={3}>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                name="password"
                id="password"
                value={credentials.password}
                placeholder="Enter password"
                onChange={onChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button type="submit" my={5} colorScheme="blue">
              Login
            </Button>
          </FormControl>
        </form>
      </Container>
    </Center>
  );
}
export default Signin;
