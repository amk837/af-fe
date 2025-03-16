export const ArticleCard = ({ article, onEdit, onDelete }) => (
  <div className="flex-col gap-2">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800 text-left">{article.title}</h2>
      <div className="space-x-2">
        <button
          className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
    <p className="text-gray-600 mt-2 text-left">{article.description}</p>
  </div>
)
