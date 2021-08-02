import { createConnection, getConnection } from 'typeorm';
import methodService from './MethodService';
import rs from 'randomstring';

describe('메소드 서비스 테스트', () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('getMethods는 배열을 리턴해야 한다.', async () => {
    const categories = await methodService.getMethods();

    expect(categories).toBeInstanceOf(Array);
  });

  it('메소드 생성하고 검색했을때 있어야 한다. 그리고 삭제한다.', async () => {
    const method = await methodService.createMethod({
      githubId: 'cothis',
      name: rs.generate(),
    });

    const cothisMethods = await methodService.getMethods('cothis');
    const result = await methodService.deleteMethod(method.id);

    expect(cothisMethods).toContainEqual(method);
    expect(result).toBeTruthy();
  });
});
