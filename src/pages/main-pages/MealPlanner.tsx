import {
  faBowlFood,
  faTableList,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import NavigationCard from "../../components/cards/NavigationCard";

function MealPlanner() {
  return (
    <div className="flex flex-row flex-wrap gap-6 p-6  justify-around">
      <NavigationCard title={"Food"} icon={faBowlFood} to={"/flight-list"} />
      <NavigationCard title={"Menu"} icon={faTableList} to={"/flight-list"} />
      <NavigationCard
        title={"Menu Rules"}
        icon={faUtensils}
        to={"/flight-list"}
      />
    </div>
  );
}

export default MealPlanner;
