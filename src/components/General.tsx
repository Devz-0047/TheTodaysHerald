import GeneralNews from "./GeneralNews"
import GeneralSidebar from "./GeneralSidebar"

function General() {
    return (
        <div className="flex justify-between pt-1 overflow-x-hidden border border-t-black">
            <GeneralNews/>
            <GeneralSidebar/>
            
        </div>
    )
}

export default General