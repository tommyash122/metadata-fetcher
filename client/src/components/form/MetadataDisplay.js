import DOMPurify from 'dompurify';

function MetadataDisplay({ metadata }) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {metadata.map((data, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="p-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">{DOMPurify.sanitize(data.title)}</h3>
            <p className="text-gray-600 mb-4">{DOMPurify.sanitize(data.description)}</p>
          </div>
          {data.image && (
            <img
              src={DOMPurify.sanitize(data.image)}
              alt={`Thumbnail for ${data.title}`}
              className="w-full h-auto max-h-60 object-cover border-t border-gray-200"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default MetadataDisplay;
