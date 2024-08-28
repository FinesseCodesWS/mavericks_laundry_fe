import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { DuelText, RoundAvatar } from "..";
import { Anchor } from "../elements";
import axiosMain from "axios";
import imageDefault from "../../assets/image.png";

export default function ProfileDropdown({
  name,
  username,
  image,
  dropdown,
  user,
}) {
  const userImage = JSON.parse(localStorage.getItem("pos-user-image"));
  const [imageUrl, setImageUrl] = useState(null);
  const access = JSON.parse(localStorage.getItem("pos-token"));

  // get image
  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await axiosMain.get(
          `${process.env.REACT_APP_URL}/staff/px`,
          {
            responseType: "arraybuffer",
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {}
    };
    getImage();
  }, [access]);

  return (
    <Dropdown className="mc-header-user">
      <Dropdown.Toggle className="mc-dropdown-toggle">
        <RoundAvatar
          src={imageUrl ? imageUrl : imageDefault}
          alt="avatar"
          size="xs"
        />
        <DuelText
          title={
            user?.emergencyContact?.fullName
              ? user?.emergencyContact?.fullName
              : `Update Profile`
          }
          descrip={`${user?.role}`}
          size="xs"
        />
      </Dropdown.Toggle>
      <Dropdown.Menu align="end" className="mc-dropdown-paper">
        {dropdown.map((item, index) => (
          <Anchor
            key={index}
            href={item.path}
            icon={item.icon}
            text={item.text}
            className="mc-dropdown-menu"
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
