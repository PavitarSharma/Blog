/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "../http";

interface UploadResponse {
  uploadURL: string;
  // Add other properties if they exist in your actual response
}

export const uploadImage = async (img: any) => {
  let imageUrl: string | null = null;

  const formdata = new FormData();
  formdata.append("banner", img);

  try {
    const response = await http.post<UploadResponse>(
      "/blogs/get-upload-url",
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);

    imageUrl = response.data?.uploadURL;

    return imageUrl;
  } catch (error) {
    console.error(error);
  }
};
