import RestaurantsList from "./RestaurantsList.js";
import ReactGA from "react-ga4";

ReactGA.initialize("G-T418MD1TGJ"); // Replace with your Measurement ID

function App() {
  ReactGA.send("pageview");
  return (
    <div>
      <RestaurantsList />
    </div>
  );
}

export default App;