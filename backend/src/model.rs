use serde::{Deserialize, Serialize};
use std::fs;
use std::io::{self};
use std::path::Path;

#[derive(Serialize, Deserialize, Clone)]
pub struct Task {
    pub id: usize,
    pub description: String,
    pub completed: bool,
}

#[derive(Deserialize)]
pub struct CreateTask {
    pub description: String,
}

pub fn save_tasks(tasks: &[Task], path: &str) -> io::Result<()> {
    let json = serde_json::to_string_pretty(tasks)?;
    fs::write(path, json)?;
    Ok(())
}

pub fn load_tasks(path: &str) -> io::Result<Vec<Task>> {
    if Path::new(path).exists() {
        let data = fs::read_to_string(path)?;
        let tasks = serde_json::from_str(&data).unwrap_or_default();
        Ok(tasks)
    } else {
        Ok(vec![])
    }
}
