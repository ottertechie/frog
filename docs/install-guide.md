# Install Guide (Linux)

## 1) System prerequisites
- Git
- curl
- build tools (`build-essential`, etc.)

## 2) Install Node.js + npm
- Recommended: Node 20 LTS.
- Verify:
  - `node -v`
  - `npm -v`

## 3) Install Rust + Cargo
- `curl https://sh.rustup.rs -sSf | sh`
- Restart shell, then verify: `rustc --version` and `cargo --version`

## 4) Install Tauri Linux packages
Install distro-specific prerequisites from Tauri docs (WebKitGTK, libsoup, GTK3 dev packages).

## 5) Install Ollama
- Follow https://ollama.com/download/linux
- Verify: `ollama --version`

## 6) Start Ollama service
- `ollama serve`

## 7) Pull at least one model
- `ollama pull llama3.2`

## 8) Install Frog project dependencies
From repository root:
- `npm install`
