import Db from '../src/db';

jest.mock('@react-native-async-storage/async-storage', () => {
  const asyncStore = {
    store: {} as Record<string, string>,
    getItem: async (key: string) => {
      return asyncStore.store[key];
    },
    setItem: async (key: string, val: string) => {
      asyncStore.store[key] = val;
    },
  };
  return asyncStore;
});

describe('Db CRUD test', () => {
  const db = new Db();
  it('should create a record', async () => {
    const res = await db.add({
      name: 'Ford F150',
      stock: 7,
      price: 30000,
      id: 1,
      timestamp: Date.now(),
      description: '',
    });
    expect(res).toBeTruthy();
  });

  it('should read records', async () => {
    const res = await db.fetchData();
    expect(res.length).toBe(1);
    expect(res[0].name).toBe('Ford F150');
    expect(res[0].price).toBe(30000);
  });

  it('should update a record', async () => {
    const res = await db.update({
      name: 'Ford F150',
      stock: 7,
      price: 38000,
      id: 1,
      timestamp: Date.now(),
      description: '',
    });
    expect(res).toBeTruthy();
    const resAfterUpdate = await db.fetchData();
    expect(resAfterUpdate[0].price).toBe(38000);
  });

  it('should delete a record', async () => {
    const res = await db.remove({
      name: 'Ford F150',
      stock: 7,
      price: 38000,
      id: 1,
      timestamp: Date.now(),
      description: '',
    });
    expect(res).toBeTruthy();
    const resAfterDelete = await db.fetchData();
    expect(resAfterDelete.length).toBe(0);
  });
});
