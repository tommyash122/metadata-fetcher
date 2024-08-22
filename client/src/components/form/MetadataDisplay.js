import DOMPurify from 'dompurify';

function MetadataDisplay({ metadata }) {
  return (
    <div>
      {metadata.map((data, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-bold mb-2">{DOMPurify.sanitize(data.title)}</h3>
          <p className="mb-4">{DOMPurify.sanitize(data.description)}</p>
          {data.image && (
            <img
              src={DOMPurify.sanitize(data.image)}
              alt={`Thumbnail for ${data.title}`}
              className="max-w-full h-auto max-h-80 object-cover border-4 border-gray-300 rounded-lg shadow-lg"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default MetadataDisplay;
