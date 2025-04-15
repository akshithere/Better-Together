import dayjs from "dayjs";
import { useCallback, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import "react-time-picker/dist/TimePicker.css";
import { useEvent } from "../../../../hooks/useEvent";
import countries from "../../../../static/CountryList";
import platforms from "../../../../static/OnlinePlatform";
import convertToBase64 from "../../../../utils/convertToBase64";
import { Button } from "../../../shared";

const CreateEvents = ({ setshowCreateModal }) => {
  const user = useSelector((state) => state.user);
  const [errors, seterrors] = useState({});

  const [event, setevent] = useState({
    name: "",
    startDate: dayjs(),
    endDate: dayjs(),
    startTime: dayjs("2022-04-17T15:30"),
    endTime: dayjs("2022-04-17T15:30"),
    mode: "Offline",
    uid: "",
    description: "",
    city: "",
    state: "",
    address: "",
    country: "India",
    mapIframe: "",
    coverImage:
      "https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    platform: "Zoom Meeting",
    platformLink: "",
  });

  const { validateEvent, submitCallback } = useEvent(event);

  const handleCreateBase64 = useCallback(async (e) => {
    const base64 = await convertToBase64(e);
    setevent((prevEvent) => ({ ...prevEvent, coverImage: base64 }));
    e.target.value = "";
  }, []);

  const handleChange = (e) => {
    setevent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    seterrors(validateEvent());
    submitCallback(event, setshowCreateModal);
  };

  return (
    <div className="createevent_overlay">
      <div className="createevent_modal">
        <IoMdCloseCircleOutline
          className="crossButton"
          onClick={() => setshowCreateModal(false)}
        />

        <div className="createevent_header">
          <h1>Create</h1>
        </div>

        <div className="createevent_form">
          <img src={event.coverImage} alt="Event Cover" />

          <div className="form_header">
            <div className="host">
              <img
                src="https://www.thetechies.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fuser3.04b79840.webp&w=640&q=75"
                alt="Host"
              />
              <div className="details">
                <span>Hosted by</span>
                <span>{user?.name}</span>
              </div>
            </div>

            <div className="thumbnail">
              <label htmlFor="file-input">
                <IoCloudUploadOutline /> Upload Thumbnail
              </label>
              <input type="file" id="file-input" onChange={handleCreateBase64} />
            </div>
          </div>

          <div className="form_inputs">
            <input type="text" placeholder="Event Name" name="name" onChange={handleChange} value={event.name} />
            {errors.name && <span className="error_message">{errors.name}</span>}

            <input type="date" name="startDate" value={event.startDate.format('YYYY-MM-DD')} onChange={handleChange} />
            <input type="time" name="startTime" value={event.startTime.format('HH:mm')} onChange={handleChange} />
            <input type="date" name="endDate" value={event.endDate.format('YYYY-MM-DD')} onChange={handleChange} />
            <input type="time" name="endTime" value={event.endTime.format('HH:mm')} onChange={handleChange} />

            <select name="mode" value={event.mode} onChange={handleChange}>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>

            <input type="text" placeholder="Event Unique ID" name="uid" value={event.uid} onChange={handleChange} />
            <textarea placeholder="Event Description" name="description" value={event.description} onChange={handleChange} />

            {event.mode === "Offline" ? (
              <div>
                <input type="text" placeholder="City" name="city" value={event.city} onChange={handleChange} />
                <input type="text" placeholder="State" name="state" value={event.state} onChange={handleChange} />
                <input type="text" placeholder="Address" name="address" value={event.address} onChange={handleChange} />
                <select name="country" value={event.country} onChange={handleChange}>
                  {countries.map((country, index) => (
                    <option value={country.label} key={index}>{country.label}</option>
                  ))}
                </select>
                <input type="text" placeholder="Map Iframe" name="mapIframe" value={event.mapIframe} onChange={handleChange} />
              </div>
            ) : (
              <div>
                <select name="platform" value={event.platform} onChange={handleChange}>
                  {platforms.map((platform, index) => (
                    <option value={platform.label} key={index}>{platform.label}</option>
                  ))}
                </select>
                <input type="text" placeholder="Platform Link" name="platformLink" value={event.platformLink} onChange={handleChange} />
              </div>
            )}
          </div>
          <Button onClickfunction={handleSubmit}>Create</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvents;
