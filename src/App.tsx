import QRScanner from "./components/QRScanner";

function App() {
  return (
      <div className="card rounded-2xl m-10">
        <h2 className="text-center text-5xl font-bold pb-10 text-stone-600">Scan QR Code</h2>
        <QRScanner />
      </div>
  );
}

export default App;
