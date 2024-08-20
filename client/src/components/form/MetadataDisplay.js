import DOMPurify from 'dompurify';

function MetadataDisplay({ metadata }) {
  return (
    <div>
      {metadata.map((data, index) => (
        <div key={index}>
          <h3>{DOMPurify.sanitize(data.title)}</h3>
          <p>{DOMPurify.sanitize(data.description)}</p>
          {data.image && <img src={DOMPurify.sanitize(data.image)} alt={`Thumbnail for ${data.title}`} />}
        </div>
      ))}
    </div>
  );
}

export default MetadataDisplay;
