// import Avatar from "react-avatar-edit";
// import { Button, Icon } from "@mui/material";
// import React, { useState } from "react";
// import { Dialog } from "@mui/material";

// function CustomAvatar(props) {
//   const [preview, setPreview] = useState(null);
//   const [defaultPreview, setDefaultPreview] = useState(null);
//   const [src, setSrc] = useState(props.photoUrl);
//   const [showModal, setShowModal] = useState(false);

//   const onCropDefault = (preview) => {
//     setDefaultPreview(preview);
//   };

//   const onCrop = (preview) => {
//     setPreview(preview);
//   };

//   const onCloseDefault = () => {
//     setShowModal(false);
//     setSrc(defaultPreview);
//     props.formikRoot.setFieldValue("photoUrl", defaultPreview);
//   };

//   const onClose = () => {
//     setPreview(null);
//   };

//   const onAvatarClick = () => {
//     setShowModal(true);
//     console.log("click");
//   };
//   // var img = new Image();
//   // img.src = defaultPreview;
//   // const url = URL.createObjectURL(img);
//   // console.log(url);
//   // zsjchbzjhc
//   var binaryData = [];
//   binaryData.push(defaultPreview);
//   window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }));
//   // console.log("sdjhfjsdhf", binaryData);
//   return (
//     <>
//       <Dialog onClose={onCloseDefault} open={showModal}>
//         <Avatar
//           width={300}
//           height={300}
//           exportSize={300}
//           onCrop={onCropDefault}
//           onClose={onCloseDefault}
//         />
//         {defaultPreview && (
//           <>
//             <h5>Preview</h5>
//             <img
//               alt="Chọn ảnh nhân viên"
//               style={{
//                 width: "150px",
//                 height: "150px",
//                 border: "1px soild ,#eee",
//               }}
//               src={defaultPreview}
//             />
//           </>
//         )}
//       </Dialog>
//       <div>
//         <img
//           alt="Chọn ảnh nhân viên"
//           style={{
//             width: "70%",
//             aspectRatio: "1/1",
//             cursor: "pointer",
//             display: "block",
//             margin: "10px auto",
//             borderRadius: "50%",
//           }}
//           src={src}
//         />
//         <Button
//           onClick={onAvatarClick}
//           className="button-add-image"
//           variant="contained"
//           style={{ display: props.displayButton }}
//           endIcon={<Icon>camera_alt</Icon>}
//         >
//           Chọn ảnh nhân viên
//         </Button>
//       </div>
//     </>
//   );
// }

import { Image, Upload } from "antd"
import { useState } from "react";
import { Button, Icon } from "@mui/material";

function CustomAvatar({ formikRoot, image, displayButton }) {

  const [fileImage, setFileImage] = useState(image)

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async ({ file }) => {
    const fileUrl = await getBase64(file.originFileObj);
    setFileImage(fileUrl)
    formikRoot.setFieldValue("photoUrl", fileUrl)
  };

  // ảnh

  const handleButtonClick = () => {
    // inputRef.current.click();
  };

  const handleChangeImage = (event) => {
    const selectedImage = event.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    // setFileImage(selectedImage);
    setFileImage(imageUrl);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", height: 260, marginTop: 10 }}>
      <div>
        <div className="avatar" >
          {/* {fileImage ? <img src={fileImage} alt="" /> : <div>a</div>} */}
          <Image
            src={fileImage?.toString()}
            // className="gid-image"
            style={{ borderRadius: "50%", zIndex: 1000 }}
            width={200}
            height={200}
            onChange={handleChangeImage}
            preview={false}
          />
        </div>
      </div>
      <div >
        <Upload
          showUploadList={false}
          name="avatar"
          onChange={handleChange}
          customRequest={() => false}
        >
          {/* <Button >
              Chọn ảnh đại diện
            </Button> */}
          <Button
            className="button-add-image"
            variant="contained"
            style={{ display: displayButton }}
            endIcon={<Icon>camera_alt</Icon>}
          >
            Chọn ảnh nhân viên
          </Button>
        </Upload>
      </div>




    </div>
  )

}

export default CustomAvatar