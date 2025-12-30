import TaskCard from "./TaskCard";

export default function Tasks({
  tasks,
  onToggleDone,
  onEdit,
  onDelete,
  view,
  setView,
  query,
  setQuery,
  filterSubject,
  setFilterSubject,
}) {
  const now = new Date();
  const filteredTasks = tasks.filter((task) => {
    if (query && !task.title.toLowerCase().includes(query.toLowerCase()))
      return false;
    if (filterSubject && task.subject !== filterSubject) return false;
    if (view === "done") return task.done;
    if (view === "today") {
      if (!task.due_date) return false;
      return new Date(task.due_date).toDateString() === now.toDateString();
    }
    if (view === "week") {
      if (!task.due_date) return false;
      const diff = (new Date(task.due_date) - now) / 86400000;
      return diff >= 0 && diff <= 7;
    }
    return !task.done || view === "all";
  });

  return (
    <main className="planner-right">
      {/*Фильтры*/}
      <div className="filters">
        <div className="tabs">
          {[
            ["all", "Все"],
            ["today", "Сегодня"],
            ["week", "Неделя"],
            ["done", "Выполнено"],
          ].map(([k, l]) => (
            <button
              key={k}
              className={`tab ${view === k ? "active" : ""}`}
              onClick={() => setView(k)}
            >
              {l}
            </button>
          ))}
        </div>
        <input
          placeholder="Поиск по названию..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          placeholder="Фильтр по предмету..."
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
        />
      </div>

      {/*Задачи*/}
      <div className="task-list">
        {filteredTasks.length === 0 && <div className="empty">Задач нет</div>}

        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleDone={onToggleDone}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </main>
  );
}
