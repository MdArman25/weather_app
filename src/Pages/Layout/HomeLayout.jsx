import { NavLink, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";



const HomeLayout = () => {
  return (
    <div className="md:flex relative h-full w-full ">
      <div className="block md:hidden">
  =
      </div>
      <div
      className="absolute z-20  bg-indigo-400 rounded-md ml-2 p-3"
      >
        <ul className="menu ">
          <li className=" border  rounded-md font-bold  text-lg">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "btn bg-white btn-sm  text-black font-bold"
                  : "btn md:btn-ghost btn-sm"
              }
              to="/"
            >
              {" "}
              <FaHome></FaHome>Profile
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="md:flex-1  h-full w-full md:w-10/12">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
export default HomeLayout;
