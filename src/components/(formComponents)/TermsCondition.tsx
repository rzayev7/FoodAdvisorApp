import {
  Button,
  Checkbox,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface ITermsProps {
  setAgreeTerms: any;
  setIsTermsModalOpen: any;
  handleReject: any;
  handleAccept: any;
  agreeTerms: any;
  isTermsModalOpen: any;
}
const TermsCondition: React.FC<ITermsProps> = ({
  setAgreeTerms,
  setIsTermsModalOpen,
  handleAccept,
  handleReject,
  agreeTerms,
  isTermsModalOpen,
}) => {
  return (
    <>
      <Checkbox
        width="100%"
        mb="20px"
        isChecked={agreeTerms}
        onChange={() => {
          setAgreeTerms(!agreeTerms);
        }}
      >
        I agree with{" "}
        <span
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => {
            setIsTermsModalOpen(true);
          }}
        >
          terms and conditions
        </span>
      </Checkbox>
      <Modal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Terms and Conditions</ModalHeader>
          <ModalCloseButton />
          <ModalBody style={{ overflowY: "auto", maxHeight: "60vh" }}>
            <Text>
              <Text fontWeight={600}> 1. Acceptance of Terms</Text>
              By accessing or using the Fooderra website, you agree to comply
              with and be bound by these terms and conditions. If you do not
              agree with any of these terms, you are prohibited from using or
              accessing this Site.
              <Text fontWeight={600}>2. User Content</Text>
              a. Fooderra allows users to submit and share food recipes, images,
              and other content. By submitting content to the Site, you grant
              Fooderra a non-exclusive, royalty-free, worldwide, perpetual
              license to use, publish, and distribute the content. <br /> b. You
              are solely responsible for the content you submit and ensure that
              it does not violate any third-party rights, including copyright,
              trademark, privacy, or other personal or proprietary rights.
              <Text fontWeight={600}> 3.Privacy Policy </Text>
              Please review our Privacy Policy to understand how we collect,
              use, and disclose information.
              <Text fontWeight={600}> 4. Intellectual Property </Text>
              a. All content on the Site, including text, graphics, logos, and
              images, is the property of Fooderra and is protected by
              intellectual property laws.
              <br />
              b. You may not use, reproduce, modify, or distribute any content
              from the Site without the prior written consent of Fooderra.
              <Text fontWeight={600}>5. Prohibited Activities </Text>
              You agree not to engage in any of the following activities: a.
              Violating any applicable laws or regulations.
              <br /> b. Interfering with the proper functioning of the Site.
              <br /> c. Attempting to gain unauthorized access to the Site or
              its related systems.{" "}
              <Text fontWeight={600}>6. Disclaimer of Warranty</Text> a.
              Fooderra makes no warranties or representations about the accuracy
              or completeness of the content on the Site.
              <br /> b. Your use of the Site is at your own risk. Fooderra does
              not guarantee that the Site will be error-free or uninterrupted.
              <Text fontWeight={600}> 7. Limitation of Liability </Text>
              Fooderra and its affiliates shall not be liable for any direct,
              indirect, incidental, consequential, or punitive damages arising
              out of your access to or use of the Site.
              <Text fontWeight={600}> 8. Modifications</Text>
              Fooderra reserves the right to modify these terms and conditions
              at any time. Your continued use of the Site after such
              modifications will constitute your acknowledgment of the modified
              terms.
              <Text fontWeight={600}> 9. Governing Law </Text>
              These terms and conditions are governed by and construed in
              accordance with the laws.
              <Text fontWeight={600}> 10. Contact Information </Text> If you
              have any questions or concerns about these terms and conditions,
              you can contact us at{" "}
              <span
              style={{cursor:"pointer", color:"blue"}}
                onClick={(e) => {
                  window.location.href = "fooderra.contact@gmail.com";
                  e.preventDefault();
                }}
              >
                fooderra.contact@gmail.com{" "}
              </span>
              .
            </Text>
          </ModalBody>
          <ModalFooter>
            <HStack justifyContent="space-between" width="100%">
              <Button
                colorScheme="gray"
                variant="solid"
                color="black"
                onClick={handleReject}
              >
                Reject
              </Button>
              <Button
                colorScheme="gray"
                variant="solid"
                color="black"
                onClick={handleAccept}
              >
                Accept
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TermsCondition;
