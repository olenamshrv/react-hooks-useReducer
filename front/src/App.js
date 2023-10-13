import Page from "./component/page";
import Grid from "./component/grid";
import Box from "./component/box";

import { useReducer } from "react";

// import PostList from "./container/post-list";

const LIST_ACTION_TYPE = {
  ADD: "add",
  DELETE: "delete",
  SELECT: "select",
  REVERSE: "reverse",
};

function listReducer(state, action) {
  // if (action.trim() === "") return { ...state };

  switch (action.type) {
    case LIST_ACTION_TYPE.ADD:
      const id = new Date().getTime();

      const newItem = { value: action.payload, id };

      return { ...state, items: [...state.items, newItem] };

    case LIST_ACTION_TYPE.DELETE:
      const newItems = state.items.filter((item) => item.id !== action.payload);

      return { ...state, items: newItems };

    case LIST_ACTION_TYPE.SELECT:
      return {
        ...state,
        selectedId: action.payload === state.selectedId ? null : action.payload,
      };

    case LIST_ACTION_TYPE.REVERSE:
      return {
        ...state,
        items: state.items.reverse(),
      };

    default:
      return { ...state };
  }

  // console.log(state, action);

  // return { ...state, items: [...state.items, action] };

  // return [...state.items, { value: action, id: new Date().getTime() }];
}

const initState = { items: [] };

function App() {
  // const init = (state) => {
  //   if (state.items && state.items.length === 0) {
  //     return {
  //       ...state,
  //       items: [...state.items, { id: 432312, value: "first item" }],
  //     };
  //   } else {
  //     return state;
  //   }
  // };

  console.log("render");

  const [state, dispatch] = useReducer(listReducer, initState);

  const handleAddItem = (e) => {
    // console.log(e.target.value);

    // dispatch(e.target.value);

    // e.target.value = "";

    //===

    const { value } = e.target;

    if (value.trim() === "") return null;

    // dispatch(e.target.value);

    dispatch({ type: LIST_ACTION_TYPE.ADD, payload: value });

    e.target.value = "";
  };

  const handleRemoveItem = (id) =>
    dispatch({ type: LIST_ACTION_TYPE.DELETE, payload: id });

  const handleSelectItem = (id) =>
    dispatch({ type: LIST_ACTION_TYPE.SELECT, payload: id });

  const handleReverseItems = () => {
    dispatch({ type: LIST_ACTION_TYPE.REVERSE });
  };
  console.log("dispatch", state);
  return (
    <Page>
      <Grid>
        <Box>
          <Grid>
            <h1>Список елементів:</h1>
            <ul>
              <Grid>
                {state.items.map(({ value, id }) => (
                  <li onClick={() => handleSelectItem(id)} key={id}>
                    <Box
                      style={{
                        borderColor:
                          state.selectedId === id ? "blue" : "#e6e6e6",
                      }}
                    >
                      <Grid>
                        <span>{value}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveItem(id);
                          }}
                          style={{ border: "1px solid #888" }}
                        >
                          Видалити
                        </button>
                      </Grid>
                    </Box>
                  </li>
                ))}
              </Grid>
            </ul>
          </Grid>
        </Box>
        <Box>
          <input
            onBlur={handleAddItem}
            type="text"
            placeholder="Введіть новий елемент"
          />
        </Box>
        <button
          onClick={handleReverseItems}
          style={{ border: "1px solid #888" }}
        >
          Змінити порядок
        </button>
      </Grid>
    </Page>
  );
}

export default App;
