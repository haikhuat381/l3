import Avatar from "react-avatar-edit";
import { Button, Icon } from "@mui/material";
import React, { useState } from "react";
import { Dialog } from "@mui/material";

function CustomAvatar(props) {
  const [preview, setPreview] = useState(null);
  const [defaultPreview, setDefaultPreview] = useState(null);
  const [src, setSrc] = useState(props.image);
  const [showModal, setShowModal] = useState(false);

  const onCropDefault = (preview) => {
    setDefaultPreview(preview);
  };

  const onCrop = (preview) => {
    setPreview(preview);
  };

  const onCloseDefault = () => {
    setShowModal(false);
    setSrc(defaultPreview);
    props.formikRoot.setFieldValue("image", defaultPreview);
  };

  const onClose = () => {
    setPreview(null);
  };

  const onAvatarClick = () => {
    setShowModal(true);
    console.log("click");
  };
  // var img = new Image();
  // img.src = defaultPreview;
  // const url = URL.createObjectURL(img);
  // console.log(url);
  // zsjchbzjhc
  var binaryData = [];
  binaryData.push(defaultPreview);
  window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }));
  console.log("sdjhfjsdhf", binaryData);
  return (
    <>
      <Dialog onClose={onCloseDefault} open={showModal}>
        <Avatar
          width={300}
          height={300}
          exportSize={300}
          onCrop={onCropDefault}
          onClose={onCloseDefault}
        />
        {defaultPreview && (
          <>
            <h5>Preview</h5>
            <img
              alt="Chọn ảnh nhân viên"
              style={{
                width: "150px",
                height: "150px",
                border: "1px soild ,#eee",
              }}
              src={defaultPreview}
            />
          </>
        )}
      </Dialog>
      <div>
        <img
          alt="Chọn ảnh nhân viên"
          style={{
            width: "70%",
            aspectRatio: "1/1",
            cursor: "pointer",
            display: "block",
            margin: "10px auto",
            borderRadius: "50%",
          }}
          src={src}
        />
        <Button
          onClick={onAvatarClick}
          className="button-add-image"
          variant="contained"
          style={{ display: props.displayButton }}
          endIcon={<Icon>camera_alt</Icon>}
        >
          Chọn ảnh nhân viên
        </Button>
      </div>
    </>
  );
}

export default CustomAvatar;
