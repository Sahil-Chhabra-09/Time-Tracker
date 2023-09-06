import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";

function Login() {
  const isDesktop = useMediaQuery("(min-width:1000px)");
  return (
    <Box color={"white"} sx={{ height: "100vh" }} className="bg-white">
      <Box backgroundColor={"rgb(22, 78, 99)"}>
        <Box className="text-center" p="0.5rem 6%">
          <Typography fontWeight="bold" fontSize="32px">
            {/*color="#389289"*/}
            Office Timer
          </Typography>
        </Box>
        <Box
          width={isDesktop ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          // backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Track your time effectively
          </Typography>
        </Box>
      </Box>
      <Box className="w-4/5 mx-auto md:w-3/5 lg:w-2/5">
        <Form />
      </Box>
    </Box>
  );
}

export default Login;
