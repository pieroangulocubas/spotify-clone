import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((store) => store.player);
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
  const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery({ songid });
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching song details" />;
  if (error) return <Error />;
  return (
    <div>
      <div className="flex flex-col mb-10">
        <DetailsHeader songData={songData} />
        <div className="mt-10">
          <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
          <div className="mt-5">
            {
              songData?.sections[1].type === 'LYRICS' ? songData?.sections[1].text.map((line, i) => (
                <p key={i} className="text-gray-400 text-base my-1">{line}</p>
              ))
                : <p className="text-gray-400 text-base my-1">Sorry, no lyrics found!</p>
            }
          </div>
        </div>
      </div>
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
