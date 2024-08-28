import React, { useContext } from "react";
import { MultipleMenu, Logout } from "../components/sidebar";
import { DrawerContext } from "../context/Drawer";
import Section from "../components/elements/Section";
import data from "../data/master/sidebar.json";
import { useSelector } from "react-redux"

export default function Sidebar() {
    const user = useSelector((state) =>  state.user.user)
    const { drawer } = useContext(DrawerContext);
    
    return (
        <Section as="aside" className={`mc-sidebar thin-scrolling ${ drawer ? "active" : "" }`}>
            <MultipleMenu data={ user?.role === "super admin" ? data?.navs : data?.navsRestrict }  />
            <Logout data={ data?.button } />
        </Section>
    )
}