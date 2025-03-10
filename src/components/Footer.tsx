import logo from "../assets/logo.png";
function Footer() {
    return (
            <div className="w-full bg-[#f1f3f5] md:mt-10 mt-4 pl-4">
            <div>
                <img src={logo} className="md:w-[18rem] md:mt-4 md:mb-4 w-[15rem] pl-4 md:pl-0"/>
            </div>
            <div className="flex flex-col gap-2 pl-4 mt-3 mb-1 font-serif text-sm font-semibold md:hidden">
                <p>
                    Company
                </p>
                <p>
                    Sections
                </p>
                <p>
                    Contact Us
                </p>
                <p> Get the Herald </p>
                <p> Term of use</p>
            </div>
            <div className="justify-between hidden mb-4 font-serif md:text-sm md:flex">
                <div className="flex flex-col gap-[6px]">
                    <h2 className="pb-1 font-semibold">
                        Company
                    </h2>
                    <p> About The Herald</p>
                    <p>Newsroom Policies & Standards</p>
                    <p>Diversity & Inclusion</p>
                    <p>Careers</p>
                    <p>Media & Community Relations</p>
                    <p>WP Creative Group</p>
                    <p>Accessibility Statement</p>
                </div>
                <div className="flex flex-col gap-[6px]">
                <h2 className="pb-1 font-semibold">
                Sections
                    </h2>
                    Trending
                        <p>Politics
                        </p>
                        <p>Elections
                        </p>
                        <p>Opinions
                        </p>
                        <p>National
                        </p>
                        <p>World
                        </p>
                        <p>Style
                        </p>
                        <p>Sports
                        </p>
                        <p>Business
                        </p>
                        <p>Climate
                        </p>
                        <p>Well+Being
                        </p>
                        <p>D.C., Md., & Va.
                        </p>
                        <p>Obituaries
                        </p>
                        <p>Weather
                        </p>
                        <p>Arts & Entertainments
                        </p>
                    <p>
                    Recipes 
                    </p>
                </div>
                <div className="flex flex-col gap-[6px]">
                <h2 className="pb-1 font-semibold">
                Contact Us
                    </h2>
                    <p>
                    Contact the Newsroom
                    </p>
                    <p>
                    Contact Customer Care
                    </p>
                    <p>
                    Contact the Opinions Team
                    </p>
                    <p>
                    Advertise
                    </p>
                    <p>
                    Licensing & Syndication
                    </p>
                    <p>
                    Request a Correction
                    </p>
                    <p>
                    Send a News Tip
                    </p>
                    <p>
                    Report a Vulnerability 
                    </p>
                </div>
                <div className="flex flex-col gap-[6px]">
                <h2 className="pb-1 font-semibold">
                        Get The Post
                    </h2>
                    <p>
                    WP Intelligence
                    </p>
                    <p>
                    Become a Subscriber
                    </p>
                    <p>
                    Gift Subscriptions
                    </p>
                    <p>
                    Mobile & Apps
                    </p>
                    <p>
                    Newsletters & Alerts
                    </p>
                    <p>
                    Washington Post Live
                    </p>
                    <p>
                    Reprints & Permissions
                    </p>
                    <p>
                    Post Store
                    </p>
                    <p>
                    Books & E-Books
                    </p>
                    <p>
                    Print Special Editions Store
                    </p>
                    <p>
                    Today&apos;s Paper
                    </p>
                    <p>
                    Public Notices 
                    </p>
                </div>
                <div className="flex flex-col gap-[6px]">
                <h2 className="pb-1 font-semibold">
                Terms of Use
                    </h2>
                    <p>
                    Digital Products Terms of Sale
                    </p>
                    <p>
                    Print Products Terms of Sale
                    </p>
                    <p>
                    Terms of Service
                    </p>
                    <p>
                    Privacy Policy
                    </p>
                    <p>
                    Cookie Settings
                    </p>
                    <p>
                    Submissions & Discussion Policy
                    </p>
                    <p>
                    RSS Terms of Service
                    </p>
                    <p>
                    Sitemap
                    </p>
                    <p>
                    Ad Choices 
                    </p>
                </div>
            </div>
            <div className="border border-t-slate-200">
                <p className="pt-1 mb-1 font-serif text-xs text-center">Today&apos;sHerald.com &copy; 2023-2025 The Today&apos;s Herald</p>
            </div>
            
        </div>
    )
}

export default Footer