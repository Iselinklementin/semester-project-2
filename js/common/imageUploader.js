import { hiddenImageContainer, cloudName, uploadPreset, uploadWidget, uploadedImage } from "../components/elements.js";

export function imageUploader() {
  const myWidget = cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        uploadedImage.setAttribute("src", result.info.secure_url);
        hiddenImageContainer.value = result.info.secure_url;
      }
    }
  );

  uploadWidget.addEventListener(
    "click",
    () => {
      myWidget.open();
    },
    false
  );
}
