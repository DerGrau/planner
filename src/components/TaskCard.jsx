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
        <div className="task-title">
          <strong>{task.title}</strong>
          <hr />
        </div>

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
        </div>

        {task.notes && <div className="task-notes">{task.notes}</div>}
      </div>

      <div className="task-right">
        <div className="states">
          <span className="task-expired">
            {isExpired === true ? "просрочено" : ""}
          </span>
          <span className="subject">{task.subject}</span>
        </div>

        <div className="actions">
          <button onClick={() => onEdit(task)}>Изменить</button>
          <button className="delete-button" onClick={() => onDelete(task)}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
