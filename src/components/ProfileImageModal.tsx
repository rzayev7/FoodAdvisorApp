import React, { useRef, useState } from "react";
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Flex,
  Input,
  FormLabel,
  Text,
  Image,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "@/contexts/authContext";
import { imageDb } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export interface CustomModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  initialRef?: React.RefObject<HTMLButtonElement>;
  finalRef?: React.RefObject<HTMLButtonElement>;
  title: string;
  saveButtonText?: string;
  cancelButtonText?: string;
}

const ProfileImageModal: React.FC<CustomModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  initialRef,
  finalRef,
  title,
}) => {
  const { user, changeProfileImage } = useAuth();
  const toast = useToast();
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const resetFields = () => {
    setImage(null);
    setImageUrl("");
  };

  const handleSave = async () => {
    let imageUrl = "";
    if (image) {
      const imageRef = ref(imageDb, `images/profileImages/${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }
    try {
      changeProfileImage(imageUrl);
      toast({
        position: "top",
        title: "Profile image updated",
        status: "success",
        isClosable: true,
        duration: 2000,
        containerStyle: {
          bottom: "100px",
        },
      });
      setImage(null);
      setImageUrl("");
      onClose();
    } catch (error) {
      toast({
        title: "Unexpected error happened.",
        status: "error",
        isClosable: true,
      });
      console.error(error);
    }
  };
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="image" mt={6}>
              <Flex
                align="center"
                p={1}
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
              >
                <Input
                  variant="filled"
                  type="file"
                  accept="image/*"
                  hidden
                  id="file-upload"
                  onChange={(event) => {
                    if (event.target.files && event.target.files.length > 0) {
                      setImage(event.target.files[0]);
                      setImageUrl(URL.createObjectURL(event.target.files[0]));
                    }
                  }}
                />
                {!imageUrl && (
                  <FormLabel
                    htmlFor="file-upload"
                    mx={4}
                    mt={2}
                    cursor="pointer"
                  >
                    Upload Image
                  </FormLabel>
                )}
                {imageUrl && (
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    alignItems="center"
                    justifyContent="center"
                    gap={4}
                  >
                    <Text mx={4} mt={2}>
                      {image?.name}
                    </Text>
                    <Image alt="" src={imageUrl} width={100} height={100} />
                    <Button
                      onClick={() => {
                        setImageUrl("");
                        setImage(null);
                      }}
                      ml={4}
                    >
                      Remove
                    </Button>
                  </Flex>
                )}
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Submit
            </Button>
            <Button
              onClick={() => {
                resetFields();
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileImageModal;
