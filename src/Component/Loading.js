import Backdrop from '@mui/material/Backdrop'

export default function Loading({isLoading}) {

  return (
    <Backdrop sx={{ color: '#fff', zIndex: 9999 }} open={isLoading} id='loading-progress'>
      <GiftLoading/>
    </Backdrop>
  )
}

export const GiftLoading = () => {
  return <img src='/images/loading.gif' alt='Loading' width={400} />
}
