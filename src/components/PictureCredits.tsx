import React from 'react'
import { Link, Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    fontStyle: 'italic',
  },
}))
const PictureCredit = () => {
  const css = useStyles()
  return (
    <Box display="flex" alignItems="center" mb={2} className={css.root}>
      Photo by&nbsp;
      <Link
        color="inherit"
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        href="https://unsplash.com/@stayandroam?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
      >
        Gemma Evans
      </Link>
      &nbsp;on&nbsp;
      <Link
        color="inherit"
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        href="/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
      >
        Unsplash
      </Link>
    </Box>
  )
}

export default PictureCredit
