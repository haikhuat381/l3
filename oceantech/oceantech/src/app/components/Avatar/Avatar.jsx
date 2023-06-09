import { Image, Upload } from "antd";
import { useState } from "react";
import { Button, Icon } from "@mui/material";
import { imageDefault, imageSizeExceedsLimit } from "app/constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomAvatar({
  formikRoot,
  image,
}) {
  const [fileImage, setFileImage] = useState(image);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async ({ file }) => {
    const fileUrl = await getBase64(file.originFileObj);
    if(fileUrl.length < 5000) {
      setFileImage(fileUrl);
      formikRoot.setFieldValue("photoUrl", fileUrl);
    } else {
      toast.warning(imageSizeExceedsLimit)
    }
  };

  return (
    <div className="image-container">
      <div className="avatar">
        <Image
          src={fileImage?.toString() || "error"}
          fallback={imageDefault}
          // fallback="/assets/images/avartarDefault.png"
          className="avatar-img"
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
          <Button
            className="button-add-image"
            variant="contained"
            style={{marginTop: 8 }}
            endIcon={<Icon>camera_alt</Icon>}
          >
            Chọn ảnh
          </Button>
        </Upload>
      </div>
    </div>
  );
}

export default CustomAvatar;
