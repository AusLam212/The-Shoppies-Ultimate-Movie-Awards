import axios from "axios";
const BASEURL = "https://www.omdbapi.com/?s=";
const APIKEY = "&type=movie&apikey=trilogy";

export default {
  search: function(query) {
    return axios.get(BASEURL + query + APIKEY);
  }
};
