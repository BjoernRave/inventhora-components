import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from '@material-ui/core'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import DeleteIcon from '@material-ui/icons/Delete'
import DocumentIcon from '@material-ui/icons/Description'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'

const DocumentViewer: FC<Props> = ({
  documents,
  onDelete,
  canDownload = true,
}) => {
  const { t } = useTranslation()

  return (
    <List>
      {documents.map((document, ind) => (
        <>
          <ListItem>
            <ListItemAvatar>
              <DocumentIcon />
            </ListItemAvatar>
            <ListItemText>{document.name}</ListItemText>

            <ListItemSecondaryAction>
              {canDownload && (
                <Tooltip
                  title={t('common:downloadTitle', {
                    name: t('common:document'),
                  })}>
                  <a href={document.url} download>
                    <IconButton>
                      <DownloadIcon />
                    </IconButton>
                  </a>
                </Tooltip>
              )}
              {onDelete && (
                <Tooltip
                  title={t('common:deletionTitle', {
                    name: t('common:document'),
                  })}>
                  <IconButton onClick={() => onDelete(document)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </ListItemSecondaryAction>
          </ListItem>
          {ind !== documents.length - 1 && <Divider />}
        </>
      ))}
    </List>
  )
}

export default DocumentViewer

interface Props {
  documents: { url: string; name?: string; description?: string }[]
  onDelete?: (document: any) => void
  canDownload?: boolean
}
