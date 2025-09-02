import { PenSquare, TrashIcon } from "lucide-react"
import { Link } from "react-router"
import api from "../lib/axios"
import toast from "react-hot-toast"

const NoteCard = ({ note, onDelete, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault() // prevent navigation
    if (!window.confirm("Are you sure you want to delete this note?")) return

    try {
      await api.delete(`/notes/${id}`)
      onDelete?.(id) // update parent state
      toast.success("Note deleted successfully")
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== id)) // Update local state
    } catch (error) {
      console.error("Error deleting note:", error)
      if (error.response?.status === 404) {
        toast.error("Note not found")
      } else {
        toast.error("Failed to delete note. Please try again.")
      }
    }
  }

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow duration-300 border-[#00FF9D] border-2"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">
          {note.content
            ? note.content.substring(0, 120) +
              (note.content.length > 120 ? "..." : "")
            : "No content available"}
        </p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {note.createdAt
              ? new Date(note.createdAt).toLocaleDateString()
              : "Unknown date"}
          </span>
          <div className="flex items-center gap-2">
            <PenSquare className="size-4 cursor-pointer" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <TrashIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
