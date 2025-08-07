import { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { getUserProfileApi } from "../../../services/userService";
import { updateUserApi } from "../../../services/adminService";
import { baseUrl } from "../../../components/common/baseUrl"

const Profile = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({ fullName: "", email: "", profileImage: "",address:"" })

  const [preview, setPreview] = useState("")


  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserProfileApi()
      const user = res.data
      setData({ fullName: user.fullName || "", email: user.email || "", address: user.address || "", profileImage: user.profileImage || "" })
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (data.profileImage.type) {
      setPreview(URL.createObjectURL(data.profileImage))
    }
    else {
      setPreview("")
    }
  }, [data.profileImage.type])

  const handleUpdate = async () => {

    await updateUserApi(data)

    navigate("/")
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      style={{
        background: "linear-gradient(to right,#e6f3f7ff, #e6f3f7ff)",
        
      }}
    >
      <div
        className="profile-card mx-3 p-4 rounded shadow"
        style={{
          background: "linear-gradient(to right,#3285acff, #3285acff)",
          maxWidth: "500px",
          width: "100%"
        }}
      >
        <h3 className="text-light text-center mb-4">My Profile</h3>

        <input onChange={e => {
          console.log(e)
          setData({ ...data, profileImage: e.target.files[0] })
        }} className="d-none" type="file" id="myFile" />
        <label className="d-flex justify-content-center my-4" htmlFor="myFile">
          <img alt="profileimg" style={{ width: "120px", height: "120px", objectFit: "cover", cursor: "pointer" }} src={preview ? preview : (data.profileImage ? `${baseUrl}image/${data.profileImage}` : "https://cdn-icons-png.flaticon.com/512/8847/8847419.png")} className="img-fluid mx-3 my-2 rounded" />
        </label>

        {/* Full Name */}
        <FloatingLabel
          controlId="floatingName"
          label="Name"
          className="text-secondary mb-3"
        >
          <Form.Control
            type="text"
            value={data.fullName}
            onChange={(e) =>
              setData({ ...data, fullName: e.target.value })
            }
            placeholder="Name"
          />
        </FloatingLabel>

        {/* Email */}
        <FloatingLabel
          controlId="floatingEmail"
          label="Email"
          className="text-secondary mb-3"
        >
          <Form.Control
            type="email"
            value={data.email}
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
            placeholder="Email"
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingEmail"
          label="Address"
          className="text-secondary mb-3"
        >
          <Form.Control
            as="textarea"
            value={data.address}
            onChange={(e) =>
              setData({ ...data, address: e.target.value })
            }
            placeholder="Address"
          />
        </FloatingLabel>



        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-light text-dark px-4"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="btn btn-outline-light px-4"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
