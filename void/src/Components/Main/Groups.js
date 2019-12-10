import React from "react";

export default function Groups(props) {
  return (
    <div>
      <button
        onClick={() => {
          this.props.handleSelectionClick();
        }}
      >
        <a>{this.props.groupie.group_name}</a>
      </button>
    </div>
  );
}
