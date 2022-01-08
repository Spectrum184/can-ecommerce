export const imageUpload = async (images) => {
  let imgArr = [];

  for (const image of images) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'pxvcb9nk');
    formData.append('cloud_name', 'can-ecommerce');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/can-ecommerce/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();

    imgArr.push({ secureUrl: data.secure_url, url: data.public_id });
  }

  return imgArr;
};
