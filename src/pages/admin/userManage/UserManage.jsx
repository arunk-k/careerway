import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { deleteUser, fetchUsers, toggleUserStatus } from '../../../redux/admin/adminUser/adminUserThunks';
import './UserManage.css';
// import { updateUserApi } from '../../../services/adminService';

function UserManage() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.adminUserSlice)

  const [profileData, setProfileData] = useState({ profileImage: "" })

  const [ preview, setPreview ] = useState("")

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (profileData.profileImage.type) {
      setPreview(URL.createObjectURL(profileData.profileImage))
    }
    else {
      setPreview("")
    }
  }, [profileData.profileImage.type])

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error('Something went wrong');
      }
    }
  };

  // const handleUpdate = async () => {
  //   console.log(profileData);
  //   let header={}
  //   if (profileData.type) {
  //     header = {
  //       "Authorization": `Token ${sessionStorage.getItem('token')}`,
  //       "Content-Type": "multipart/form-data"
  //     }
  //   }
  //   else {
  //     header = {
  //       "Authorization": `Token ${sessionStorage.getItem('admintoken')}`,
  //       "Content-Type": "application/json"
  //     }
  //   }
  //   const response =  await updateUserApi(profileData,header)
  // }

  const handleToggle = async (userId) => {
    try {
      const result = await dispatch(toggleUserStatus(userId)).unwrap();
      if (result.success) toast.success('User status updated');
      else toast.error('Something went wrong');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="user-manage-container">
      <div className="card shadow-sm p-4">
        <h3 style={{color:"#2183a6"}} className="user-manage-heading">User Management</h3>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="table-responsive">
            <table className="table user-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>
                        <label htmlFor="cw" style={{ cursor: 'pointer' }}>
                          <img src={preview ? preview : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Profile" className="rounded-circle" width="40" height="40" style={{ objectFit: 'cover' }} />
                        </label>
                        <input id="cw" type="file" style={{ display: 'none' }} onChange={e => setProfileData({ ...profileData, profileImage: e.target.files[0] })} />
                      </td>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <span className={`status-badge ${user.isBlocked ? 'blocked' : 'active'}`}>
                          {user.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td>
                        <button
                          className={`btn btn-sm action-btn ${user.isBlocked ? 'unblock' : 'block'
                            }`}
                          onClick={() => handleToggle(user._id)}
                        >
                          {user.isBlocked ? 'Unblock' : 'Block'}
                        </button>
                        <button
                          className="btn btn-sm action-btn delete"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                        {/* <button
                          className="btn btn-sm action-btn delete"
                          onClick={() => handleUpdate()}
                        >
                          Update
                        </button> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManage;
