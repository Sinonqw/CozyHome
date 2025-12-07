export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: 'Admin' | 'User'; // Роли, как в нашей схеме
    createdAt: string;
    // Мы можем добавить mock-поле для заказов, пока у нас нет Order.count()
    totalOrders: number; 
}