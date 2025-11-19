import {
  faCircleCheck,
  faMapPin,
  faList,
  faUsers,
  faRotate,
  faPlaneDeparture,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import NavigationCard from "../../components/cards/NavigationCard";

function Setup() {
  return (
    <div className="flex flex-row flex-wrap gap-6 p-6 justify-around">
      <NavigationCard title={"Users"} icon={faUsers} to={"/flight-list"} />
      <NavigationCard
        title={"Fleet/Config"}
        icon={faPlaneDeparture}
        to={"/flight-list"}
      />
      <NavigationCard
        title={"Destinations"}
        icon={faMapPin}
        to={"/flight-list"}
        active={false}
      />
      <NavigationCard
        title={"Caterers/Contracts"}
        icon={faList}
        to={"/flight-list"}
      />
      <NavigationCard
        title={"Notifications"}
        icon={faCircleCheck}
        to={"/flight-list"}
        active={false}
      />
      <NavigationCard
        title={"Security Roles"}
        icon={faRotate}
        to={"/flight-list"}
        active={false}
      />
      <NavigationCard
        title={"Settings"}
        icon={faGears}
        to={"/flight-list"}
        active={false}
      />
    </div>
  );
}

export default Setup;
