import httpRequest from 'services/httpRequest';

export const fetchTodo = async () => {
  return httpRequest.get('/todos');
};
