
import News from "./News";
import Sidebar from "./Sidebar";


// Hindi https://gnews.io/api/v4/top-headlines?lang=hi&country=in&token=API
// French https://gnews.io/api/v4/top-headlines?lang=fr&country=in&token=API
// Spanish https://gnews.io/api/v4/top-headlines?lang=es&country=es&token=API
// https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=en&country=us&max=5

function FrontPage() {

 

  return (
    <div className="flex justify-between pt-1 overflow-x-hidden border border-t-black">
      <News/>
      <Sidebar/>
      
      
    </div>
  );
}

export default FrontPage;
