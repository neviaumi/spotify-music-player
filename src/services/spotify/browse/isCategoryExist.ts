import type { Fetcher } from '../typings/fetcher';

export interface Response {
  categoryId: string;
  isCategoryExist: boolean;
}

const isCategoryExist: Fetcher<Response> = async (
  apiClient,
  categoryId: string,
) => {
  try {
    const response = await apiClient.request<Response>({
      url: `/browse/categories/${categoryId}`,
      method: 'GET',
    });
    return Object.assign(response, {
      data: {
        isCategoryExist: true,
        categoryId: categoryId,
      },
    });
  } catch (err) {
    const { status } = err.response;
    if (status === 404) {
      return Object.assign(err.response, {
        data: {
          isCategoryExist: false,
          categoryId: categoryId,
        },
      });
    }
    throw err;
  }
};

export default isCategoryExist;
