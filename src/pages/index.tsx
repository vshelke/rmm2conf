import Greetings from "@/components/Greetings";
import ScanOperation from "@/components/ScanOperation";
import VisitorDetails from "@/components/VisitorDetails";
import EventAction from "@/components/EventAction";

export default function Home() {
  return (
    <div>
      <Greetings className="m-5"/>
      <ScanOperation className="m-5"/>
      <VisitorDetails />
      <EventAction />
    </div>
  );
}
