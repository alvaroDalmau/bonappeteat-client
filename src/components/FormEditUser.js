// import React, { Component } from "react";
// import FormPhotoUser from './FormPhotoUser'


// export default class FormEditUser extends Component {
//   render() {
//     const { user, userInfo, onEdit} = this.props;
//     return (
//       <React.Fragment>
//         <h1>Edit your profile details</h1>
//         {/* CLOUDINARY */}
//         <FormPhotoUser />
//         <form>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={userInfo.email}
//             onChange={this.props.onEditEmail}
//           ></input>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={userInfo.password}
//             onChange={this.props.onEditPassword}
//           ></input>
//           <br />
//           <button
//             onClick={() => {
//               onEdit(userInfo);
//             }}
//           >
//             Apply changes
//           </button>
//         </form>
//       </React.Fragment>
//     );
//   }
// }
