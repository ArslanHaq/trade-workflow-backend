import { PrismaService } from '../prisma/prisma.service';

type MockRecord = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: unknown;
};

type DelegateStore = {
  nextId: number;
  rows: MockRecord[];
};

const delegateNames = [
  'user',
  'role',
  'productTemplate',
  'workflowTemplate',
  'workflowStage',
  'workflowTransition',
  'formSchema',
  'documentType',
  'documentRule',
  'approvalChain',
  'case',
  'auditLog',
] as const;

function createDelegate(store: DelegateStore) {
  return {
    findMany: jest.fn(() =>
      Promise.resolve([...store.rows].sort((a, b) => a.id - b.id)),
    ),
    findUnique: jest.fn(
      ({
        where,
      }: {
        where: {
          id?: number;
          email?: string;
        };
      }) =>
        Promise.resolve(
          store.rows.find((row) => {
            if (where.id !== undefined) {
              return row.id === where.id;
            }

            if (where.email !== undefined) {
              return row.email === where.email;
            }

            return false;
          }) ?? null,
        ),
    ),
    create: jest.fn(({ data }: { data: Record<string, unknown> }) => {
      const now = new Date();
      const row: MockRecord = {
        id: store.nextId++,
        createdAt: now,
        updatedAt: now,
        ...data,
      };
      store.rows.push(row);
      return Promise.resolve(row);
    }),
    update: jest.fn(
      ({
        where,
        data,
      }: {
        where: { id: number };
        data: Record<string, unknown>;
      }) => {
        const index = store.rows.findIndex((row) => row.id === where.id);

        if (index === -1) {
          throw new Error(`Mock record with id ${where.id} not found.`);
        }

        const updatedRecord = {
          ...store.rows[index],
          ...data,
          id: where.id,
          updatedAt: new Date(),
        };
        store.rows[index] = updatedRecord;
        return Promise.resolve(updatedRecord);
      },
    ),
    delete: jest.fn(({ where }: { where: { id: number } }) => {
      const index = store.rows.findIndex((row) => row.id === where.id);

      if (index === -1) {
        throw new Error(`Mock record with id ${where.id} not found.`);
      }

      const [removedRecord] = store.rows.splice(index, 1);
      return Promise.resolve(removedRecord);
    }),
  };
}

export function createPrismaServiceMock(): PrismaService {
  const delegateStores = delegateNames.reduce(
    (stores, delegateName) => {
      stores[delegateName] = {
        nextId: 1,
        rows: [],
      };
      return stores;
    },
    {} as Record<(typeof delegateNames)[number], DelegateStore>,
  );

  const mock = {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  } as Record<string, unknown>;

  for (const delegateName of delegateNames) {
    mock[delegateName] = createDelegate(delegateStores[delegateName]);
  }

  return mock as unknown as PrismaService;
}

export function createPrismaMockProvider() {
  return {
    provide: PrismaService,
    useValue: createPrismaServiceMock(),
  };
}
