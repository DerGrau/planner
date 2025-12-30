export default function Stats({ tasks }) {
  return (
    <div className="stats">
      <div>Всего: {tasks.length}</div>
      <div>Готово: {tasks.filter((t) => t.done).length}</div>
      <div>
        Просрочено:{" "}
        {
          tasks.filter(
            (t) => t.due_date && !t.done && new Date(t.due_date) < new Date()
          ).length
        }
      </div>
      <div>
        Ближайший срок:{" "}
        {(() => {
          const nextTask = tasks
            .filter(
              (t) => t.due_date && !t.done && new Date(t.due_date) > new Date()
            )
            .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))[0];

          return nextTask
            ? new Date(nextTask.due_date).toLocaleDateString("ru-RU")
            : "—";
        })()}
      </div>
    </div>
  );
}
