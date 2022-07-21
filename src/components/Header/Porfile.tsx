import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfilePorps{
  showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfilePorps){
  return(
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Gustavo Tartare</Text>
          <Text color="gray.300" fontSize="small" >
            gustavocarrertartare@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Gustavo Tartare" src="https://github.com/Gustavoctt.png"/>
    </Flex>
)
}