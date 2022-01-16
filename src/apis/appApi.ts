import httpRequest from 'services/httpRequest';

export const fetchTodo = async () => {
  return httpRequest.get('/todos');
};

export const fetchMember = async () => {
  return httpRequest.get('/en/api/v2.0/Employer/search?skip=0&take=10&requireTotalCount=true&_=1642351037103');
};
