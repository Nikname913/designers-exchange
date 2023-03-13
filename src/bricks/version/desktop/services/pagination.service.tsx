import React from 'react'
import { IPagination } from '../../../models-ts/services/pagination-models'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setPage } from '../../../store/slices/pagination-slice'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const Pagintation: React.FC<IPagination> = (props: IPagination) => {
  
  const { count } = props

  const dispatch = useAppDispatch()
  const paginationPage = useAppSelector(state => state.paginationReducer.page)
  const selectPage = (event: React.ChangeEvent<unknown>, value: number) => dispatch(setPage(value))

  return(
    <React.Fragment>
      <Stack spacing={2}>
        <Pagination count={count ? count : 10} shape="rounded" page={paginationPage} onChange={selectPage} />
      </Stack>
    </React.Fragment>
  )

}

export default Pagintation