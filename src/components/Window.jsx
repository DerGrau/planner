export default function Window({
  editing,
  subject,
  title,
  notes,
  priority,
  dueDate,
  setSubject,
  setTitle,
  setNotes,
  setPriority,
  setDueDate,
  onSave,
  onCancel,
}) {
  return (
    <aside className="planner-left">
      <h3>{editing ? "Редактировать задачу" : "Добавить задачу"}</h3>

      <div className="field">
        <label>Предмет</label>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>

      <div className="field">
        <label>Название</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="row">
        <div className="field">
          <label>Срок</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Приоритет</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label>Заметки</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      <div className="form-actions">
        <button className="primary" onClick={onSave}>
          {editing ? "Сохранить" : "Добавить"}
        </button>
        <button className="secondary" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </aside>
  );
}
