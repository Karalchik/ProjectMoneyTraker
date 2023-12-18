import { Outlet } from "react-router-dom";

export const MainLayout = () => {
    return (
        <div className="">
            <div className="">
                <Header/>
            </div>
            <div>
                <Outlet/>
            </div>
            <div>
                footer
            </div>
        </div>
    );
}

