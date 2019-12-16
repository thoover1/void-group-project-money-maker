import React from 'react';

export default class Task extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            editTask: false,
            input: ''
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(prop, val) {
        this.setState({
          [prop]: val
        })
    };

    render(){
        const {editTask, input} = this.state;
        return(
            <div
                  className="task"
                  key={this.props.task_id}
                  {...this.props.provided.draggableProps}
                  {...this.props.provided.dragHandleProps}
                  ref={this.props.provided.innerRef}
                >
                  <div className='task-name-holder'>
                    <h1 className="task-name">{this.props.task_name}</h1>
                  </div>
                  <div className="task-buttons">
                  {editTask 
                  ? <div className='task-editor'>
                    <input onChange={(e) => {this.toggle('input', e.target.value)}} placeholder='Edit Task' />
                    <span>
                      <button onClick={() => this.toggle('editTask', !editTask)}>Cancel</button>
                      {input && <button onClick={() => {this.props.updateTask(this.props.task_id, this.state.input); this.toggle('editTask', !editTask)}}>Save</button>}
                    </span>
                    </div>
                   : <div className='task-holder'>
                      <button onClick={() => this.toggle('editTask', true)}>Edit</button>
                    </div>
                  }
                    <i
                      className="far fa-trash-alt"
                      onClick={() => this.props.deleteTask(this.props.task_id)} 
                    ></i>
                  </div>
                </div>
        )
    }
}