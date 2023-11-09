import HttpClient from "./httpClients";

type CommentsResponse = {
  //
};

export const GetAllComments = async () => {
  return HttpClient.get<CommentsResponse>(`/comments`);
};
