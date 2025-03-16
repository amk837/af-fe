export const ArticleForm = ({
  loading,
  onClose,
  onSubmit,
  title,
  setTitle,
  description,
  setDescription,
  editingArticle,
}) => (
  <>
    <h2 className="text-xl font-semibold mb-4 text-gray-700">{editingArticle ? "Edit Article" : "Create Article"}</h2>
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-4 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-4 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 h-40"
        required
      />
      <div className="flex justify-between">
        <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded" disabled={loading}>
          {loading ? "Processing..." : editingArticle ? "Update" : "Create"}
        </button>
        <button type="button" className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  </>
)
