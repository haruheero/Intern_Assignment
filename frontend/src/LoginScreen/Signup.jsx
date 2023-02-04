import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errortext, seterrortext] = useState("not valid");
  const [email, setemail] = useState("");
  const handlemail = (event) => setemail(event.target.value);
  const [password, setpassword] = useState("");
  const handlepass = (event) => setpassword(event.target.value);
  const [error, seterror] = useState(false);
  const Signupclick = () => {
    axios
      .post("http://127.0.0.1:8000/signup", {
        email,
        password,
      })
      .then(function (response) {
        if (response.data.access_token) {
          navigate('/')
        } else {
          seterror(true);
        }
      })
      .catch(function (error) {
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
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                required
                value={email}
                onChange={handlemail}
                type="email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={password}
                  onChange={handlepass}
                  required
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={Signupclick}
              >
                Sign up
              </Button>
              {error ? (
                <Text alignSelf={"center"} color={"#900"}>
                  {errortext}
                </Text>
              ) : (
                <></>
              )}
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link onClick={()=>navigate('/')} color={"blue.400"}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
