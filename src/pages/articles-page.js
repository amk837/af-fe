import { useEffect, useState, useCallback } from "react";
import makeRequest from "../utils/request.js";
import { ArticleCard } from "../components/article-card.js";
import { ArticleForm } from "../components/article-form.js";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(null);
  const [summary, setSummary] = useState(null);
  const [summarizing, setSummarizing] = useState(null);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  const fetchArticles = useCallback(async () => {
    try {
      const response = await makeRequest("/articles/");
      if (!response.success) {
        throw new Error("Failed to fetch articles");
      }
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleOpenForm = (article = null) => () => {
    setEditingArticle(article);
    setTitle(article ? article.title : "");
    setDescription(article ? article.description : "");
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingArticle(null);
    setTitle("");
    setDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const method = editingArticle ? "PUT" : "POST";
    const url = `/articles/${editingArticle ? editingArticle._id : ""}`;
    try {
      const response = await makeRequest(url, {
        options: {
          method,
          body: { title, description },
        },
      });
      if (response.success) {
        showMessage(editingArticle ? "Article updated successfully" : "Article created successfully");
        fetchArticles();
        handleCloseForm();
      }
    } catch (error) {
      showMessage("Failed to process request");
      console.error("Error submitting article:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => async () => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      const response = await makeRequest(`/articles/${id}`, {
        options: { method: "DELETE" },
      });
      if (response.success) {
        showMessage("Article deleted successfully");
        fetchArticles();
      }
    } catch (error) {
      showMessage("Failed to delete article");
      console.error("Error deleting article:", error);
    }
  };

  const handleSummarize = (id) => async () => {
    setSummarizing(id);
    setSummary(null);
    try {
      const response = await makeRequest(`/articles/${id}/summarize`, {
        options: { method: "POST" },
      });
      if (response.success) {
        setSummary(response.data.summary);
        setSummaryModalOpen(true);
      } else {
        showMessage("Failed to summarize article");
      }
    } catch (error) {
      showMessage("Error summarizing article");
      console.error("Error summarizing article:", error);
    } finally {
      setSummarizing(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 shadow-lg rounded-lg relative">
      {message && (
        <div className="absolute top-4 right-4 p-3 bg-green-600 text-white rounded shadow-lg">
          {message}
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Articles</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow-md"
        onClick={handleOpenForm()}
      >
        Add Article
      </button>
      {formOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-50 p-8 rounded-lg shadow-2xl w-[600px] h-[400px] border border-gray-300">
            <ArticleForm 
              description={description} 
              editingArticle={editingArticle}
              loading={loading}
              onClose={handleCloseForm}
              onSubmit={handleSubmit}
              setDescription={setDescription}
              setTitle={setTitle}
              title={title}
            />
          </div>
        </div>
      )}
      {summaryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-[500px]">
            <h2 className="text-lg font-bold mb-4">Summary</h2>
            <p className="text-gray-700">{summary}</p>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={() => setSummaryModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
      {articles.length ? (
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article._id} className="p-6 bg-white rounded-lg shadow-lg border border-gray-300">
              <ArticleCard
                article={article}
                onDelete={handleDelete(article._id)}
                onEdit={handleOpenForm(article)}
                onSummarize={handleSummarize(article._id)}
                summarizing={summarizing === article._id}
              />
            </li>
          ))}
        </ul>
      ) : null}
      {loading ? <p className="text-center text-gray-500">Loading...</p> : null}
    </div>
  );
}
