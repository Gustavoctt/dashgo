import { Box, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountsOfRegisters: number;
  registersPerPage?: number;
  currentPage ?: number;
  onChangePage: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number){
  // refazer a logica aqui
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    }).filter((page) => page > 0)
}

export function Pagination({
  totalCountsOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onChangePage
}: PaginationProps){

  const lastPage = Math.ceil(totalCountsOfRegisters / registersPerPage); //200 / 10 = Ultima pagina - 20

  const previusPages = currentPage > 1 
    ? generatePagesArray( currentPage - 1 - siblingsCount, currentPage - 1 )
    : [] ;

  const nextPages = currentPage < lastPage 
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []; 

  return(
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong> 10 </strong> de <strong>{ totalCountsOfRegisters }</strong>
      </Box>

      <Stack direction="row" spacing="2">

        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onChangePage} number={1} />
            { currentPage > (2 + siblingsCount) && <Text>...</Text>}
          </>
        )}

        {previusPages.length > 0 && previusPages.map((page) => {
          return <PaginationItem onPageChange={onChangePage} key={page} number={page} />
        })}

        <PaginationItem  onPageChange={onChangePage} number={currentPage} isCurrent/> 

        {nextPages.length > 0 && nextPages.map((page) => {
          return <PaginationItem onPageChange={onChangePage} key={page} number={page} />
        })}

        {(currentPage + siblingsCount) < lastPage && (
          <>
            {(currentPage + 1 + siblingsCount) < lastPage && <Text>...</Text>}
            <PaginationItem onPageChange={onChangePage} number={lastPage} />
          </>
        )}

      </Stack>
    </Stack>
  )
}