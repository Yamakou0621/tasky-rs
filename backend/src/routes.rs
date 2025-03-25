use crate::model::{CreateTask, Task, save_tasks};
use axum::{
    Json,
    extract::{Path, State},
};
use http::StatusCode;
use std::sync::{Arc, Mutex};

type SharedTasks = Arc<Mutex<Vec<Task>>>;

// GET /tasks - タスク一覧を取得
pub async fn get_tasks(State(tasks): State<SharedTasks>) -> Json<Vec<Task>> {
    let tasks = tasks.lock().unwrap();
    Json(tasks.clone())
}

// POST /tasks - 新しいタスクを追加
pub async fn create_task(
    State(tasks): State<SharedTasks>,
    Json(payload): Json<CreateTask>,
) -> Json<Task> {
    let mut tasks = tasks.lock().unwrap();
    let new_id = tasks.len() + 1;

    let new_task = Task {
        id: new_id,
        description: payload.description,
        completed: false,
    };

    tasks.push(new_task.clone());
    save_tasks(&tasks, "tasks.json").expect("保存に失敗");
    Json(new_task)
}
pub async fn toggle_task_completed(
    Path(id): Path<usize>,
    State(tasks): State<SharedTasks>,
) -> Result<Json<Task>, StatusCode> {
    let mut tasks = tasks.lock().unwrap();

    if let Some(task) = tasks.iter_mut().find(|t| t.id == id) {
        task.completed = !task.completed;
        let cloned_task = task.clone();

        if let Err(e) = save_tasks(&tasks, "tasks.json") {
            eprintln!("保存に失敗: {}", e);
        }

        Ok(Json(cloned_task))
    } else {
        Err(StatusCode::NOT_FOUND)
    }
}
