/* Import the components */
import Index from "./index.jsx";

/* Use components to define routes */
export default () =>
  <Switch>
    <Route path="/" exact component={Index} />
  </Switch>;