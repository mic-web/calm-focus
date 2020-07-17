import React from 'react'
import { Link, Box, Typography, SvgIcon } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

const Credits = () => {
  return (
    <>
      <Box display="flex" alignItems="center" mb={2}>
        <SvgIcon>
          <InfoIcon />
        </SvgIcon>
        <Box ml={2}>
          <Typography variant="h5">Info</Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="body1" component="div">
          Documentation and more infos:&nbsp;
          <Link
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            underline="always"
            href="https://github.com/mic-web/calm-focus/blob/master/README.md"
          >
            here
          </Link>
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="body1" component="div">
          Source code:&nbsp;
          <Link
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            underline="always"
            href="https://github.com/mic-web/calm-focus"
          >
            on GitHub
          </Link>
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="body1" component="div">
          Author of this application:&nbsp;
          <Link
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            underline="always"
            href="https://github.com/mic-web"
          >
            Michael Adlfinger
          </Link>
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" component="div">
          Author of the background image:&nbsp;
          <Link
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            underline="always"
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
            underline="always"
            href="/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
          >
            Unsplash
          </Link>
        </Typography>
      </Box>
    </>
  )
}

export default Credits
