import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import "../components/Planner.css";
import Tasks from "./Tasks";
import Window from "./Window";
import Stats from "./Stats";
import Header from "./Header";

export default function Planner() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(null);
  const [view, setView] = useState("all");
  const [query, setQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState("");

  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const { data } = await supabase.auth.getUser();
      if (!data.user) return;

      setUser(data.user);

      const { data: tasksData, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", data.user.id)
        .order("done", { ascending: true })
        .order("due_date", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (error) console.error(error);

      setTasks(tasksData || []);
      setLoading(false);
    };

    load();
  }, []);

  async function handleSave() {
    if (!title || !subject) return;

    if (editing) {
      const { data } = await supabase
        .from("tasks")
        .update({
          subject,
          title,
          notes,
          priority,
          due_date: dueDate || null,
        })
        .eq("id", editing.id)
        .select()
        .single();

      setTasks((prev) => prev.map((t) => (t.id === data.id ? data : t)));
    } else {
      const { data } = await supabase
        .from("tasks")
        .insert({
          user_id: user.id,
          subject,
          title,
          notes,
          priority,
          due_date: dueDate || null,
        })
        .select()
        .single();

      setTasks((prev) => [data, ...prev]);
    }

    resetForm();
  }

  async function handleDelete(task) {
    if (!window.confirm("Удалить задачу?")) return;
    await supabase.from("tasks").delete().eq("id", task.id);
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  }

  async function toggleDone(task) {
    const { data } = await supabase
      .from("tasks")
      .update({ done: !task.done })
      .eq("id", task.id)
      .select()
      .single();

    setTasks((prev) => {
      const rest = prev.filter((t) => t.id !== task.id);

      if (!task.done) {
        return [...rest, data];
      }

      return [data, ...rest];
    });
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  function resetForm() {
    setEditing(null);
    setSubject("");
    setTitle("");
    setNotes("");
    setPriority("medium");
    setDueDate("");
  }

  function handleEdit(task) {
    setEditing(task);
    setSubject(task.subject);
    setTitle(task.title);
    setNotes(task.notes || "");
    setPriority(task.priority);
    setDueDate(task.due_date || "");
  }

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="planner">
      <Header user={user} onLogout={handleLogout} />
      <Stats tasks={tasks} />

      <div className="content">
        <Window
          editing={editing}
          subject={subject}
          title={title}
          notes={notes}
          priority={priority}
          dueDate={dueDate}
          setSubject={setSubject}
          setTitle={setTitle}
          setNotes={setNotes}
          setPriority={setPriority}
          setDueDate={setDueDate}
          onSave={handleSave}
          onCancel={resetForm}
        />
        <Tasks
          tasks={tasks}
          onToggleDone={toggleDone}
          onEdit={handleEdit}
          onDelete={handleDelete}
          view={view}
          setView={setView}
          query={query}
          setQuery={setQuery}
          filterSubject={filterSubject}
          setFilterSubject={setFilterSubject}
        />
      </div>
    </div>
  );
}
