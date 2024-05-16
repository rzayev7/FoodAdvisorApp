import { SimpleGrid, Card, CardBody, Skeleton, SkeletonText, Flex } from "@chakra-ui/react";

export default function CardSkeleton() {
    return (
      <>
      <SimpleGrid
          spacing={10}
          templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
        >
          {[1, 2, 3, 4].map((index) => (
            <Card key={index}>
              <CardBody>
                <Skeleton height="200px" />
                <Skeleton height="32px" width="100px" mt="4" />
                <SkeletonText
                  mt="4"
                  noOfLines={3}
                  spacing="2"
                  skeletonHeight="4"
                />
                <Flex>
                  <Skeleton height="40px" w="100%" mt="4" />
                  <Skeleton height="40px" w="100%" mt="4" ml="2" />
                </Flex>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </>
    )
}
