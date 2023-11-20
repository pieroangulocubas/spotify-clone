import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { artistid } = useParams();

  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery({ artistid });
  if (isFetchingArtistDetails) return <Loader title="Searching song details" />;
  if (error) return <Error />;
  return (
    <div>
      <div className="flex flex-col mb-10">
        <DetailsHeader artistId={artistid} artistData={artistData} />
      </div>

      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistid}
      />
    </div>
  );
};

export default ArtistDetails;
