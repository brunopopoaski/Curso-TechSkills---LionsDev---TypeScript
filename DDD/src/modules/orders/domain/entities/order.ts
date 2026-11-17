export const OrderStatus = {
  PENDING: "PENDING",
  SHIPPED: "SHIPPED",
  CANCELED: "CANCELED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface OrderItem {
  productId: string;
  quantity: number;
}

export class Order {
  public readonly id: string;
  public readonly customerId: string;
  public readonly items: readonly unknown[];
  private status: OrderStatus;

  constructor(id: string, customerId: string, items: readonly unknown[]) {
    if (!items || items.length === 0) {
      throw new Error("Um pedido precisa ter pelo menos um item.");
    }

    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.status = "PENDING";
  }

  cancel(): void {
    if (this.status === "SHIPPED") {
      throw new Error("Pedido ja enviado nao pode ser cancelado.");
    }

    this.status = "CANCELED";
  }

  getStatus(): OrderStatus {
    return this.status;
  }
}
