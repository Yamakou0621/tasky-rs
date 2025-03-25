use axum::{Json, Router, extract::State, routing::get};
use http::{HeaderName, Method};
use std::{
    net::SocketAddr,
    sync::{Arc, Mutex},
};
use tower_http::cors::{Any, CorsLayer};

mod model;
use model::{CreateTask, Task};

type SharedTasks = Arc<Mutex<Vec<Task>>>;

#[tokio::main]
async fn main() {
    // 初期状態のタスクリスト（空）
    let tasks: SharedTasks = Arc::new(Mutex::new(vec![]));

    // ルーティング定義
    let app = Router::new()
        .route("/tasks", get(get_tasks).post(create_task))
        .with_state(tasks.clone())
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_methods([Method::GET, Method::POST])
                .allow_headers([HeaderName::from_static("content-type")]),
        );

    // サーバー起動
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Listening on http://{}", addr);
    axum::serve(tokio::net::TcpListener::bind(addr).await.unwrap(), app)
        .await
        .unwrap();
}

// GET /tasks - タスク一覧を取得
async fn get_tasks(State(tasks): State<SharedTasks>) -> Json<Vec<Task>> {
    let tasks = tasks.lock().unwrap();
    Json(tasks.clone())
}

// POST /tasks - 新しいタスクを追加
async fn create_task(
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
    Json(new_task)
}
