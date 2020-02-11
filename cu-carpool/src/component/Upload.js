


const photoUpload = (e, handleUpload) => {
  const reader = new FileReader();
  const file = e.target.files[0];
  reader.readAsDataURL(file);
  reader.onload = event => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const elem = document.createElement('canvas');
      elem.width = 100;
      elem.height = 100;
      const width = img.height < img.width ? img.height : img.width;
      const ctx = elem.getContext('2d');
      ctx.drawImage(img, 0, 0, width, width, 0, 0, 100, 100);
      ctx.canvas.toBlob((blob) => {
        const file = new File([blob], 'photo', {
          type: 'image/jpeg',
          lastModified: Date.now()
        });
        const reader2 = new FileReader();
        reader2.readAsDataURL(file);
        reader2.onloadend = () => {
          handleUpload(reader2.result)
        }
      }, 'image/jpeg', 1);

    },
      reader.onerror = error => console.log(error);
  };
}

export default photoUpload;
