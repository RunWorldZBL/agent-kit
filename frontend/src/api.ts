import type { Item, ItemListQuery, ItemListResponse } from "@/types";

const MOCK_ITEMS: Item[] = [
  {
    id: "item-1",
    name: "First item",
    description: "Replace this mock with your real API integration.",
    status: "active",
    createdAt: new Date("2026-01-01T00:00:00.000Z").toISOString(),
    updatedAt: new Date("2026-01-01T00:00:00.000Z").toISOString(),
  },
  {
    id: "item-2",
    name: "Draft item",
    description: "A neutral starter record for UI wiring.",
    status: "draft",
    createdAt: new Date("2026-01-02T00:00:00.000Z").toISOString(),
    updatedAt: new Date("2026-01-02T00:00:00.000Z").toISOString(),
  },
];

export async function listItems(query: Partial<ItemListQuery> = {}): Promise<ItemListResponse> {
  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 20;
  const keyword = query.keyword?.toLowerCase();
  const status = query.status;

  let data = [...MOCK_ITEMS];
  if (keyword) data = data.filter(item => item.name.toLowerCase().includes(keyword));
  if (status) data = data.filter(item => item.status === status);

  return {
    data: data.slice((page - 1) * pageSize, page * pageSize),
    total: data.length,
    page,
    pageSize,
  };
}
