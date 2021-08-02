import { createConnection, getConnection } from 'typeorm';
import categoryService from './CategoryService';

describe('카테고리 서비스 테스트', () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('getCategories는 배열을 리턴해야 한다.', async () => {
    const categories = await categoryService.getCategories();

    expect(categories).toBeInstanceOf(Array);
  });
});
