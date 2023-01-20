import Greetings from "@/components/Greetings";
import ScanOperation from "@/components/ScanOperation";
import VisitorDetails from "@/components/VisitorDetails";
import EventAction from "@/components/EventAction";
import { useState } from "react";

export interface IDataObject {
  id: string;
  timestamp: string;
}

export default function Home() {
  const [data, setData] = useState<null | IDataObject>(null);

  return (
    <div>
      <Greetings className="m-5"/>
      <ScanOperation className="m-5" onParsedData={setData}/>
      <VisitorDetails className="m-5" data={data}/>
      <EventAction />
    </div>
  );
}
