import {
  faChartSimple,
  faGlobe,
  faCartShopping,
  faBars,
  faUsers,
  faClipboardList,
  faBoxesStacked,
  faMoneyBillTrendUp,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import NavigationCard from "../../components/cards/NavigationCard";

function Reports() {
  return (
    <div className="flex flex-row flex-wrap gap-6 p-6 justify-around">
      <NavigationCard
        title={"Activity Log"}
        icon={faBars}
        to={"/flight-list"}
      />
      <NavigationCard
        title={"Consumption Tracking"}
        icon={faGlobe}
        to={"/flight-list"}
      />
      <NavigationCard
        title={"User Logins"}
        icon={faUsers}
        to={"/flight-list"}
        active={false}
      />
      <NavigationCard
        title={"Loading Report"}
        icon={faCartShopping}
        to={"/flight-list"}
      />
      <NavigationCard
        title={"Performance"}
        icon={faChartSimple}
        to={"/flight-list"}
        active={false}
      />
      <NavigationCard
        title={"ELPs"}
        icon={faGlobe}
        to={"/flight-list"}
        active={false}
      />
      <NavigationCard
        title={"Inventory"}
        icon={faBoxesStacked}
        to={"/flight-list"}
        active={false}
      />
      <NavigationCard
        title={"Tableau"}
        icon={faClipboardList}
        to={"/flight-list"}
        active={false}
      />
      <NavigationCard
        title={"Production"}
        icon={faListCheck}
        to={"/flight-list"}
        active={false}
      />
      <NavigationCard
        title={"Financials"}
        icon={faMoneyBillTrendUp}
        to={"/flight-list"}
        active={false}
      />
    </div>
  );
}

export default Reports;
