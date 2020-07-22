import { Backdrop } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import React, { FC, useState } from 'react'
import styled, { css } from 'styled-components'

const PreviewsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const UploadPreview = styled.img`
  height: 180px;
  width: auto;
`

const StyledIcon = styled(DeleteIcon)`
  position: absolute !important;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 35px;
  height: 35px;
  opacity: 0;
  transition: all linear 0.2s;
  z-index: 2;
`

const hoverStyles = css`
  :hover {
    ${StyledIcon} {
      opacity: 1;
    }
    ::after {
      opacity: 0.4;
    }
  }
`

const PreviewWrapper = styled.div<{ isdeleting: number }>`
  position: relative;
  cursor: pointer;
  transition: all linear 0.2s;
  margin: 10px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 10px;

  ::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #3c9f80;
    opacity: 0;
    transition: all 0.2s;
    border-radius: 10px;
  }

  ${({ isdeleting }) => isdeleting === 1 && hoverStyles};
`

const FullScreenImage = styled.img`
  position: fixed;
  width: auto;
  height: 95%;
  top: 2.5%;
`

const ImageViewer: FC<Props> = ({ images, onDelete }) => {
  const [isFullScreen, setIsFullScreen] = useState(null)
  return (
    <>
      <PreviewsWrapper>
        {images.map((image, index) => (
          <PreviewWrapper
            isdeleting={onDelete ? 1 : 0}
            onClick={() =>
              onDelete ? onDelete(image) : setIsFullScreen(image)
            }
            key={index}>
            <UploadPreview
              src={image?.name ? URL.createObjectURL(image) : image.url}
            />

            {onDelete && <StyledIcon fontSize='large' />}
          </PreviewWrapper>
        ))}
      </PreviewsWrapper>
      {isFullScreen && (
        <Backdrop
          style={{ margin: 0, zIndex: 99999 }}
          onClick={() => setIsFullScreen(null)}
          open>
          <FullScreenImage
            src={
              isFullScreen?.name
                ? URL.createObjectURL(isFullScreen)
                : isFullScreen.url
            }
          />
        </Backdrop>
      )}
    </>
  )
}

export default ImageViewer

interface Props {
  images: { url: string; name?: string }[]
  onDelete?: (image: any) => void
}
