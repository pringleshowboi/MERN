import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch note details
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else if (error.response?.status === 404) {
          toast.error("Note not found");
          navigate("/");
        } else {
          toast.error("Failed to fetch note");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and Content cannot be empty");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/"); // navigate back to home page
    } catch (error) {
      toast.error("Failed to update note");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (isRateLimited) return <div>You are being rate limited. Please try again later.</div>;

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-2xl mx-auto bg-base-100 p-6 rounded-lg shadow-md">
        <Link to="/" className="btn btn-ghost mb-4 flex items-center">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Notes
        </Link>

        <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </div>

          {/* Content */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={6}
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Link to="/" className="btn btn-ghost">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteDetailPage;
