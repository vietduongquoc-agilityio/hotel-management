import { useToast } from "@chakra-ui/react";

const Toast = () => {
  const toast = useToast();

  const showToast = (
    title: string,
    status: "info" | "warning" | "success" | "error"
  ) => {
    toast({
      title,
      status,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return { showToast };
};

export default Toast;




