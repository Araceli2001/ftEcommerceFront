export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
  }
  
  export interface userLogin {
    token: string;
    userData: {
      id: number;
      address: string;
      email: string;
      name: string;
      phone: string;
      role: string;
      orders: []

    }
  }

  export interface IOrder {
    id: number;
    status: string;
    date: Date;
    products: IProduct[]
  }