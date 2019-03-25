# useFetch

React hooks

# DEMO

```javascript
import React, {useState} from "react";
import useFetch from "./useFetch";

const App = () => {
  const {data, doFetch} = useFetch(
    {
      url: "http://hn.algolia.com/api/v1/search",
      initialPayload: {
        query: "redux"
      }
    },
    {hits: []}
  );
  const [query, setQuery] = useState("");

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button type="button" onClick={() => doFetch({query})}>
        Search
      </button>

      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
```
