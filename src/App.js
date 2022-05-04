import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import { ReactComponent as AddIcon } from "../src/assets/icons/add.svg";
import { ReactComponent as ListIcon } from "../src/assets/icons/list.svg";
import { ReactComponent as TrashIcon } from "../src/assets/icons/trash.svg";
import { ReactComponent as RadioIcon } from "../src/assets/icons/emptyRadio.svg";
import { ReactComponent as CheckedRadioIcon } from "../src/assets/icons/checkedRadio.svg";
import LoadingIcon from "./LoadingIcon";

const GET_TODOS = gql`
  query GetTodos {
    Todos {
      done
      id
      text
      date
    }
  }
`;
const TOGGLE_TODO = gql`
  mutation toggleTodo($id: uuid!, $done: Boolean!) {
    update_Todos(where: { id: { _eq: $id } }, _set: { done: $done }) {
      returning {
        done
        id
        text
      }
    }
  }
`;
const ADD_TODO = gql`
  mutation addTodo($text: String!, $date: timestamptz!) {
    insert_Todos(objects: { text: $text, date: $date }) {
      returning {
        done
        text
        id
      }
    }
  }
`;
const DELETE_TODO = gql`
  mutation deleteTodo($id: uuid!) {
    delete_Todos(where: { id: { _eq: $id } }) {
      returning {
        done
        id
        text
      }
    }
  }
`;
function App() {
  const inputRef = useRef();
  const [isCompleted, setIsCompleted] = useState(true);
  const { data, loading, error } = useQuery(GET_TODOS);

  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const handleToggleTodo = ({ id, done }) => {
    toggleTodo({ variables: { id, done: !done } });
  };

  const [addTodo] = useMutation(ADD_TODO, {
    onCompleted: () => {
      inputRef.current.value = "";
      setIsCompleted(true);
    },
  });
  async function handleAddTodo() {
    console.log(isCompleted);
    if (!isCompleted) return;
    if (!inputRef.current.value.trim()) return;
    setIsCompleted(false);
    await addTodo({
      variables: { text: inputRef.current.value.trim(), date: new Date() },
      refetchQueries: [{ query: GET_TODOS }],
    });
  }
  const [deleteTodo] = useMutation(DELETE_TODO, {
    onCompleted: () => {
      setIsCompleted(true);
    },
  });
  async function handleDeleteTodo({ id }) {
    if (!isCompleted) return;
    setIsCompleted(false);
    await deleteTodo({
      variables: { id },
      update: (cache) => {
        //update the cache manually in order to prevent another http request
        const prevData = cache.readQuery({ query: GET_TODOS });
        const newData = prevData.Todos.filter((todo) => todo.id !== id);
        cache.writeQuery({ query: GET_TODOS, data: { Todos: newData } });
      },
    });
  }

  return (
    <div style={{ minWidth: "350px", padding: "20px" }}>
      <div style={classes.mainWrapper}>
        <ListIcon style={{ width: "80px", height: "80px" }} />
        <h2 style={{ color: "#47456D", marginBottom: "8px" }}>Add new Task</h2>
        <p style={{ color: "#AFAFAF", textAlign: "center", margin: 0 }}>
          Be productive today, and lets make some wonderful world with it.
        </p>
        {/* Add todo */}
        <div style={classes.inputWrapper}>
          <input
            type="text"
            placeholder="Add new todo..."
            style={classes.textInput}
            ref={inputRef}
          />
          <AddIcon
            onClick={handleAddTodo}
            style={{ width: "24px", height: "24px", cursor: "pointer" }}
          />
        </div>
        {/* todo list */}
        <div
          style={{
            width: "318px",
            boxSizing: "border-box",
          }}
        >
          {loading ? (
            <LoadingIcon />
          ) : error ? (
            <>Error fetching data</>
          ) : (
            data.Todos.map((todo, index) => {
              return (
                <div
                  key={todo.id}
                  style={{
                    ...classes.todoItem,
                    borderLeft:
                      index % 2 === 0
                        ? "8px solid #8D8AB9"
                        : "8px solid #B2E0DA",
                  }}
                >
                  <div
                    style={classes.checkboxWrapper}
                    onClick={() => {
                      handleToggleTodo(todo);
                    }}
                  >
                    <RadioIcon
                      style={{
                        ...classes.checkbox,
                        display: todo.done && "none",
                      }}
                    />
                    <CheckedRadioIcon
                      style={{
                        ...classes.checkbox,
                        display: !todo.done && "none",
                      }}
                    />
                    <p
                      style={{
                        margin: 0,
                        color: "#47456D",
                        textDecoration: todo.done && "line-through",
                      }}
                    >
                      {todo.text}
                    </p>
                  </div>
                  <TrashIcon
                    style={classes.deleteBtn}
                    onClick={() => {
                      handleDeleteTodo(todo);
                    }}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
const classes = {
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    minHeight: "800px",
    backgroundColor: "#FCEEEC",
    borderRadius: "25px",
    padding: "24px",
    boxSizing: "border-box",
    overflow: "hidden",
    userSelect: "none",
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    MsUserSelect: "none",
  },
  todoItem: {
    display: "flex",
    minHeight: "40px",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "16px",
    padding: "8px 8px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    backgroundColor: "#FFF",
    borderRadius: "10px",
  },
  deleteBtn: {
    color: "#C98A96",
    backgroundColor: "transparent",
    border: 0,
    padding: 0,
    marginTop: "5px",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    minWidth: "24px",
  },
  checkboxWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    maxWidth: "80%",
  },
  textInput: {
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    outline: "none",
    color: "#47456D",
    fontSize: "15px",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    width: "318px",
    padding: "16px",
    backgroundColor: "#FFF",
    borderRadius: "10px",
    border: "1px solid #E3E4E5",
    marginTop: "24px",
    marginBottom: "32px",
    boxSizing: "border-box",
  },
  checkbox: {
    width: "24px",
    height: "25px",
    minWidth: "24px",
  },
};
