    SESSION_NAME="my_session"

# すでにセッションが存在するか確認し、存在する場合はそのセッションを再利用
tmux has-session -t $SESSION_NAME 2>/dev/null

# セッションが存在しない場合のみ新規作成
if [ $? != 0 ]; then
    echo "Creating new tmux session..."
    tmux new-session -d -s $SESSION_NAME  # 新しいセッションを非同期で作成

    # 左側のペインでバックエンドサーバーを起動
    echo "Starting backend server..."
    tmux send-keys -t $SESSION_NAME 'cd backend && cargo run' C-m  # コマンドを送信

    # ターミナルを横に分割
    tmux split-window -h

    # 右側のペインでフロントエンドサーバーを起動
    echo "Starting frontend server..."
    tmux send-keys -t $SESSION_NAME 'cd frontend && npm run dev' C-m  # コマンドを送信
fi

# ターミナルを選択状態に戻す
tmux select-pane -t 0  # 左側のペインに戻す

# セッションをアタッチしてターミナル操作を開始
tmux attach -t $SESSION_NAME

echo "Both frontend and backend servers are running in separate tmux panes (left for backend, right for frontend)."
