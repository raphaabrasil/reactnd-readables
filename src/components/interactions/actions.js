export const SORT = 'SORT'

export const updateSort = sort => dispatch => {
  dispatch(
    {
      type: SORT,
      sort,
    }
  )
}
