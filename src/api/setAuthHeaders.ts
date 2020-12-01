import { spotifyInstance } from "@/api/instances";

export default function(accessToken: string) {
  spotifyInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}
