export const ArticleCard = ({ article, onEdit, onDelete, summarizing, onSummarize, onGenerateEmbedding, embedding }) => (
  <div className="space-y-4">
    <div className="space-x-2 flex-1 flex justify-end items-center">
      <button
        className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded"
        onClick={onEdit}
      >
        Edit
      </button>
      <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded" onClick={onSummarize}>
        {summarizing ? "Summarizing..." : "Summarize"}
      </button>
      <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white font-semibold rounded" onClick={onGenerateEmbedding}>
        {embedding ? "Generating..." : "Generate Embedding"}
      </button>
      <button
        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
    <div className="flex justify-between items-center gap-2">
      <h2 className="text-xl font-semibold text-gray-800 text-left">{article.title}</h2>
    </div>
    <p className="text-gray-600 mt-2 text-left">{article.description}</p>
  </div>
);
