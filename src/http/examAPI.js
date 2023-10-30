import baseAxios from "./clientAPI";

const examAPI = {
  create(body) {
    const uri = "/exam";
    return baseAxios.post(uri, body);
  },
  update(id, body) {
    const uri = `/exam/exam/${id}`;
    return baseAxios.put(uri, body);
  },
  getbyId(id) {
    const uri = `/exam/exam/${id}`;
    return baseAxios.get(uri);
  },
  getAll(page, perPage, challengeType) {
    const uri = `/exam/exams?page=${page}&perPage=${perPage}&challengeType=${challengeType}`;
    return baseAxios.get(uri);
  },
  search(title, type, page, perPage) {
    const uri = `/exam/search/${title}?type=${type}&page=${page}&perPage=${perPage}`;
    return baseAxios.get(uri);
  },
  searchOnList(title, page, perPage) {
    const uri = `/exam/search_list/${title}?page=${page}&perPage=${perPage}`;
    return baseAxios.get(uri);
  },
  runCode(body) {
    const uri = "/exam/runcode";
    return baseAxios.post(uri, body);
  },
};

export default examAPI;
