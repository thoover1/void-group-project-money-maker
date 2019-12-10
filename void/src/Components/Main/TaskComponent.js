import React from "react";

export default function TaskComponent(props) {
  return (
    <div className="tasks-container">
      <div className="tasks">
        <h5 className="task_name">
          {/* hello */}
        {props.allTasks.task_name}
        </h5>
        <i class="far fa-edit"></i>
      </div>
    </div>
  );
}
