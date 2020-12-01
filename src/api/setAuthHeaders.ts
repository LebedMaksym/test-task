import axiosInstance from "@/api/instances";

export default function(jwt: string) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}
