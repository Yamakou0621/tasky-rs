use axum::{
    Router,
    routing::{get, patch},
};
use http::{HeaderName, Method};
use std::{
    net::SocketAddr,
    sync::{Arc, Mutex},
};
use tower_http::cors::{Any, CorsLayer};

mod model;
use model::load_tasks;

mod routes;
use routes::{create_task, get_tasks, toggle_task_completed};

#[tokio::main]
async fn main() {
    let tasks_file = "tasks.json";

    let initial_tasks = load_tasks(tasks_file).unwrap_or_default();
    let tasks = Arc::new(Mutex::new(initial_tasks));

    // ルーティング定義
    let app = Router::new()
        .route("/tasks", get(get_tasks).post(create_task))
        .route("/tasks/:id", patch(toggle_task_completed))
        .with_state(tasks.clone())
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_methods([Method::GET, Method::POST, Method::PATCH])
                .allow_headers([HeaderName::from_static("content-type")]),
        );

    // サーバー起動
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Listening on http://{}", addr);
    axum::serve(tokio::net::TcpListener::bind(addr).await.unwrap(), app)
        .await
        .unwrap();
}
