import React, { useContext, useState, useRef, useEffect } from "react";
import {
  LanguageDropdown,
  WidgetDropdown,
  ProfileDropdown,
} from "../components/header";
import { Button, Section, Box, Input } from "../components/elements";
import { DrawerContext } from "../context/Drawer";
import { ThemeContext } from "../context/Themes";
import { Logo } from "../components";
import data from "../data/master/header.json";
import { useSelector } from "react-redux";
import image from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axiosMain from "axios"
import imageDefault from "../assets/image.png"


export default function Header() {
  const [imageUrl, setImageUrl] = useState(null);
  const access = JSON.parse(localStorage.getItem("pos-token"))
  const user = useSelector((state) => state.user.user);
  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const searchRef = useRef();
  const [scroll, setScroll] = useState("fixed");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  

  // useEffect(() => {
  //   if (user) return;
  //   localStorage.removeItem("pos-token");
  //   return navigate("/");
  // }, [user, localStorage]);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 0) setScroll("sticky");
    else setScroll("fixed");
  });

  document.addEventListener("mousedown", (event) => {
    if (!searchRef.current?.contains(event.target)) {
      setSearch("");
    }
  });

  return (
    <Section as="header" className={`mc-header ${scroll}`}>
      <Logo
        src={image}
        alt={data?.logo.alt}
        name="Laundry"
        href="/dashboard"
      />
      <Box className="mc-header-group">
        <Box className="mc-header-left">
          {/* <Button
            icon={data?.search.icon}
            className="mc-header-icon search"
            onClick={() => setSearch("show")}
          /> */}
          <Button
            icon={drawer ? "menu_open" : "menu"}
            className="mc-header-icon toggle"
            onClick={toggleDrawer}
          />
          {/* <Box className={`mc-header-search-group ${ search }`}>
                        <form className="mc-header-search" ref={ searchRef }>
                            <Button className="material-icons">{ data?.search.icon }</Button>
                            <Input type="search" placeholder={ data?.search.placeholder } />
                        </form>
                    </Box> */}
        </Box>
        <Box className="mc-header-right">
          <Button
            icon={theme}
            title={data.theme.title}
            onClick={toggleTheme}
            className={`mc-header-icon ${data.theme.addClass}`}
          />
          {/* <WidgetDropdown 
                        icon={ data.cart.icon }
                        title={ data.cart.title }
                        badge={ data.cart.badge }
                        addClass={ data.cart.addClass }
                        dropdown={ data.cart.dropdown }
                    /> */}
          {/* <WidgetDropdown 
                        icon={ data.notify.icon }
                        title={ data.notify.title }
                        badge={ data.notify.badge }
                        addClass={ data.notify.addClass }
                        dropdown={ data.notify.dropdown }
                    /> */}
          <ProfileDropdown
            user={user}
            name={data.profile.name}
            image={imageUrl ? imageUrl : imageDefault}
            username={data.profile.username}
            dropdown={data.profile.dropdown}
          />
        </Box>
      </Box>
    </Section>
  );
}
