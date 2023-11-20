import SongBar from './SongBar';

const RelatedSongs = ({ data, activeSong, artistId, handlePauseClick, isPlaying, handlePlayClick }) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
    <div className="mt-6 w-full flex flex-col">
      {data?.map((song, i) => (
        <SongBar
          key={`${song.key}`}
          song={song}
          i={i}
          activeSong={activeSong}
          isPlaying={isPlaying}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
          artistId={artistId}
        />
      ))}
    </div>
  </div>

);

export default RelatedSongs;
