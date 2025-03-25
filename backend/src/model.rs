use serde::{Deserialize, Serialize};

#[derive(Serialize, Clone)]
pub struct Task {
    pub id: usize,
    pub description: String,
    pub completed: bool,
}

#[derive(Deserialize)]
pub struct CreateTask {
    pub description: String,
}
