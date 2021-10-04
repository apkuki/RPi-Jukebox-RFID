import React, { useContext, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

import PlayerContext from '../../context/player/context';
import { getMusicCoverByFilenameAsBase64 } from '../../utils/requests';
import { pluginIsLoaded } from '../../utils/utils';

const Cover = () => {
  const { state } = useContext(PlayerContext);
  const { playerstatus, 'core.plugins.loaded': plugins } = state;
  const { file } = playerstatus || {};

  const [coverImage, setCoverImage] = useState(undefined);

  useEffect(() => {
    const getMusicCover = async () => {
      const { result } = await getMusicCoverByFilenameAsBase64(file);
      if (result) setCoverImage(result);
    }

    if (pluginIsLoaded(plugins, 'music_cover_art') && file) {
      getMusicCover();
    }
  }, [file, plugins]);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Paper
        elevation={3}
        sx={{
          width: '70%',
          position: 'relative',
          paddingBottom: '70%',
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          {coverImage &&
            <img
              alt="Cover"
              src={`data:image/jpeg;base64,${coverImage}`}
              style={{ width: '100%', height: '100%' }}
            />}
          {!coverImage && <MusicNoteIcon style={{ fontSize: 75 }} />}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Cover;
