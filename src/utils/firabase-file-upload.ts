import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export const firebaseFileUpload = async (data: File[]): Promise<string[]> => {
  if (data.length === 0) return [];

  const uploads = data.map((file) => {
    const imageRef = ref(storage, `postsImages/${file.name + v4()}`);
    return uploadBytes(imageRef, file)
      .then(() => getDownloadURL(imageRef))
      .then((url) => {
        console.log("File available at", url);
        return url;
      });
  });

  return Promise.all(uploads);
};
