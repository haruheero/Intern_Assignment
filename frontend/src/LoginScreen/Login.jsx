import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
export default function Login() {
  const navigate = useNavigate();
  const [errortext, seterrortext] = useState("not valid");
  const [email, setemail] = useState("");
  const handlemail = (event) => setemail(event.target.value);
  const [password, setpassword] = useState("");
  const handlepass = (event) => setpassword(event.target.value);
  const [error, seterror] = useState(false);
  const LoginClick = () => {
    axios
      .post("http://127.0.0.1:8000/login", {
        email,
        password,
      })
      .then(function (response) {
        if (response.data.access_token) {
          navigate("/crud");
        } else {
          seterror(true);
          seterrortext(response.data.error);
        }
      })
      .catch(function (error) {
        seterror(true);
        seterrortext(error);
      });
  };
  const responseGoogle = (respons) => {
    axios
      .post("http://127.0.0.1:8000/gauth", {
        cred : respons.credential,
      })
      .then(function (response) {
        console.log(response.data)
        if (response.data === true) {
          navigate("/crud");
        } else {
          seterror(true);
          seterrortext(response.data.error);
        }
      })
      .catch(function (error) {
        seterror(true);
        seterrortext(error);
      });
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                required
                value={email}
                onChange={handlemail}
                type="email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                onChange={handlepass}
                required
                type="password"
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Link onClick={() => navigate("/signup")} color={"blue.400"}>
                  Go to SignUp
                </Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                onClick={LoginClick}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
              {error ? (
                <Text alignSelf={"center"} color={"#900"}>
                  {errortext}
                </Text>
              ) : (
                <></>
              )}
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  responseGoogle(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                useOneTap
              />
              ;
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
