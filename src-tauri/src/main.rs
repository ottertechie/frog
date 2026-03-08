//! Frog Tauri shell entry point.
//! Launches a desktop window that hosts the React frontend.

fn main() {
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running Frog desktop shell");
}
