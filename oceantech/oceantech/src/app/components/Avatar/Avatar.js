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

function CustomAvatar({ formikRoot, image, displayButton, isNoneBorder }) {

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
    // <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200}}>
    <div style={{ display: "flex", justifyContent: isNoneBorder ? "left" : "center", alignItems: "center", flexWrap: "wrap", height: isNoneBorder ? 200 : 260, paddingTop: isNoneBorder ? 0 : 20 }}>
      <div className="avatar" width="100%">
        <Image
          src={fileImage?.toString() || 'error'}
          fallback="data:image/png;base64,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"
          style={{ borderRadius: isNoneBorder ? "" : "50%", zIndex: 1000, border: isNoneBorder ? "1px solid #E5E5E5" : ""  }}
          width={isNoneBorder ? 180 : 220}
          height={isNoneBorder ? 200 : 220}
          // sx={{
          //   width: "100%",
          //   height: "auto",
          //   maxHeight:  "200px",
          //   maxWidth: "200px"
          // }}
          onChange={handleChangeImage}
          preview={false}
        />
      </div>
      <div>
        <Upload
          showUploadList={false}
          name="avatar"
          onChange={handleChange}
          customRequest={() => false}
          style={{ pt: 20 }}
        >
          {/* <Button >
              Chọn ảnh đại diện
            </Button> */}
          <Button
            className="button-add-image"
            variant="contained"
            style={{ display: displayButton, marginTop: "20px" }}
            endIcon={<Icon>camera_alt</Icon>}
          >
            Chọn ảnh đại diện
          </Button>
        </Upload>
      </div>
    </div>
  )

}

export default CustomAvatar