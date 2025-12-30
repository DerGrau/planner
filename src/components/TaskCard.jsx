export default function TaskCard({ task, onToggleDone, onEdit, onDelete }) {
  const isExpired =
    !task.done && task.due_date && new Date(task.due_date) < new Date();

  return (
    <div className={`task-card ${task.done ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggleDone(task)}
      />

      <div className="task-main">
        <strong>{task.title}</strong>

        <div className="task-meta">
          <span>
            {task.due_date
              ? new Date(task.due_date).toLocaleDateString("ru-RU")
              : "без срока"}
          </span>
          <span>•</span>
          <span className={`priority ${task.priority}`}>
            {task.priority === "low"
              ? "низкий"
              : task.priority === "medium"
              ? "средний"
              : "высокий"}
          </span>
          <span>{isExpired === true ? "•" : ""}</span>
          <span className="task-expired">
            {isExpired === true ? "просрочено" : ""}
          </span>
        </div>

        {task.notes && <div className="task-notes">{task.notes}</div>}
      </div>

      <div className="task-right">
        <span className="subject">{task.subject}</span>

        <div className="actions">
          <button onClick={() => onEdit(task)}>Изменить</button>
          <button className="delete-buttone" onClick={() => onDelete(task)}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
