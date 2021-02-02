import { useQuery } from "react-query";
import api from "app/api";

export const usePostUploadPicture = () =>
  useQuery("uploadimage", async () =>
    api.get("/twitter/uploadimage", {
      cacheTime: 0,
    })
  );
