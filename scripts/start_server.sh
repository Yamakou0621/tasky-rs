ESSION_NAME="my_session"

tmux has-session -t $SESSION_NAME 2>/dev/null

if [ $? != 0 ]; then
    echo "Creating new tmux session..."
    tmux new-session -d -s $SESSION_NAME

    echo "Starting backend server..."
    tmux send-keys -t $SESSION_NAME 'cd backend && cargo run' C-m

    tmux split-window -h

    echo "Starting frontend server..."
    tmux send-keys -t $SESSION_NAME 'cd frontend && npm run dev' C-m
fi

tmux select-pane -t 0

tmux attach -t $SESSION_NAME

echo "Both frontend and backend servers are running in separate tmux panes (left for backend, right for frontend)."
